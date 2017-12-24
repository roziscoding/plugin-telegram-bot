module.exports = {
  type: 'text',
  handler (msg, result, bot) {
    if (!result.text) throw new Error(`Not a valid command result. ${result}`)
    return bot.sendMessage(msg.chat.id, result.text, result.options)
  }
}
