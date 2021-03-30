const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')

/**
 * Resolve a relative path -> absolute fs path.
 * @param {string} relativePath - relative path
 */
function resolve (relativePath) {
  return path.resolve(__dirname, relativePath)
}

module.exports = [{
  entry: {
    empty_component: resolve('./empty_component.vue'),
  },
  output: {
    // Generate based on name
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name]-[chunkHash].bundle.js',
    library: '[name]',
    // libraryTarget: 'window',
    libraryExport: 'default',
    path: resolve('dist')
  },

  optimization: {
    splitChunks: {
      chunks: 'async'
    },
    minimizer: [
      new TerserPlugin({
        exclude: /.*/ // ! NOTE: disabling terser to make output easier to read
      })
    ]
  },

  // Plugins
  plugins: [
    new VueLoaderPlugin()
  ],

  // Mode
  mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production'),
  devtool: process.env.NODE_ENV === 'development' ? 'eval-cheap-module-source-map' : 'source-map',
  // Rules
  module: {
    rules: [
      {
        // vue-loader config to load `.vue` files or single file components.
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cacheBusting: true
        }
      },
      {
        // This is required for other javascript you are gonna write besides vue.
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      }
    ]
  }
}]
