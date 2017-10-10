import { ReduxMixin, store, reducers } from '../../../../core/modules/state-manager';
import { combineReducers } from 'redux';

let firebase = null;
import(/* webpackChunkName: 'firebase' */ 'firebase').then(sdk => {
  if (sdk) {
    firebase = sdk;
  }
});

let authStateChanged = null;

const profileModel = {
  primary: {
    displayName: String,
    firstName: String,
    email: String,
    avatar: String
  },
  meta: {
    lastName: String,
    dateJoined: Number,
    dateBirth: Number
  },
  cross: {
    articles: Array,
    threads: Array
  }
};

const listeners = {};

const modelPath = 'v1/user';

const USER_ACTION = {
  UPDATE: 'USER_UPDATE',
  PROFILE: 'USER_UPDATE_PROFILE',
  FETCH: 'USER_UPDATE_FETCH'
};

const observeAuth = (firebase, store) => {
  authStateChanged = authStateChanged || firebase.auth().onAuthStateChanged((user) => {
    store.dispatch({
      type: USER_ACTION.UPDATE,
      user
    });
  });
  return authStateChanged;
};

const updateAttrSnapshot = (store, attr, snapshot) => {
  if (snapshot.exists()) {
    store.dispatch({
      type: USER_ACTION.PROFILE,
      value: snapshot.val(),
      attr
    });
  }
};

const updateModelTypeSnapshot = (store, modelType, snapshot) => {
  if (snapshot.exists()) {
    const attrs = [];
    snapshot.forEach(child => {
      attrs.push({
        attr: child.key,
        value: child.val()
      });
    });
    store.dispatch({
      type: USER_ACTION.PROFILE,
      attrs
    });
  }
};

const firebaseDocumentLoader = (modelPath, key, action) => {
  const sourcePath = `${modelPath}/source/${key}`;
  if (action.modelType) {
    const modelType = `${sourcePath}/${action.modelType}`;
    if (!action.attr) {
      for (var i in profileModel) {
        if (i === action.modelType) {
          for (var j in profileModel[i]) {
            if (listeners[modelType + '/' + j]) {
              listeners[modelType + '/' + j].off();
              listeners[modelType + '/' + j] = null;
            }
          }
          listeners[modelType] = listeners[modelType] || firebase.database().ref(modelType);
          listeners[modelType].on('value', updateModelTypeSnapshot.bind(this, store, action.modelType));
          break;
        }
      }
    } else if (!listeners[modelType]) {
      const attr = `${modelType}/${action.attr}`;
      listeners[attr] = listeners[attr] || firebase.database().ref(attr);
      listeners[attr].on('value', updateAttrSnapshot.bind(this, store, action.attr));
    }
  }
}

reducers.user = (user = {}, action) => {
  switch (action.type) {
    case USER_ACTION.FETCH:
      if (user.user && user.user.uid) {
        firebaseDocumentLoader
      }
      return user;
    case USER_ACTION.UPDATE:
      if (!action.user) {
        for (var path in listeners) {
          if (listeners[path]) {
            listeners[path].off();
            listeners[path] = null;
          }
        }
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


if (firebase) {
  observeAuth(firebase, store);
} else {
  window.addEventListener('firebase-initialized', event => {
    observeAuth(event.detail, store);
  });
}

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

    login () {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout () {
      firebase.auth().signOut();
    }
  };
};
