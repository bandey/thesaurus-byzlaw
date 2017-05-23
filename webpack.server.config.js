// BABEL_DISABLE_CACHE=1 babel-node file.js

const webpack = require('webpack'); // WP2
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'frontend'), // root input path

  output: {
    libraryTarget: 'commonjs2', // YOU NEED TO SET libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          { // WP2
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][local]'
            }
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [ // WP2
    new webpack.LoaderOptionsPlugin({ // some additional options for loaders WP2
      options: {
        context: path.join(__dirname, 'frontend'), // important for css-loader
        postcss: [
          require('postcss-import')()
        ]
      }
    })
  ],
};