Config file
===

The [config file](../config.js) takes care of loading environment variables and passing them to the whole bot as usual variables.
All configs should be set through environment variables, and you should only edit the file itself if you're including new variables.

Currently, these are all possible configs and their reason to be:

## API_TOKEN
* Required: **yes**
* Description: Telegram Bot API token obtained from [@botfather](https://t.me/botfather)
* Environment variable name: `API_TOKEN`