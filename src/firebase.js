
    let firebase = null;
    const configs = [{"apiKey":"AIzaSyB3VQN0MNOxcunaUKXZr54u0t6ruv2YbkE","authDomain":"devfestph.firebaseapp.com","databaseURL":"https://devfestph.firebaseio.com","projectId":"devfestph","storageBucket":"devfestph.appspot.com","messagingSenderId":"36335134103"}];
    import(/* webpackChunkName: 'firebase' */ 'firebase').then(sdk => {
      firebase = sdk;
      configs.forEach(config => {
        if (config.name) {
          firebase.initializeApp(config, name);
        } else {
          firebase.initializeApp(config);
        }
      });
      window.dispatchEvent(new window.CustomEvent('firebase-initialized', { detail: firebase }));
    })
    const firebaseConfig = configs;
    export default firebase;
    export { firebaseConfig };
  