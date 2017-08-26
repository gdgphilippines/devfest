const getConfig = require('./get-config')

module.exports = (env) => {
  const {config} = getConfig(env)
  
  const routes = []
  
  for (var i in config.routing) {
    routes.push(`'${i}': () => { return import(/* webpackChunkName: "${ config.routing[i] }" */ './${config.fragments[config.routing[i]]}') }`)
  }
  
  return `
    export default {
      ${routes.join(', \n')}
    }
  `
}