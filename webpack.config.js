var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './animations.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ]
      },
      
    stats: {
        colors: true
    },
    devtool: 'source-map'
};