const startSession = require('./startSession')
const callCommand = require('./callCommand')
module.exports = {
  setup (pipeline) {
    pipeline.use('onCommand', startSession)
    pipeline.use('onCommand', callCommand)
  }
}
