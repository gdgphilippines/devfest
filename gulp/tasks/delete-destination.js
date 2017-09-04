const gulp = require('gulp')
const del = require('del')
const path = require('path')
const getDest = require('../utils/get-dest')
const getEnv = require('../utils/get-env')

gulp.task('delete-destination', () => {
  const dest = path.resolve(__dirname, '../../' + getDest(getEnv()))
  return del(dest, {
    force: true
  })
})
