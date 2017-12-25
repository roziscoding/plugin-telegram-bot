const { createContainer, asValue, asClass } = require('awilix')
const Session = require('./lib/session')
const config = require('./config')

const container = createContainer()

const firstToUpper = string => string.charAt(0).toUpperCase() + string.slice(1)

container.loadModules(['lib/loadCommands.js'], { formatName: x => 'commands' })

container.loadModules(['lib/errors/**/*.js'], {
  formatName (name) {
    return `${firstToUpper(name)}Error`
  }
})

container.register('session', asClass(Session))

container.register('config', asValue(config))

module.exports = {container, asValue}
