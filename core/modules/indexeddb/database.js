import indexedDB from './indexeddb'

// const dbname = window.App && window.App._database ? window.App._database + '_app' : 'database_app'

var db
var request

indexedDB().then((indexeddb) => {
  request = indexeddb.open('page-content', 1)
  request.onsuccess = (event) => {
    console.log('success')
    db = request.result
  }

  request.onupgradeneeded = (event) => {
    console.log('upgrade')
    db = event.target.result
    db.onerror = (event) => {
      console.log(event)
    }

    var objectStore = db.createObjectStore('pageContent', { keyPath: 'nodeName' })
    objectStore.transaction.oncomplete = (event) => {
      console.log('complete objectstore')
      console.log(event)
      // var pageObjectStore = db.transaction('pageContent', 'readwrite').objectStore('pageContent')
    }
  }
})

export default {
  db: () => (db)
}
