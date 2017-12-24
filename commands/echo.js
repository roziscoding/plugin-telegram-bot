module.exports = {
  name: 'Echo',
  regex: /\/echo (.*)/,
  helpText: 'Echo anything you say, markdown formatted',
  async run (msg, args) {
    return {
      type: 'text',
      text: args[1],
      options: {
        parse_mode: 'Markdown'
      }
    }
  }
}
