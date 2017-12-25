const makeLine = command => {
  return `/${command.name} - ${command.helpText}`
}

const renderHelp = commands => {
  const lines = ['Comandos disponíveis:']
  const commandLines = commands.map(makeLine)
  const footer = ['', 'Para obter ajuda sobre um comando específico, digite `/help (nome_do_comando)`']
  return lines.concat(commandLines)
    .concat(footer)
    .join('\n')
}

module.exports = {
  name: 'help',
  regex: /\/help ?(.*)/,
  helpText: 'Exibe esta mensagem',
  run (msg, args, {commands}) {
    return {
      type: 'text',
      text: renderHelp(commands),
      options: {
        parse_mode: 'Markdown'
      }
    }
  }
}
