// Karma configuration
// Generated on Wed Sep 06 2017 15:40:22 GMT+0800 (PHT)
const path = require('path')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: '../bower_components/webcomponentsjs/custom-elements-es5-adapter.js', included: true, watched: false},
      // {pattern: '../bower_components/**/*', included: false, served: true, watched: true},
      {pattern: '../core/**/*.test.js', included: false, watched: true},
      {pattern: '../src/modules/**/*.test.js', included: false, watched: true},
      {pattern: './test.js', included: true, watched: true}
    ],

    webpack: {
      resolve: {
        modules: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, '../bower_components')
        ]
      },
      module: {
        rules: [
          {
            // If you see a file that ends in .html, send it to these loaders.
            test: /\.html$/,
            // This is an example of chained loaders in Webpack.
            // Chained loaders run last to first. So it will run
            // polymer-webpack-loader, and hand the output to
            // babel-loader. This let's us transpile JS in our `<script>` elements.
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'polymer-webpack-loader',
                options: {
                  processStyleLinks: true
                }
              }
            ]
          },
          {
            // If you see a file that ends in .js, just send it to the babel-loader.
            test: /\.js$/,
            use: 'babel-loader'
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  useRelativePath: true,
                  name: '[name].[ext]'
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  gifsicle: {
                    optimizationLevel: 2
                  },
                  optipng: {
                    optimizationLevel: 5
                  },
                  mozjpeg: {
                    quality: 70,
                    progressive: true
                  },
                  svgo: {
                    plugins: [
                      {removeViewBox: true},
                      {cleanupIDs: false}
                    ]
                  },
                  webp: {
                    quality: 70,
                    method: 5,
                    size: 60000
                  }
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'css-loader'
              }
            ]
          }
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
