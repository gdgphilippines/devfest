module.exports = (env) => {
    console.log(env)
  return require(`./webpack.dev.js`)(env)
}
