const gulp = require('gulp')
const runSequence = require('run-sequence')

/**
 * # Gulp Task Default
 *
 * Default. Runs/Builds the program.
 * Runs the following tasks:
 * - [create-app](../creators/create-app.md)
 * - [create-babelrc](../creators/create-babelrc.md)
 * - [create-database-rules-json](../creators/create-database-rules-json.md)
 * - [create-gitignore](../creators/create-gitignore.md)
 * - [create-polypackrc](../creators/create-polypackrc.md)
 * - [update](./update.md)
 *
 *
 * ## Usage
 *
 * ```bash
 * $ npm slush polyapp
 * ```
 *
 * ## File:
 * [/tasks/installers/default.js](../../../tasks/installers/default.js)
 *
 */
gulp.task('default', (done) => {
  return runSequence(
    'delete-destination',
    'create-destination',
    'create-image',
    'create-routing',
    'create-partials',
    'create-http-codes',
    'create-firebase-json',
    'watch-build',
    'run-webpack',
    'run-after-webpack',
    'run-server',
    'run-workbox',
    done
  )
})
