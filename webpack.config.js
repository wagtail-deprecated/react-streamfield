const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = (env, argv) => {
  const config = {
    entry: {'react-streamfield': './src/index.js'},
    output: {
      path: path.resolve('dist'),
      filename: '[name].js',
      publicPath: '/static/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ]
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  };

  if (argv.mode === 'production') {
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            output: {
              comments: false,
              beautify: false
            },
            compress: {
              drop_console: true,
              hoist_funs: true,
              passes: 2,
              toplevel: true,
              warnings: true
            }
          }
        })
      ]
    }
  }
  return config;
};
