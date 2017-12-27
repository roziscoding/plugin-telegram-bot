'use strict'

if (!process.env.API_TOKEN) throw new Error('No Telegram API token provided!')

const bot = {
  API_TOKEN: process.env.API_TOKEN
}

const db = {
  CONNSTRING: process.env.DB_CONNSTRING || 'mongodb://localhost/pluginbot'
}

module.exports = { bot, db }
