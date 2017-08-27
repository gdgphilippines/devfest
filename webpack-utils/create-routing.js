const getConfig = require('./get-config')

module.exports = (env) => {
  const {config} = getConfig(env)

  const routes = []

  for (var i in config.routing) {
    var name = config.routing[i].name || config.routing[i]
    routes.push(`'${i}': () => { return import(/* webpackChunkName: "${name}" */ './${config.fragments[name]}') }`)
  }

  return `
    export default {
      ${routes.join(', \n')}
    }
  `
}
