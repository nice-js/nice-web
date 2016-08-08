// cmrh.conf.js
const lessParser = require('postcss-less').parse

module.exports = {
  extensions: '.less',
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  processorOpts: {parser: lessParser}
}
