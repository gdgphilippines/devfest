import { combineReducers } from 'redux';
import { login, link, unlink, reloadUser, logout, firebaseDocumentLoader, observeAuth, firebaseRemoveListeners, updateFirebase } from '../../firebase';
import { ReduxMixin, store, reducers } from '../../../../core/modules/state-manager';

const {fetch, Polymer} = window;

const profileModel = {
  primary: {
    displayName: String,
    email: String,
    avatar: String,
    github: String,
    ticket: String,
    ticketEmail: String,
    ticketName: String
  },
  meta: {
    dateJoined: Number,
    score: Number,
    accepted: Boolean,
    verified: Boolean
  },
  cross: {
    sponsorId: String,
    codelabsDone: Array
  }
};

const modelPath = 'v1/user';

const USER_ACTION = {
  UPDATE: 'USER_UPDATE',
  PROFILE: 'USER_UPDATE_PROFILE',
  FETCH: 'USER_UPDATE_FETCH'
};

reducers.user = (user = {}, action) => {
  switch (action.type) {
    case USER_ACTION.FETCH:
      if (user.user && user.user.uid) {
        firebaseDocumentLoader(modelPath, user.user.uid, action, store, profileModel, USER_ACTION.PROFILE);
      }
      return user;
    case USER_ACTION.UPDATE:
      if (!action.user) {
        firebaseRemoveListeners();
      }
      return Object.assign({}, user, {
        user: action.user
      });
    case USER_ACTION.PROFILE:
      const profile = Object.assign({}, user.profile);

      if (action.attrs) {
        action.attrs.forEach(item => {
          profile[item.attr] = item.value;
        });
      } else if (action.attr) {
        profile[action.attr] = action.value;
      }

      if (action.del) {
        return Object.assign({}, user, {
          profile: null
        });
      }

      return Object.assign({}, user, {
        profile
      });
    default:
      return user;
  }
};
store.replaceReducer(combineReducers(reducers));

const userState = (user) => {
  store.dispatch({
    type: USER_ACTION.UPDATE,
    user
  });

  const shell = document.querySelector('app-shell');
  shell._pathChanged(shell.path);
};

observeAuth(userState);

export { USER_ACTION };

export default (superClass) => {
  return class extends ReduxMixin(superClass) {
    static get properties () {
      return {
        user: {
          type: Object,
          statePath: 'user.user',
          observer: '_userChanged'
        },
        profile: {
          type: Object,
          statePath: 'user.profile'
        }
      };
    }

    static get observers () {
      return [
        '_checkSponsorIdReloadPage(profile.sponsorId)'
      ];
    }

    _checkSponsorIdReloadPage (sponsorId) {
      const shell = document.querySelector('app-shell');
      shell._pathChanged(shell.path);
    }

    _userChanged (user) {
      if (user) {
        this.dispatch({
          type: USER_ACTION.FETCH,
          modelType: 'primary'
        });
        this.dispatch({
          type: USER_ACTION.FETCH,
          modelType: 'meta'
        });
        this.dispatch({
          type: USER_ACTION.FETCH,
          modelType: 'cross',
          attr: 'sponsorId'
        });
      } else {
        this.dispatch({
          type: USER_ACTION.PROFILE,
          del: true
        });
      }
    }

    login (e) {
      var el = e.target;
      while (!el.id) {
        el = el.parentNode;
      }
      var provider = el.id;
      login(provider)
        .then(result => {
          const user = result.user;
          const providerId = result.credential.providerId;
          if (providerId === 'github.com') {
            return fetch(`https://api.github.com/user?access_token=${result.credential.accessToken}`)
              .then(response => Promise.all([response.json(), Promise.resolve(user)]));
          }
          document.querySelector('app-shell').showMessage('Login successful', null, null, null, 5000);
          return Promise.resolve();
        })
        .then(result => {
          if (result) {
            if (result[0] && result[1]) {
              const updates = {};
              updates[`v1/user/source/${result[1].uid}/primary/github`] = result[0].html_url;
              updates[`v1/user/source/${result[1].uid}/primary/githubName`] = result[0].login;
              updateFirebase(updates);
            }
          }
        });
    }

    link (e) {
      var el = e.target;
      while (!el.id) {
        el = el.parentNode;
      }
      var provider = el.id;
      link(this.user, provider)
        .then(result => {
          const user = result.user;
          const providerId = result.credential.providerId;

          document.querySelector('app-shell').showMessage('Link successful', null, null, null, 5000);
          this.dispatch({
            type: USER_ACTION.UPDATE,
            user
          });
          this.notifyPath('user.providerData');

          if (providerId === 'github.com') {
            return fetch(`https://api.github.com/user?access_token=${result.credential.accessToken}`)
              .then(response => Promise.all([response.json(), Promise.resolve(user)]));
          }

          return Promise.resolve();
        })
        .then(result => {
          if (result) {
            if (result[0] && result[1]) {
              const updates = {};
              updates[`v1/user/source/${result[1].uid}/primary/github`] = result[0].html_url;
              updates[`v1/user/source/${result[1].uid}/primary/githubName`] = result[0].login;
              updateFirebase(updates);
            }
          }
        });
    }

    unlink (e) {
      if (this.user && this.user.providerData && this.user.providerData.length > 1) {
        var provider = this._unlinkId;
        unlink(this.user, provider)
        .then(() => {
          const user = reloadUser();

          this.dispatch({
            type: USER_ACTION.UPDATE,
            user
          });

          if (provider === 'github') {
            const updates = {};
            updates[`v1/user/source/${this.user.uid}/primary/github`] = null;
            updates[`v1/user/source/${this.user.uid}/primary/githubName`] = null;
            updateFirebase(updates);
          }

          this.notifyPath('user.providerData');

          document.querySelector('app-shell').showMessage('Unlinked account successful', null, null, null, 5000);
        })
        .catch((e) => {
          document.querySelector('app-shell').showMessage(e.message, null, null, null, 5000);
        });
      } else {
        document.querySelector('app-shell').showMessage('You cannot unlink your only account.', null, null, null, 5000);
      }
    }

    logout () {
      if (this.shadowRoot.querySelector('app-drawer')) {
        this.shadowRoot.querySelector('app-drawer').close();
      }
      logout();
    }
  };
};
