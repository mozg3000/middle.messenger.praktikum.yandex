const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'msgya.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              transpileOnly: true
            },
          },
        ],
        resolve: {
          extensions: ['.ts', '.js', '.json'],
          enforceExtension: false,
          fallback: {
            fs: path.join(__dirname, 'node_modules')
          },
          alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js'
          }
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    "postcss-import",
                    "postcss-simple-vars"
                  ],
                ],
              },
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new ESLintPlugin({

    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: __dirname + "/src/assets", to: __dirname + "/dist/assets" },
      ],
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
};
