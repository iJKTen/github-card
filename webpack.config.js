const path = require('path');
const MergeIntoSingle = require('webpack-merge-and-include-globally');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'githubcard.min.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
