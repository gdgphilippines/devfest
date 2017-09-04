const getConfig = require('./get-config')

module.exports = (env, dest) => {
  const {config} = getConfig(env)
  const firebase = {
    database: {
      rules: 'database.rules.json'
    },
    hosting: config.hosting
  }

  for (var j in firebase.hosting.rewrites) {
    if (firebase.hosting.rewrites[j].source === '**') {
      firebase.hosting.rewrites.splice(j, 1)
    }
  }

  for (var i in config.routing) {
    if (!firebase.hosting.rewrites) {
      firebase.hosting.rewrites = []
    }
    firebase.hosting.rewrites.push({
      source: i.split('/').map(path => (path.indexOf(':') === 0 ? '**' : path)).join('/'),
      destination: '/index.html'
    })
  }

  firebase.hosting.public = dest
  return JSON.stringify(firebase, null, 2)
}
