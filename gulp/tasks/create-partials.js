const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const createPartials = require('../utils/create-partials')
const getEnv = require('../utils/get-env')

/**
 * # Slush Task Create Partials File
 *
 * Creates/Overwrites the Partials file to be read by the webpack loader.
 *
 * ## Usage
 *
 * ```bash
 * $ npm slush polyapp:create-partials
 * ```
 *
 * ## File:
 * [/tasks/creators/create-partials.js](../../../tasks/creators/create-partials.js)
 *
 */

gulp.task('create-partials', (done) => {
  fs.writeFileSync(path.resolve(__dirname, '../../src/partials.js'), createPartials(getEnv()), 'utf8')
  done()
})
