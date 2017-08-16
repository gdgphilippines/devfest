// set project namespace
Object.defineProperty(window, 'App', { value: window.App || {} })
Object.defineProperty(App, 'Mixins', { value: App.Mixins || {} })
Object.defineProperty(App, 'utils', { value: App.utils || {} })
Object.defineProperty(App.utils, 'extends', { value: App.utils.extends || Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target } })
/**
 * Merges a property's object value using the defaults way.
 *
 * @private
 * @param {Object} what Initial prototype
 * @param {String} which Property to collect.
 * @return {Object} the collected values
 */
Object.defineProperty(App.utils, 'collect', { value: App.utils.collect || function (what, which) {
  var res = {}
  while (what) {
    res = App.utils.extends({}, what[which], res) // Respect prototype priority
    what = Object.getPrototypeOf(what)
  }
  return res
}})
Object.defineProperty(App.utils, 'isEmpty', { value: App.utils.isEmpty || function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}});
(() => {
  var __currentUsed = 0
  Object.defineProperty(App.utils, 'checkStorage', { value: App.utils.checkStorage || function () {
    if (window.navigator && navigator.storage && navigator.storage.estimate) {
      return navigator.storage.estimate()
    } else if (window.navigator &&
      navigator.webkitTemporaryStorage &&
      navigator.webkitTemporaryStorage.queryUsageAndQuota &&
      typeof navigator.webkitTemporaryStorage.queryUsageAndQuota === 'function') {
      return new Promise((resolve, reject) => {
        navigator.webkitTemporaryStorage.queryUsageAndQuota(
          (usedBytes, grantedBytes) => {
            if (__currentUsed && App.__build !== 'prod') {
              console.log('added data:', ((usedBytes - __currentUsed) / 1024) / 1024, 'MB. Current used:', (usedBytes / 1024) / 1024, 'MB')
            }
            __currentUsed = usedBytes
            return resolve({
              usage: usedBytes
            })
          }, reject)
      })
    } else {
      Promise.resolve({
        type: 'no_navigator_storage'
      })
    }
  }});
  App.utils.checkStorage()
})()

Object.defineProperty(App, '__dataRestStaleTime', { value: 60 })
Object.defineProperty(App, '__firebaseFetch', { value: App.__firebaseFetch || {} })
Object.defineProperty(App, '__firebaseVersion', { value: App.__firebaseVersion || '4.2.0' })

// set project build
Object.defineProperty(App, '__build', { value: App.__build || '0.0.1' })
Object.defineProperty(App, '__version', { value: App.__version || '0.0.1' })
Object.defineProperty(App, '__database', { value: App.__database || 'dev' })
Object.defineProperty(App, '__analytics', { value: App.__analytics || '' })

// set config variables
Object.defineProperty(App, '__routes', { value: App.__routes || '{}' })
Object.defineProperty(App, '__shellComponents', { value: App.__shellComponents || '{}' })
Object.defineProperty(App, 'Reducers', { value: App.Reducers || {} })
Object.defineProperty(App, 'Actions', { value: App.Actions || {} })

if (window.performance) {
  window.globalStart = window.globalStart || performance.now()
}

// Register the base URL
window.App.baseUrl = window.App.baseUrl || '/'
