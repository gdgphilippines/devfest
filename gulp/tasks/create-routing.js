const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const createRouting = require('../utils/create-routing')
const getEnv = require('../utils/get-env')

/**
 * # Slush Task Create Routing File
 *
 * Creates/Overwrites the Routing file to be read by the webpack loader.
 *
 * ## Usage
 *
 * ```bash
 * $ npm slush polyapp:create-routing
 * ```
 *
 * ## File:
 * [/tasks/creators/create-routing.js](../../../tasks/creators/create-routing.js)
 *
 */

gulp.task('create-routing', (done) => {
  fs.writeFileSync(path.resolve(__dirname, '../../src/routing.js'), createRouting(getEnv()), 'utf8')
  done()
})
