const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Visualizer = require('webpack-visualizer-plugin')
const WorkboxBuildWebpackPlugin = require('workbox-webpack-plugin')
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin')
// const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const GenerateAssetPlugin = require('./webpack-utils/generate-asset-plugin')
const createServiceWorker = require('./webpack-utils/create-service-worker')
const getConfig = require('./webpack-utils/get-config')
const getManifest = require('./webpack-utils/get-manifest')
const getFirebase = require('./webpack-utils/get-firebase')
const getHTMLOptions = require('./webpack-utils/get-html-options')
const createRouting = require('./webpack-utils/create-routing')
const createHttpCodes = require('./webpack-utils/create-http-codes')
const createPartials = require('./webpack-utils/create-partials')

module.exports = (env) => {
  console.log('running...')

  const { config } = getConfig(env)

  var dest
  if (env === 'dev') {
    dest = 'dist/public'
  } else if (env === 'prod') {
    dest = 'dist/build'
  } else {
    dest = `dist/` + env
  }

  const serviceWorker = env === 'prod'
    ? new GenerateAssetPlugin({
      filename: 'service-worker.js',
      fn: (compilation, cb) => {
        cb(null, createServiceWorker(env))
      }
    })
    : new GenerateAssetPlugin({
      filename: 'service-worker.js',
      fn: (compilation, cb) => {
        cb(null, createServiceWorker(env))
      }
    })

  const environment = env === 'prod' ? 'production' : 'development'

  const plugins = [
    new ModernizrWebpackPlugin({
      'feature-detects': [
        'indexeddb'
      ],
      htmlWebpackPlugin: true,
      minify: env === 'prod'
    }),
    new GenerateAssetPlugin({
      filename: '../../src/routing.js',
      fn: (c, cb) => {
        const filename = path.resolve(__dirname, 'src/routing.js')
        const newFile = createRouting(env)
        if (fs.existsSync(filename)) {
          const oldFile = fs.readFileSync(filename, 'utf8')
          if (oldFile === newFile) {
            return cb()
          }
        }
        cb(null, newFile)
      }
    }),
    new GenerateAssetPlugin({
      filename: '../../src/http-codes.js',
      fn: (c, cb) => {
        const filename = path.resolve(__dirname, 'src/http-codes.js')
        const newFile = createHttpCodes(env)
        if (fs.existsSync(filename)) {
          const oldFile = fs.readFileSync(filename, 'utf8')
          if (oldFile === newFile) {
            return cb()
          }
        }
        cb(null, newFile)
      }
    }),
    new GenerateAssetPlugin({
      filename: '../../src/partials.js',
      fn: (c, cb) => {
        const filename = path.resolve(__dirname, 'src/partials.js')
        const newFile = createPartials(env)
        if (fs.existsSync(filename)) {
          const oldFile = fs.readFileSync(filename, 'utf8')
          if (oldFile === newFile) {
            return cb()
          }
        }
        cb(null, newFile)
      }
    }),
    new Visualizer({
      filename: './_statistic.html'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '_bundle-sizes.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'gzip',
      // Automatically open report in default browser
      openAnalyzer: false,
      generateStatsFile: true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: '_statistic.json'
    }),
    serviceWorker,
    new HTMLWebpackPlugin(getHTMLOptions(env)),
    new webpack.optimize.CommonsChunkPlugin({
      children: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.map'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, 'bower_components/web-component-tester/*.js'),
        to: 'bower_components/web-component-tester/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, 'src/images'),
        to: 'images'
      },
      {
        from: path.resolve(__dirname, 'src/service-worker'),
        to: 'service-worker-src'
      },
      {
        from: path.resolve(__dirname, 'core/service-worker'),
        to: 'service-worker-core'
      },
      {
        from: path.resolve(__dirname, `node_modules/workbox-routing/build/importScripts/workbox-routing.${env === 'prod' ? env : 'dev'}.*.js`),
        to: 'workbox-routing.js'
      },
      {
        from: path.resolve(__dirname, `src/config/${env}.json`),
        to: '../../src/.temp/temp.json'
      }
    ]),
    new GenerateAssetPlugin({
      filename: 'manifest.json',
      fn: (compilation, cb) => {
        cb(null, getManifest(env))
      }
    }),
    new GenerateAssetPlugin({
      filename: '../../firebase.json',
      fn: (compilation, cb) => {
        cb(null, getFirebase(env, dest))
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(environment)
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      module: true,
      columns: true,
      // noSources: true,
      linToLine: true
    })
  ]

  if (env === 'prod') {
    const prod = [

      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false,
        sourceMap: true
      }),

      new WorkboxBuildWebpackPlugin({
        cacheId: config.app.shortTitle,
        swDest: `${dest}/sw.js`,
        globPatterns: ['**/*.{js,css,html}', 'images/**.{png,jpg,ico,gif}', 'images/**/*.{png,jpg,ico,gif}', '**/*.json'].concat(config.serviceWorker.globPatterns),
        globDirectory: dest,
        navigateFallback: '/index.html',
        navigateFallbackWhitelist: [
          [/^(?!(\/__)|(\/service-worker\.js)|(\/sw\.js)|(\/routing-sw\.js)|(\/_bundle-sizes\.html)|(\/_statistic\.html)|(\/_statistic\.json))/]
        ].concat(config.serviceWorker.navigateFallbackWhitelist),
        globIgnores: [
          '404.html',
          'service-worker.js',
          'sw.js',
          'service-worker-core/routing.js',
          'service-worker-src/routing.js',
          'workbox-sw.prod.v2.0.0.js',
          'workbox-sw.prod.v2.0.0.js.map',
          'workbox-routing.js'
        ].concat(config.serviceWorker.globIgnores),
        skipWaiting: true,
        handleFetch: env === 'prod',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/maps.googleapis.com\/.*/,
            handler: 'networkFirst'
          },
          {
            urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/fonts.gstatic.com\/.*/,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/cdn.ravenjs.com\/.*/,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/www.gstatic.com\/firebasejs\/.*/,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/www.google-analytics.com\/analytics.js/,
            handler: 'networkFirst'
          },
          {
            urlPattern: /^https:\/\/polyfill.io\/.*/,
            handler: 'networkFirst'
          }
        ].concat(config.serviceWorker.runtimeCaching)
      })
      // new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
    ]

    for (var i in prod) {
      plugins.push(prod[i])
    }

    // console.log(plugins)
  }

  return {
    entry: path.resolve(__dirname, 'core/shell/index.js'),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, dest)
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ]
    },
    plugins,
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
              loader: 'image-webpack-loader'
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
  }
}
