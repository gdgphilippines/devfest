var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

export default () => {
  return new Promise((resolve, reject) => {
    if (window.Modernizr) {
      var time = 0
      if (window.Modernizr.indexeddb === undefined) {
        time = 500
      }
      setTimeout(() => {
        try {
          if (window.Modernizr.indexeddb === false) {
            import('indexeddbshim').then(mod => {
              resolve(indexedDB || mod)
            })
          } else {
            resolve(indexedDB)
          }
        } catch (e) {
          console.error(e)
          if (window.Raven) {
            Raven.captureException(e)
          }
        }

      }, time)
    } else {
      // YOLO
      resolve(indexedDB)
    }
  })
}
