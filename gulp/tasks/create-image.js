const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const path = require('path')
const getDest = require('../utils/get-dest')
const getEnv = require('../utils/get-env')

gulp.task('create-image', () => {
  const dest = path.resolve(__dirname, '../../' + getDest(getEnv()))
  return gulp.src([path.resolve(__dirname, '../../src/images/*'), path.resolve(__dirname, '../../src/images/**/*')])
    .pipe(imagemin([
      imagemin.gifsicle({
        optimizationLevel: 2
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(path.resolve(dest, 'images')))
})
