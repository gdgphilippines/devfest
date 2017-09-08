const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const createAppConfig = require('../utils/create-app-config')
const getEnv = require('../utils/get-env')

/**
 * # Slush Task Create HTTP Codes File
 *
 * Creates/Overwrites the HTTP Codes file to be read by the webpack loader.
 *
 * ## Usage
 *
 * ```bash
 * $ npm slush polyapp:create-http-codes
 * ```
 *
 * ## File:
 * [/tasks/creators/create-http-codes.js](../../../tasks/creators/create-http-codes.js)
 *
 */

gulp.task('create-app-config', (done) => {
  fs.writeFileSync(path.resolve(__dirname, '../../src/app.js'), createAppConfig(getEnv()), 'utf8')
  done()
})
