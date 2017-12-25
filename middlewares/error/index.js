const missingParams = require('./missingParams')
module.exports = {
  setup (manager) {
    manager.use('onError', missingParams)
  }
}
