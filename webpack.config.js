'use strict';

// WebPack2 - WP2
// process.traceDeprecation = true;

// webpack --watch
// webpack --profile --display-modules

const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // to save css into separate file
const CopyPlugin = require('copy-webpack-plugin'); // to copy files from src to dst, eg images
const autoprefixer = require('autoprefixer'); // used by postcss-loader

var filesToCopy = [ // what to copy by copy-webpack-plugin
  { from: './robots.txt' }, // robots simply to /public
  { from: './icons' }, // icons simply to /public
  { from: './i18n/locales', to: 'locales/' },
  { from: '../node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'bootstrap/css/' },
  { from: '../node_modules/bootstrap/dist/fonts', to: 'bootstrap/fonts/' },      
];
if (NODE_ENV !== 'production') {
  filesToCopy.push({ from: '../node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'bootstrap/css/' });
}

module.exports = {
  context: path.join(__dirname, 'frontend'), // root input path
  entry: './main.js',

  output: { // результат
    path: path.join(__dirname, 'public'),
    filename: 'jscripts/bundle.js',
    publicPath: '/' // root prefix of sites path
  },

  resolve: { // rules for imported modules
    extensions: ['.js'] // WP2
  }, // if name of module is omitted, uses index with extension, eg /component/index.js

  resolveLoader: { // rules for webpack loaders
    extensions: ['.js'] // WP2
  },

  module: {
    loaders: [
      { // import from .js
        include: path.resolve(__dirname, 'frontend'), // path mask
        test: /\.js$/, // file mask
        loader: 'babel-loader', // WP2
        options: { // WP2
          babelrc: false,
          plugins: ['array-includes'], // for IE9: replace includes by indexOf
          presets: ['es2015', 'react'] // 'stage-0'
        }
      },
      { // import from .css
        include: path.resolve(__dirname, 'frontend'), // path mask
        test: /\.css$/, // file mask
        use: ExtractTextPlugin.extract({ // WP2
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][local]'
              }
            },
            'postcss-loader' // postcss additional settings below in section webpack.LoaderOptionsPlugin
          ]
        })
      },
      { // import from .png and others images and fonts
        include: path.resolve(__dirname, 'frontend'), // path mask
        test: /\.(png|jpg|svg|woff)$/, // file mask
        // loader: 'file-loader', // simply copy file with path to output dir
        loader: 'url-loader', // WP2
        options: { // WP2
          name: '[path][name].[ext]',
          limit: 4096 // if file is smaller then limit, then includes as data:url, otherwise file-loader
        }
      },
    ]
  },

  plugins: [ // below, after this section, some plugins are added by conditions
    new webpack.NoEmitOnErrorsPlugin(), // if any error, stop building process WP2

    new webpack.ProvidePlugin({ React: 'react' }), // makes this 'global variable' in any file

    new ExtractTextPlugin('styles/styles.css'), // extracts styles to separate css-file, look also section loaders

    new CopyPlugin(filesToCopy, { copyUnmodified: false }), // copy defined files (copyUnmodified - for watch)

    new webpack.LoaderOptionsPlugin({ // some additional options for loaders WP2
      options: {
        context: path.join(__dirname, 'frontend'), // important for css-loader
        postcss: [
          autoprefixer({ browsers: ['last 2 versions'] }),
        ]
      }
    })
  ],

  // generates source-map for js and css, except production mode WP2
  devtool: NODE_ENV == 'production' ? false : 'source-map'
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push( // add plugins
    new webpack.optimize.UglifyJsPlugin({ // js minification
      beautify: false,      // max minification
      compress: {
        warnings: false,    // do not show warnings
        drop_console: true, // delete calls of console methods
        booleans: true,     // optimisation of logical expressions
        loops: true,        // optimisation of loops
        unused: true,       // delete unused variables and functions
      }
    })
  );
}