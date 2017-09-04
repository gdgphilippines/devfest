const webpack = require('webpack')
const options = require('gulp-options')
const path = require('path')
const getDest = require('../utils/get-dest')
const createServiceWorker = require('../utils/create-service-worker')
const getEnv = require('../utils/get-env')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Visualizer = require('webpack-visualizer-plugin')
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin')
const GenerateAssetPlugin = require('../utils/generate-asset-plugin')
const createHTMLOptions = require('../utils/create-html-options')
const createManifest = require('../utils/create-manifest')

module.exports = () => {
  const env = getEnv()
  // const { config } = getConfig(env)
  const dest = path.resolve(__dirname, '../../' + getDest(env))
  const watch = options.has('watch') && env !== 'prod'

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
    serviceWorker,
    new HTMLWebpackPlugin(createHTMLOptions(env)),
    new webpack.optimize.CommonsChunkPlugin({
      children: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, '../../bower_components/webcomponentsjs/*.map'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, '../../bower_components/web-component-tester/*.js'),
        to: 'bower_components/web-component-tester/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, '../../src/service-worker'),
        to: 'service-worker-src'
      },
      {
        from: path.resolve(__dirname, '../../core/service-worker'),
        to: 'service-worker-core'
      },
      {
        from: path.resolve(__dirname, `../../node_modules/workbox-routing/build/importScripts/workbox-routing.${env === 'prod' ? env : 'dev'}.*.js`),
        to: 'workbox-routing.js'
      },
      {
        from: path.resolve(__dirname, `../../src/config/${env}.json`),
        to: '../../src/.temp/temp.json'
      }
    ]),
    new GenerateAssetPlugin({
      filename: 'manifest.json',
      fn: (compilation, cb) => {
        cb(null, createManifest(env))
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
      })

      // new WorkboxBuildWebpackPlugin()
    ]

    for (var i in prod) {
      plugins.push(prod[i])
    }
  }

  const lastPlugins = [
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
      statsFilename: '_statistic.json',
      statsOptions: {
        source: false,
        performance: true,
        version: true
      },
      logLevel: 'info'
    })
  ]

  for (var j in lastPlugins) {
    plugins.push(lastPlugins[j])
  }

  return {
    watch,
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].[id].js',
      path: dest
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../../bower_components')
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
  }
}
