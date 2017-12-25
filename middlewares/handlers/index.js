const textHandler = require('./text')
const unmatchedHandler = require('./unmatched')

module.exports = {
  setup (pipeline) {
    pipeline.use('onCommand', textHandler)
    pipeline.use('onCommand', unmatchedHandler)
  }
}
