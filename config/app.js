const fs = require('fs')
const path = require('path')
const buildsPath = 'config/builds'
const buildsArray = fs.readdirSync(buildsPath).filter(file => fs.statSync(path.join(buildsPath, file)).isDirectory())

const builds = {
  dev: 'dev',
  production: 'production'
}

exports.builds = builds

for (var i in buildsArray) {
  if (buildsArray[i].trim()) {
    exports[buildsArray[i]] = require('./builds/' + buildsArray[i])
  }
}
