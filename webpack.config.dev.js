const path = require('path');
const webpack = require('webpack');
const Plugins = require('./webpack/plugins');

const hotReloadPlugin = new webpack.HotModuleReplacementPlugin();
const cleanWebpackPlugin = new Plugins.CleanWebpackPlugin('dist', {});
const htmlPlugin = new Plugins.HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
const cssPlugin = new Plugins.MiniCssExtractPlugin({
  filename: 'static/style.[hash].css',
  chunkFilename: '[id].css',
});
const styleLintPlugin = new Plugins.StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, 'src/scss'),
  files: '**/*.scss',
  failOnError: false,
  quiet: false,
});

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'static/[name].[hash].js',
  },
  module: {
    rules: [
      {
        sideEffects: false,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    cleanWebpackPlugin,
    hotReloadPlugin,
    htmlPlugin,
    cssPlugin,
    styleLintPlugin,
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 5000,
    open: true,
  },
};
