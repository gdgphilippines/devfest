const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const getDest = require('../utils/get-dest')
const getEnv = require('../utils/get-env')

gulp.task('create-destination', (done) => {
  const dest = path.resolve(__dirname, '../../' + getDest(getEnv()))
  if (!fs.existsSync(path.resolve(__dirname, '../../dist'))) {
    fs.mkdirSync(path.resolve(__dirname, '../../dist'))
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
  done()
})
