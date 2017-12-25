module.exports = (data, next) => {
  if (data.result.type !== 'text') return next()
  const {result, error, msg, bot} = data
  if (!result.text) error(new Error(`Not a valid command text result. ${result}`))
  bot.sendMessage(msg.chat.id, result.text, result.options)
    .then(next)
    .catch(error)
}
