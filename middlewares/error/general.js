module.exports = ({bot, msg, command, err, cradle}, next) => {
  const lines = [`Erro ao executar o comando \`${command.name}\`:`]
  lines.push(`\`${err.message}\``)
  bot.sendMessage(msg.chat.id, lines.join('\n'), { parse_mode: 'Markdown' })
    .then(next)
    .catch(err => {
      const lines = [`Erro ao processar o comando ${command.name}: ${err}`]
      lines.push(`Objeto de mensagem: ${msg}`)
      console.error(lines.join('\n'))
    })
}
