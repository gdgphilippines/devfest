// See http://brunch.io for documentation.
const stylesheets = {joinTo: {'app.css': 'app/styles.css'}}
const javascripts = {
  joinTo: {
    'app.js': [
      /^app\/scripts/
    ],
    'vendor.js': [
      /^node_modules/
    ]
  }
}
const config = require('./config/app')

const brunchStaticProcessor = (build) => {
  return require('html-brunch-static')({
    processors: [
      require('./additional_plugins/sass-brunch-static')(),
      require('./additional_plugins/json-brunch-static')(),
      require('./additional_plugins/js-brunch-static')()
    ],
    defaultContext: config[build],
    handlebars: {
      enableProcessor: true
    }
  })
}

const plugins = {
  copycat: {
    'bower_components': ['src/bower_components'],
    'project_components': ['src/project_components'],
    'page_components': ['src/page_components'],
    'test': ['src/test'],
    'images': ['images'],
    verbose: false,
    onlyChanged: true
  },
  sass: {
    mode: 'native',
    options: {
      // includePaths: ['project_components']
    },
    debug: 'comments',
    precision: 8,
    allowCache: true
  },
  static: {
    processors: [
      brunchStaticProcessor(config.builds.dev)
    ]
  }
}

exports.files = {
  javascripts: javascripts,
  stylesheets: stylesheets
}

exports.paths = {
  watched: ['app', 'images', 'config', 'src', 'templates']
}

exports.conventions = {
  ignored: [/\/_/, /^config/, /vendor\/(node|j?ruby-.+|bundle)\//, /^src\/bower_components/]
}

exports.plugins = plugins

exports.overrides = {
  test: {
    paths: {
      public: 'public_test'
    }
  },
  production: {
    optimize: false,
    sourceMaps: false,
    paths: {
      public: 'temp_build'
    },
    plugins: Object.assign({}, plugins, {
      autoReload: {enabled: false},
      static: {
        processors: [
          brunchStaticProcessor(config.builds.production)
        ]
      }
    })
  }
}
