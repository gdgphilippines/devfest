const getConfig = require('./get-config')

module.exports = (env) => {
  const {config} = getConfig(env)
  return env === 'prod'
  ? `
    importScripts("sw.js")
    importScripts("workbox-routing.js")
    const router = new workbox.routing.Router()
    this.build = JSON.parse('${JSON.stringify(config.build)}')
    this.app = JSON.parse('${JSON.stringify(config.app)}')
    this.random = "${new Date().toString()}"
    importScripts("service-worker-core/routing.js")
    importScripts("service-worker-src/routing.js")
  `
  : `
    console.log('Development mode. Will cache files in production mode. Generated: ${new Date().toString()}')
    self.addEventListener('install', function(event) {
      // The promise that skipWaiting() returns can be safely ignored.
      self.skipWaiting();
    
      // Perform any other actions required for your
      // service worker to install, potentially inside
      // of event.waitUntil();
    });  
  `
}