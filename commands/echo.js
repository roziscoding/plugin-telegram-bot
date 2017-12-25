module.exports = {
  name: 'echo',
  regex: /\/echo ?(.*)/,
  helpText: 'Echo anything you say, markdown formatted',
  async run (msg, args, { MissingParamsError }) {
    if (!args[1]) throw new MissingParamsError(['texto'])
    return {
      type: 'text',
      text: args[1],
      options: {
        parse_mode: 'Markdown'
      }
    }
  }
}
