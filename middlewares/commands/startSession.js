const {asValue} = require('awilix')
const debug = require('debug')('plugin-telegram-bot:middleware:startSession')
module.exports = (data, next) => {
  const {msg, container, error, command} = data
  const scope = container.createScope()
  scope.register('msg', asValue(msg))
  data.cradle = scope.cradle
  const session = data.cradle.Session
  session.load()
    .then(session => {
      debug(`Started session for user ${session.userId} with command ${command.name}`)
      scope.register('session', asValue(session))
      next()
    })
    .catch(error)
}
