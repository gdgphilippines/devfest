const fs = require('fs')
const path = require('path')
const packageObj = require('../package.json')

module.exports = (env) => {
  const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../src/config/${env}.json`)), 'utf8')
  config.build.appVersion = packageObj.version
  const theme = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../src/${config.theme.src}/theme.json`)), 'utf8')
  return {config, theme}
}
