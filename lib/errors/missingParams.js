const util = require('util')

const MissingParamsError = function MissingParamsError (params) {
  Error.captureStackTrace(this, MissingParamsError)
  this.name = MissingParamsError.name
  this.params = params
  this.message = `Você não informou os parâmetros ${params.map(x => x.toString())}`
}

util.inherits(MissingParamsError, Error)

module.exports = () => MissingParamsError
