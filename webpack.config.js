const path = require('path')

module.exports = {
  entry: './index.js',
  externals: {
    firebase: 'firebase'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser-client.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
}
