const pipeline = require('simple-middleware-manager').default()
const commandMiddlewares = require('./commands')
const handlerMìddlewares = require('./handlers')
const errorMiddlewares = require('./error')

module.exports = pipeline => {
  commandMiddlewares.setup(pipeline)
  handlerMìddlewares.setup(pipeline)
  errorMiddlewares.setup(pipeline)
}