const gulp = require('gulp')
const gutils = require('gulp-util')
const options = require('gulp-options')
const client = require('firebase-tools')

gulp.task('run-server', (done) => {
  if (!options.has('watch')) {
    gutils.log('Will not run the server')
    return done()
  }

  if (options.has('no-server')) {
    gutils.log('Will not run server')
    return done()
  }
  var port = 5000
  var host = '127.0.0.1'
  if (options.has('port') && options.get('port')) {
    port = options.get('port')
  }

  if (options.has('host') && options.get('host')) {
    host = options.get('host')
  }

  const firebaseOpts = {
    only: 'functions,hosting',
    port,
    host
  }

  client
    .serve(firebaseOpts)
    .then(() => {
      gutils.log('Shutting down server and webpack')
      process.exit(0)
    })
    .catch(e => {
      console.error(e)

      if (e.message.indexOf('Unable to authorize access to project') >= 0) {
        gutils.log('Shutting down server.', gutils.colors.red('You need to be an authorized user of the firebase project.'))
        gutils.log(gutils.colors.blue('To run this with no errors, you should authorize yourself using'), '$ firebase login')
        gutils.log(gutils.colors.blue('Or run this and using your own server (like http-server or polymer serve) by running only the builder:'), '$ npm start -- --no-server')
      } else {
        gutils.log('Shutting down server and webpack with error')
        process.exit(1)
      }

    })

  done()
})
