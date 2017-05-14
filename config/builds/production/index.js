exports.app = {
  version: '0.0.1',
  name: 'Minimal Appshell',
  shortName: 'MINIMALAPP',
  description: 'Minimal Appshell the loads fast',
  build: 'dev',
  ravenConfig: 'https://827acc4cd4d04b009157881a6939baac@sentry.io/123192',
  themeColor: '#009688',
  backgroundColor: '#009688'
}

exports.manifest = require('./manifest')
exports.meta = require('./meta')
exports.pages = require('./pages')
exports.firebaseConfig = require('./firebase')
