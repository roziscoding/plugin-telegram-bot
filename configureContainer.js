const { createContainer, asValue, asClass } = require('awilix')
const Session = require('./lib/session')

const container = createContainer()

const firstToUpper = string => string.charAt(0).toUpperCase() + string.slice(1)

container.loadModules(['lib/loadCommands.js'], { formatName: x => 'commands' })
container.loadModules(['handlers/**/*.js'], {
  formatName (name) {
    return `${name}Handler`
  }
})

container.loadModules(['lib/errors/**/*.js'], {
  formatName (name) {
    return `${firstToUpper(name)}Error`
  }
})

container.register('session', asClass(Session))

module.exports = {container, asValue}
