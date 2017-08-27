const fs = require('fs')
const path = require('path')

module.exports = (env) => {
  const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../src/config/${env}.json`)), 'utf8')
  const theme = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../src/${config.theme.src}/theme.json`)), 'utf8')
  return {config, theme}
}
