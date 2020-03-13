const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin  =  require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.min.js'
  },
  devServer: {
    contentBase: './dist',
    port: 7700
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/public/path/to/',
            },
          },
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlReplaceWebpackPlugin([{
      pattern: '<link rel="stylesheet" href="css/styles.css">',
      replacement: '<link rel="stylesheet" href="app.min.css">'
    },
    {
      pattern: '<script src="js/main.js"></script>',
      replacement: '<script src="app.min.js"></script>'
    }
    ]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'app.min.css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash()
  ]
};