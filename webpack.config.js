const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

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
            fs: path.join(__dirname, 'node_modules') // @see https://github.com/handlebars-lang/handlebars.js/issues/953#issuecomment-94931306
          },
          alias: {
            'handlebars': 'handlebars/runtime.js' // @see https://github.com/handlebars-lang/handlebars.js/issues/953#issuecomment-94931306
          }
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader"
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

    })
  ]
};
