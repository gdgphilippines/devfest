const fs = require('fs')
const path = require('path')

module.exports = (env) => {
  var config
  var theme
  if (fs.existsSync(path.resolve(__dirname, `../../src/config/${env}.json`))) {
    config = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../src/config/${env}.json`)), 'utf8')
  } else {
    config = JSON.parse(fs.readFileSync(`./src/config/${env}.json`), 'utf8')
  }

  if (fs.existsSync(path.resolve(__dirname, '../../package.json'))) {
    config.build.appVersion = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'))).version
  }

  if (fs.existsSync(path.resolve(__dirname, `../../src/${config.theme.src}/theme.json`))) {
    theme = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../src/${config.theme.src}/theme.json`)), 'utf8')
  }
  return {config, theme}
}
