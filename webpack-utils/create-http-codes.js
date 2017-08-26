const getConfig = require('./get-config')

module.exports = (env) => {
  const {config} = getConfig(env)
  
  const routes = []
  
  for (var i in config.httpCodes) {
    routes.push(`'${i}': () => { return import(/* webpackChunkName: "${ config.httpCodes[i] }" */ './${config.fragments[config.httpCodes[i]]}') }`)
  }
  
  return `
    export default {
      ${routes.join(', \n')}
    }
  `
}