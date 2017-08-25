const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const path = require('path')
const config = require('./src/config/dev.json')
const theme = require(`./src/${config.theme.src}/theme.json`)

module.exports = {
  entry: path.resolve(__dirname, 'core/shell/index.js'),
  output: {
    filename: 'bundle.js',
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
      }
    ]),
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
          { loader: 'polymer-webpack-loader' }
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
      }
    ]
  }
}
