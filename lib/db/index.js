const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

mongoose.Promise = global.Promise

class Database {
  constructor ({ config: { db: config } }) {
    this.config = config
    this.isConnected = false
    this.mongoose = mongoose
    this.models = {}
    this.Schema = mongoose.Schema
  }

  async connect () {
    const me = this
    this.mongoose.connect(this.config.CONNSTRING)
    this.connection = mongoose.connection
    return new Promise((resolve, reject) => {
      me.connection.on('error', err => {
        console.error(`Não foi possível abrir a conexão com o mongodb: ${err}`)
        reject(err)
      })
      me.connection.on('open', () => {
        me.isConnected = true
        resolve(me)
      })
    })
  }

  async disconnect () {
    const me = this
    return new Promise((resolve) => me.mongoose.disconnect(resolve))
  }
}

module.exports = Database
