const {asValue} = require('awilix')
const debug = require('debug')('plugin-telegram-bot:middleware:startSession')
module.exports = (data, next) => {
  const {msg, container} = data
  const scope = container.createScope()
  scope.register('msg', asValue(msg))
  data.cradle = scope.cradle
  delete data.container
  debug(`Started session for user ${msg.from.id} with command ${data.command.name}`)
  next()
}
