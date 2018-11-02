const path = require('path');
const Plugins = require('./webpack/plugins');

const cleanWebpackPlugin = new Plugins.CleanWebpackPlugin('dist', {});
const htmlPlugin = new Plugins.HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
const cssPlugin = new Plugins.MiniCssExtractPlugin({
  filename: 'static/style.[contenthash].css',
  chunkFilename: '[id].css',
});

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'static/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          Plugins.MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    cleanWebpackPlugin,
    htmlPlugin,
    cssPlugin,
  ],
};
