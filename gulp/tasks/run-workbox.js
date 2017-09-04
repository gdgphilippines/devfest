const gulp = require('gulp')
const path = require('path')
const build = require('workbox-build')
const getEnv = require('../utils/get-env')
const getDest = require('../utils/get-dest')
const getConfig = require('../utils/get-config')

gulp.task('run-workbox', (done) => {
  const env = getEnv()
  if (env !== 'prod') {
    return done()
  }

  const { config } = getConfig(env)
  const dest = path.resolve(__dirname, '../../' + getDest(env))

  return build.generateSW(
    {
      cacheId: config.app.shortTitle,
      swDest: `${dest}/sw.js`,
      globPatterns: [
        '**/*.{js,css,html}',
        'images/**.{png,jpg,ico,gif}',
        'images/**/*.{png,jpg,ico,gif}',
        '**/*.json'
      ].concat(config.serviceWorker.globPatterns),
      globDirectory: dest,
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [
        [/^(?!(\/__)|(\/service-worker\.js)|(\/sw\.js)|(\/routing-sw\.js)|(\/_bundle-sizes\.html)|(\/_statistic\.html)|(\/_statistic\.json))/]
      ].concat(config.serviceWorker.navigateFallbackWhitelist),
      globIgnores: [
        '404.html',
        'service-worker.js',
        'sw.js',
        'service-worker-core/*.js',
        'service-worker-src/*.js',
        'workbox-sw.prod.v2.0.0.js',
        'workbox-sw.prod.v2.0.0.js.map',
        'workbox-routing.js',
        '_statistic.html',
        '_statistic.json',
        '_bundle-sizes.html'
      ].concat(config.serviceWorker.globIgnores),
      skipWaiting: true,
      handleFetch: env === 'prod',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/maps.googleapis.com\/.*/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/fonts.gstatic.com\/.*/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/cdn.ravenjs.com\/.*/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/www.gstatic.com\/firebasejs\/.*/,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/www.google-analytics.com\/analytics.js/,
          handler: 'networkFirst'
        },
        {
          urlPattern: /^https:\/\/polyfill.io\/.*/,
          handler: 'networkFirst'
        }
      ].concat(config.serviceWorker.runtimeCaching)
    }
  )
})
