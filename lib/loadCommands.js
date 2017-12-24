const path = require('path')
const fs = require('fs')

const commandsDir = path.join(__dirname, '../commands')

const makeCommandPath = command => path.join(commandsDir, command)

module.exports = () => {
  const commandFiles = fs.readdirSync(commandsDir)
  return commandFiles.map(x => require(makeCommandPath(x)))
}
