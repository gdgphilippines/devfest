const getConfig = require('./get-config')
const path = require('path')

module.exports = (env) => {
  const minify = env === 'prod'
    ? {
      caseSensitive: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true,
      preserveLineBreaks: true
    }
    : false
  
  return {
    template: path.resolve(__dirname, '../core/shell/index.ejs'),
    inject: false,
    filename: 'index.html',
    minify,
    getConfig,
    env
  }
}