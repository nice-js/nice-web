// cmrh.conf.js
const lessParser = require('postcss-less').parse
const localIdentName = require('./webpack/constants').localIdentName

module.exports = {
  extensions: '.less',
  generateScopedName: localIdentName,
  processorOpts: {
    parser: lessParser
  }
}
