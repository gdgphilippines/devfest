const getConfig = require('./get-config');

module.exports = (dev) => {
  const {config} = getConfig(dev);

  return `
    let firebase = null;
    const configs = ${JSON.stringify(config.build.firebaseConfig)};
    import(/* webpackChunkName: 'firebase' */ 'firebase').then(sdk => {
      firebase = sdk;
      configs.forEach(config => {
        if (config.name) {
          firebase.initializeApp(config, name);
        } else {
          firebase.initializeApp(config);
        }
      });
      window.firebase = firebase;
      window.dispatchEvent(new window.CustomEvent('firebase-initialized', { detail: firebase }));
    })
    const firebaseConfig = configs;
    export default firebase;
    export { firebaseConfig };
  `;
};
