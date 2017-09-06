// put routing things here
router.registerRoute({route: new workbox.routing.ExpressRoute({
  path: '/api/landing-temp-link',
  handler: workboxSW.strategies.networkFirst({
    networkTimeoutSeconds: 3,
    cacheExpiration: {
      maxEntries: 10,
      maxAgeSeconds: 60 * 60 * 24
    },
    cacheableResponse: {
      statuses: [200, 400, 404, 500]
    }
  })
})})
