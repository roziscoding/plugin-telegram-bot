'use strict'

// Necessary bacause of https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = true

const debug = require('debug')('plugin-telegram-bot:startup:debug')

const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')

debug('loading commands')
const commands = require('./lib/loadCommands')()
debug(`${commands.length} commands loaded`)
debug('loading handlers')
const handlers = require('./lib/loadHandlers')()
debug(`${handlers.size} handlers loaded`)

debug('Creating bot instance')
const bot = new TelegramBot(config.bot.API_TOKEN, {
  polling: {
    autoStart: false
  },
  onlyFirstMatch: true
})

debug('Settings commands up')
commands.forEach(command => {
  bot.onText(command.regex, async (msg, args) => {
    try {
      const result = await command.run(msg, args)
      const handler = handlers.get(result.type)
      await handler(msg, result, bot)
    } catch (err) {
      console.error(err)
      bot.sendMessage(msg.chat.id, `Erro ao processar o comando: ${err}`)
    }
  })
})

debug('Starting polling')
bot.startPolling()
debug('Polling started')
bot.getMe()
  .then(me => {
    console.log(`Polling started for bot ${me.username}`)
  })
