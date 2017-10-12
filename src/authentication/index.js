import { store } from '../../core/modules/state-manager';

export default {
  exampleAuthentication: () => {
    return false;
  },

  isLoggedIn: () => {
    if (window.firebase) {
      return window.firebase.auth() && window.firebase.auth().currentUser && window.firebase.auth().currentUser.uid;
    }
  },

  // isSponsor: isSponsor

  isSponsor: () => {
    if (window.firebase) {
      if (window.firebase.auth().currentUser.uid) {
        var user = store.getState().user;
        return user && user.profile && user.profile.sponsorId;
      }
    }
  }
};
