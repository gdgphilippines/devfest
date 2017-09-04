const options = require('gulp-options')

module.exports = () => {
  var env = 'dev'
  if (options.has('env')) {
    env = options.get('env')
  }

  if (options.has('prod')) {
    env = 'prod'
  }
  return env
}
