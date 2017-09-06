const gulp = require('gulp')
const options = require('gulp-options')
const path = require('path')
const getEnv = require('../utils/get-env')

gulp.task('watch-build', (done) => {
  const env = getEnv()
  if (options.has('watch') && env !== 'prod') {
    gulp.watch(path.resolve(__dirname, `../../src/config/${env}.json`), ['create-firebase-json', 'create-http-codes', 'create-partials', 'create-routing'])
    gulp.watch([path.resolve(__dirname, `../../src/images/*`), path.resolve(__dirname, `../../src/images/**/*`)], ['create-image'])
  }
  done()
})
