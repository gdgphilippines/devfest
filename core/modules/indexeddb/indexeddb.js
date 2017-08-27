var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

export default () => {
  return new Promise((resolve, reject) => {
    if (window.Modernizr) {
      var time = 0
      if (window.Modernizr.indexeddb === undefined) {
        time = 500
      }
      setTimeout(() => {
        if (window.Modernizr.indexeddb === false) {
          import('indexeddbshim').then(mod => {
            resolve(indexedDB || mod)
          })
        } else {
          resolve(indexedDB)
        }
      }, time)
    } else {
      // YOLO
      resolve(indexedDB)
    }
  })
}
