const gulp = require('gulp')
const webpack = require('webpack')
const path = require('path')
const webpackStream = require('webpack-stream')
const getWebpackConfig = require('../utils/create-webpack-config')

gulp.task('run-webpack', (done) => {
  const config = getWebpackConfig()

  if (config.watch) {
    done()
  }

  return gulp.src(path.resolve(__dirname, '../../core/shell/index.js'))
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(config.output.path))
})
