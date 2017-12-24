'use strict'

// Necessary bacause of https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = true

const debug = require('debug')('plugin-telegram-bot:startup:debug')

const TelegramBot = require('node-telegram-bot-api')
const {container, asValue} = require('./configureContainer')
const config = require('./config')

debug('loading commands')
const commands = container.cradle.commands
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
      const scope = container.createScope()
      scope.register('msg', asValue(msg))
      const result = await command.run(msg, args, scope.cradle)
      const handler = handlers.get(result.type)
      await handler(msg, result, bot)
    } catch (err) {
      const MissingParamsError = container.cradle.MissingParamsError
      const isMissingParams = err instanceof MissingParamsError

      if (isMissingParams) {
        const text = `Você não informou os parâmetros a seguir: ${err.params.map(x => `\`${x}\``)}`
        return bot.sendMessage(msg.chat.id, text, {parse_mode: 'Markdown'})
          .catch(console.error)
      }

      bot.sendMessage(msg.chat.id, `Erro ao processar o comando: ${err}`)
        .catch(console.error)
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
