const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const config = require('./src/config/dev.json')
const theme = require(`./src/${config.theme.src}/theme.json`)

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

firebase.hosting.public = './dist/public'

module.exports = {
  entry: path.resolve(__dirname, 'core/shell/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public')
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
      config,
      theme
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
        from: path.resolve(__dirname, 'src/service-worker.js'),
        to: 'service-worker.js'
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
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
