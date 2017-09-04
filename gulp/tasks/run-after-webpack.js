const gulp = require('gulp')
const webpack = require('webpack')
const path = require('path')
const webpackStream = require('webpack-stream')
const getWebpackConfig = require('../utils/create-webpack-config')
const getEnv = require('../utils/get-env')

gulp.task('run-after-webpack', (done) => {
  const env = getEnv()
  const config = getWebpackConfig()

  if (env !== 'prod') {
    return done()
  }

  return gulp.src(path.resolve(__dirname, '../../core/shell/index.js'))
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(config.output.path))
})
