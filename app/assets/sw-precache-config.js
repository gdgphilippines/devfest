module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/app.js'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!(\/__)|(\/service-worker\.js))/],
  runtimeCaching: [
    {
      // cache Google user profile pics
      urlPattern: /^https:\/\/lh3.googleusercontent.com\/.*/,
      handler: 'networkFirst'
    },
    {
      urlPattern: /service-worker.js/,
      handler: 'networkOnly'
    },
    {
      urlPattern: /^https:\/\/maps.googleapis.com\/.*/,
      handler: 'networkFirst'
    },
    {
      urlPattern: /^https:\/\/cdn.ravenjs.com\/.*/,
      handler: 'networkFirst'
    }
  ]
};
