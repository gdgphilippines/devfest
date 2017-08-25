const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const config = require('./src/config/prod.json')
const theme = require(`./src/${config.theme.src}/theme.json`)
const GenerateAssetPlugin = require('generate-asset-webpack-plugin')

const createServiceWorker = (compilation) => {
  return `
    importScripts("sw.js")
    importScripts("workbox-routing.js")
    const router = new workbox.routing.Router()
    this.build = JSON.parse('${JSON.stringify(config.build)}')
    this.app = JSON.parse('${JSON.stringify(config.app)}')
    this.random = "${new Date().toString()}"
    importScripts("service-worker-core/routing.js")
    importScripts("service-worker-src/routing.js")
  `
}

const firebase = {
  database: {
    rules: 'database.rules.json'
  },
  hosting: config.hosting
}

for (var j in firebase.hosting.rewrites) {
  if (firebase.hosting.rewrites[j].source === '**') {
    firebase.hosting.rewrites.splice(j, 1)
  }
}

for (var i in config.routing) {
  firebase.hosting.rewrites.push({
    source: i.split('/').map(path => (path.indexOf(':') === 0 ? '**' : path)).join('/'),
    destination: '/index.html'
  })
}

firebase.hosting.public = './dist/build'

module.exports = {
  entry: path.resolve(__dirname, 'core/shell/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/build')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'bower_components')
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'core/shell/index.ejs'),
      inject: false,
      filename: 'index.html',
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: true
      },
      config,
      theme
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true
      // async: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
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
        from: path.resolve(__dirname, 'node_modules/workbox-routing/build/importScripts/workbox-routing.dev.*.js'),
        to: 'workbox-routing.js'
      }
    ]),
    new GenerateJsonPlugin('manifest.json', {
      name: config.app.title,
      short_name: config.app.shortTitle,
      start_url: theme.startUrl,
      display: theme.display,
      theme_color: theme.themeColor,
      background_color: theme.backgroundColor,
      icons: theme.icons
    }),
    new GenerateJsonPlugin('../../firebase.json', firebase),
    new GenerateAssetPlugin({
      filename: 'service-worker.js',
      fn: (compilation, cb) => {
        cb(null, createServiceWorker(compilation))
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
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
          { loader: 'babel-loader' },
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
          { loader: 'image-webpack-loader' }
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
