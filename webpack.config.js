import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'dotenv/config';

export default {
  mode: 'development',
  entry: ['./src/frontend/index.ts', './public/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.bundle.js',
  },
  // output: {
  //   path: path.resolve(__dirname, './public/js'),
  //   filename: 'main.bundle.js',
  // },
  node: {
    fs: 'empty',
  },
  // Exclude dependency from output bundles
  externals: {
    express: 'express',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from bottom to top(!)
        use: [
          {
            loader: 'file-loader',
            options: { name: 'main.css' },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader?-url',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'views', 'index.ejs'),
    }),
    new webpack.EnvironmentPlugin([
      'GOOGLE_MAPS_API_KEY',
      'GOOGLE_GEOCODING_API_KEY',
      'GOOGLE_DIRECTIONS_API_KEY',
      'GOOGLE_CIVIC_INFO_API_KEY',
    ]),
  ],
};
