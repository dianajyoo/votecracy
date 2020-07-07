import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import 'dotenv/config';

const client = {
  entry: ['./src/frontend/index.ts', './public/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.bundle.js',
  },
  node: {
    fs: 'empty',
    __dirname: true,
  },
  // Exclude dependency from output bundles
  externals: {
    express: 'express',
  },
  module: {
    rules: [
      // {
      //   test: /\.ejs$/,
      //   use: {
      //     loader: 'ejs-compiled-loader',
      //     options: {
      //       htmlmin: true,
      //       htmlminOptions: {
      //         removeComments: true,
      //       },
      //     },
      //   },
      // },
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
      inject: 'body',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'views', 'index.ejs'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'public/images' },
        { from: 'public/js', to: 'public/js' },
      ],
    }),
    new webpack.EnvironmentPlugin([
      'GOOGLE_MAPS_API_KEY',
      'GOOGLE_GEOCODING_API_KEY',
      'GOOGLE_DIRECTIONS_API_KEY',
      'GOOGLE_CIVIC_INFO_API_KEY',
    ]),
  ],
};

const server = {
  entry: ['./src/app.ts'],
  output: {
    path: path.resolve(__dirname, './dist/src'),
    filename: 'app.bundle.js',
  },
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: true,
  },
  module: {
    rules: [
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'GOOGLE_MAPS_API_KEY',
      'GOOGLE_GEOCODING_API_KEY',
      'GOOGLE_DIRECTIONS_API_KEY',
      'GOOGLE_CIVIC_INFO_API_KEY',
    ]),
  ],
};

export default [client, server];
