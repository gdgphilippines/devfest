module.exports = (env) => {
  var dest = 'dev'
  if (env !== dest) {
    dest = env
  }
  if (env === 'prod') {
    dest = 'build'
  }

  if (dest === 'dev') {
    dest = 'public'
  }

  return './dist/' + dest
}
