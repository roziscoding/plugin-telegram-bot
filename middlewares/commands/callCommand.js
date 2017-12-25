const debug = require('debug')('plugin-telegram-bot:middleware:callCommand')

module.exports = (data, next) => {
  const {msg, args, command, cradle, error} = data
  command.run(msg, args, cradle)
    .then(result => {
      debug(`Got result ${JSON.stringify(result)} from command ${command.name} for user ${msg.from.id}`)
      data.result = result
      next()
    })
    .catch(error)
}
