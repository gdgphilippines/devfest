const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const createFirebaseConfig = require('../utils/create-firebase-config')
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

gulp.task('create-firebase-config', (done) => {
  fs.writeFileSync(path.resolve(__dirname, '../../src/firebase.js'), createFirebaseConfig(getEnv()), 'utf8')
  done()
})
