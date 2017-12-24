const path = require('path')
const fs = require('fs')

const handlersDir = path.join(__dirname, '../handlers')

const makeHandlerPath = handler => path.join(handlersDir, handler)

module.exports = () => {
  const handlerFiles = fs.readdirSync(handlersDir)
  return handlerFiles.reduce((map, handlerFile) => {
    const handler = require(makeHandlerPath(handlerFile))()
    return map.set(handler.type, handler.handler)
  }, new Map())
}
