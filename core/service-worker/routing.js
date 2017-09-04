for (var i in this.build.firebaseConfig) {
  router.registerRoute({route: new workbox.routing.ExpressRoute({
    path: 'https://' + this.build.firebaseConfig[i].projectId + '.firebaseio.com/:json+',
    handler: function (obj) {
      var event = obj.event
      var url = obj.url

      return fetch(url.href)
        .then(function (response) {
          caches.open(this.app.shortTitle).then(function (cache) {
            cache.put(event.request, response)
          })
          return response.clone()
        })
        .catch(function (err) {
          console.log(err, url.href, caches.match(url.href))
          return caches.match(url.href)
        })
    }
  })})
}
