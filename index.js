'use strict'

// Necessary bacause of https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = true

const debug = require('debug')('plugin-telegram-bot:startup:debug')
const pipeline = require('simple-middleware-manager').default()
const setupPipeline = require('./middlewares')
setupPipeline(pipeline)

const TelegramBot = require('node-telegram-bot-api')
const { container } = require('./configureContainer')
const { config, commands } = container.cradle

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
    debug(`Got text ${msg.text}`)
    debug(`Matched command ${command.name}`)
    const error = err => pipeline.trigger('onError', {
      bot,
      err,
      msg,
      command,
      cradle: container.cradle
    })

    pipeline.trigger('onCommand', {msg, args, container, command, bot, error})
  })
})

debug('Starting polling')
bot.startPolling()
debug('Polling started')
bot.getMe()
  .then(me => {
    console.log(`Polling started for bot ${me.username}`)
  })
