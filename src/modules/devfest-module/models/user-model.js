import { combineReducers } from 'redux';
import { login, logout, firebaseDocumentLoader, observeAuth, firebaseRemoveListeners, updateFirebase } from '../../firebase';
import { ReduxMixin, store, reducers } from '../../../../core/modules/state-manager';

const {fetch} = window;

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
      } else {
        this.dispatch({
          type: USER_ACTION.PROFILE,
          del: true
        });
      }
    }

    login (e) {
      var el = e.target;
      var provider = el.id || 'google';
      login(provider)
        .then(result => {
          const user = result.user;
          const providerId = result.credential.providerId;
          if (providerId === 'github.com') {
            return fetch(`https://api.github.com/user?access_token=${result.credential.accessToken}`)
              .then(response => Promise.all([response.json(), Promise.resolve(user)]));
          }
          return Promise.resolve();
        })
        .then(result => {
          if (result[0] && result[1]) {
            const updates = {};
            updates[`v1/user/source/${result[1].uid}/primary/github`] = result[0].html_url;
            updates[`v1/user/source/${result[1].uid}/primary/githubName`] = result[0].login;
            updateFirebase(updates);
          }
        });
    }

    logout () {
      if (this.shadowRoot.querySelector('app-drawer')) {
        this.shadowRoot.querySelector('app-drawer').close();
      }
      logout();
    }
  };
};
