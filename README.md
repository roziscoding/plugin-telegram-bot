plugin-telegram-bot
==

Simple telegram bot boilerplate that treats commands as plugins

## Running
1. Clone the repo
```shell
git clone http://github.com/rjmunhoz/plugin-telegram-bot.git
```
2. `cd` into the folder
```shell
cd plugin-telegram-bot
```

3. Install dependencies
```shell
npm install --only=production
```

4. Set environment variable and run
```shell
API_TOKEN={YOUR_API_TOKEN} npm start
```

## Extending
This bot treats all files on the `commands` folder as commands.
In order to add a new one, you just need to create a new file in such folder.

All commands must export an object following this structure:
```js
module.exports = {
  name: 'command_name',
  regex: /\/command/,
  async run (msg, args, cradle) {
    return  {
      type: 'text',
      text: 'Command result',
      options: {
        parse_mode: 'Markdown'
      }
    }
  }
}
```

## Command interface

### name
This will be the name of your command, used to generate the text returned by the `/help` command

### regex
This is the regex that need to be matched against for you command to run. You can use arguments by caturing them with regex groups (like `/\/echo (.*)/`).

### run
This is the main method of your command. It will be called with three parameters, explained below:

#### msg
This is the original msg object returned from `node-telegram-bot-api`.

#### args
This is the result of executing `regexp.exec` on message text. This is also passed from `node-telegram-bot-api`

#### cradle
This is the IOC container cradle. This object is an `awilix` Proxy, wich contains, by default, the follwing properties:
* `commands` - An array of loaded commands
* [Error classes](docs/errors.md) - Custom error objects that allow better error handling
* [session](docs/session.md) - An object wich allows to get and set info about the user. `[WORK IN PROGRESS]`
* [config](docs/config) - Configuration object that holds all the properties as exported by the [config](config.js) file

Any other properties are internal and subject to change with no warning; using them is not recommended, since changes to these values may cause your bot to break

## Examples
Two command examples are included in the [commands folder](commands). These commands should be enough for you to start with.

As new functionallity gets implemented, new example commands will be created. It's up to you, of course, to keep these commands, or throw them away