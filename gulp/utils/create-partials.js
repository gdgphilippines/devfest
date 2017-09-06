const getConfig = require('./get-config')

module.exports = (env) => {
  const {config} = getConfig(env)

  const partials = []

  for (var i in config.partials) {
    partials.push(`'${i}': () => { return import(/* webpackChunkName: "${ config.partials[i] }" */ './${config.fragments[config.partials[i]]}') }`)
  }

  return `
    export default {
      ${partials.join(', \n')}
    }
  `
}
