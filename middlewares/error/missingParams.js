module.exports = ({bot, msg, command, err, cradle}, next) => {
  if (!(err instanceof cradle.MissingParamsError)) return next()

  const text = `Você não informou os parâmetros a seguir: ${err.params.map(x => `\`${x}\``)}`

  return bot.sendMessage(msg.chat.id, text, {parse_mode: 'Markdown'})
    .catch(console.error)
}
