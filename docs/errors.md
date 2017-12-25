Custom Error objects
===
This boilerplate uses some custom error objects that your commands should throw if needed, in order to allow a correct handling of these errors by the error middlewares

The currently available error classes are:

# MissingParamsError
This error should be thrown whenever the user doesn't specify one or more required parameters (see echo command)

Signature:
```js
/**
 * @param missingParams Array of missing param names
 **/
class MissingParamsError (missingParams: Array)
```

Usage:
```js
throw new MissingParamsError(['name'])
```

---
Any other error thrown will be sent to the user with a generic error message.