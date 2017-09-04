const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const createFirebaseJson = require('../utils/create-firebase-json')
const getEnv = require('../utils/get-env')

/**
 * # Slush Task Create Firebase JSON
 *
 * Creates/Overwrites the Firebase JSON file for hosting purposes. Uses the `build-utils/utils/create-firebase-json.js`
 * module that is also being used for automatically generating the firebase.json file on the project when running
 * the project's watcher.
 *
 * ## Usage
 *
 * ```bash
 * $ npm slush polyapp:create-firebase-json
 * ```
 *
 * ## File:
 * [/tasks/creators/create-firebase-json.js](../../../tasks/creators/create-firebase-json.js)
 *
 */

gulp.task('create-firebase-json', (done) => {
  fs.writeFileSync(path.resolve(__dirname, '../../firebase.json'), createFirebaseJson(getEnv(), 'dist/public'), 'utf8')
  done()
})
