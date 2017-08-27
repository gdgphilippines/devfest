const gulp = require('gulp')
const fs = require('fs')
const runSequence = require('run-sequence')
const options = require('gulp-options')
const createPartials = require('./webpack-utils/create-partials')
const createHttpCodes = require('./webpack-utils/create-http-codes')
const createRouting = require('./webpack-utils/create-routing')

gulp.task('default', (done) => {
  runSequence(
    'create-parts',
    done
  )
})

gulp.task('create-parts', (done) => {
  var env = 'dev'
  if (options.has('env')) {
    env = options.get('env') || 'dev'
  }

  fs.writeFileSync('./src/partials.js', createPartials(env), 'utf8')
  fs.writeFileSync('./src/http-codes.js', createHttpCodes(env), 'utf8')
  fs.writeFileSync('./src/routing.js', createRouting(env), 'utf8')
  done()
})
