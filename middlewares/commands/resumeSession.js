module.exports = (data, next) => {
  if (!data.session.command) return next()
}
