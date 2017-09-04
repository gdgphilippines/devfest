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
    // The install handler takes care of precaching the resources we always need.
    self.addEventListener('install', event => {
      if (self.skipWaiting) { self.skipWaiting(); }
    });

    // The activate handler takes care of cleaning up old caches.
    self.addEventListener('activate', event => {
      console.log('activated')
    });
  `
}
