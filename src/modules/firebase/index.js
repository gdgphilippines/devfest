let firebase = null;
const listeners = {};
import(/* webpackChunkName: 'firebase' */ 'firebase').then(sdk => {
  if (sdk) {
    firebase = sdk;
  }
});

const updateAttrSnapshot = (store, attr, type, snapshot) => {
  if (snapshot.exists()) {
    setTimeout(() => {
      store.dispatch({
        type, // USER_ACTION.PROFILE,
        value: snapshot.val(),
        attr
      });
    }, 100);
  }
};

const updateModelTypeSnapshot = (store, modelType, type, snapshot) => {
  if (snapshot.exists()) {
    const attrs = [];
    snapshot.forEach(child => {
      attrs.push({
        attr: child.key,
        value: child.val()
      });
    });
    setTimeout(() => {
      store.dispatch({
        type, // USER_ACTION.PROFILE,
        attrs
      });
    }, 100);

  }
};

export const firebaseRemoveListeners = () => {
  for (var path in listeners) {
    if (listeners[path]) {
      listeners[path].off();
      listeners[path] = null;
    }
  }
};

export const firebaseDocumentLoader = (modelPath, key, action, store, profileModel, type) => {
  // console.log(modelPath, key, action, profileModel, type)
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
          listeners[modelType].on('value', updateModelTypeSnapshot.bind(this, store, action.modelType, type));
          break;
        }
      }
    } else if (!listeners[modelType]) {
      const attr = `${modelType}/${action.attr}`;
      listeners[attr] = listeners[attr] || firebase.database().ref(attr);
      listeners[attr].on('value', updateAttrSnapshot.bind(this, store, action.attr, type));
    }
  }
};

export const updateFirebase = (updates) => {
  return firebase.database().ref().update(updates);
};

export const login = (name) => {
  var provider = null;
  if (name === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  } else if (name === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  } else if (name === 'github') {
    provider = new firebase.auth.GithubAuthProvider();
    // provider.addScope('repo');
  }

  return firebase.auth().signInWithPopup(provider);
};

export const link = (user, name) => {
  var provider = null;
  if (name === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  } else if (name === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  } else if (name === 'github') {
    provider = new firebase.auth.GithubAuthProvider();
    // provider.addScope('repo');
  }

  return user.linkWithPopup(provider);
};

export const unlink = (user, name) => {
  var provider = name + '.com';

  return user.unlink(provider);
};

export const reloadUser = () => {
  return firebase.auth().currentUser;
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const observeAuth = (dispatch) => {
  if (firebase) {
    firebase.auth().onAuthStateChanged(dispatch);
  } else {
    window.addEventListener('firebase-initialized', event => {
      firebase = event.detail;
      firebase.auth().onAuthStateChanged(dispatch);
    });
  }
};
