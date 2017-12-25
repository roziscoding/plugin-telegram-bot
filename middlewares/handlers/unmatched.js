module.exports = data => {
  const { error, result } = data
  const text = `Não existe handler definido para o tipo de resultado ${result.type} do comando ${data.command.name}`
  return error(new Error(text))
}
