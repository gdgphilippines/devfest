import { store } from '../../core/modules/state-manager';

export default {
  exampleAuthentication: () => {
    return false;
  },

  isLoggedIn: () => {
    if (window.firebase) {
      return window.firebase.auth().currentUser.uid;
    }
  },

  isSponsor: () => {
    if (window.firebase) {
      if (window.firebase.auth().currentUser.uid) {
        var profile = store.getState().profile;
        return profile && profile.sponsorId;
      }
    }
  }
};
