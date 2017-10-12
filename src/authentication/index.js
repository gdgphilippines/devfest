import { store } from '../../core/modules/state-manager';

const isSponsor = new Promise(resolve => {
  console.log(window.firebase)
  if (window.firebase) {
    if (window.firebase.auth().currentUser.uid) {
      var profile = store.getState().profile;
      console.log(profile)
      return resolve(profile && profile.sponsorId);
    }
  }
  resolve(false)
})

export default {
  exampleAuthentication: () => {
    return false;
  },

  isLoggedIn: () => {
    if (window.firebase) {
      return window.firebase.auth().currentUser.uid;
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
