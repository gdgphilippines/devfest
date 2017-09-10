const getConfig = require('./get-config')

module.exports = (env) => {
  const {config} = getConfig(env)

  return `
    export default ${JSON.stringify(config.build.firebaseConfig)}
  `
}