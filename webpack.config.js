const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './example/index.tsx',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'example/dist'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
};