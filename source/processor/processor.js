import repl from 'repl'
import chalk from 'chalk'

const buildHandler = (handlers, name) => {
  const { command } = require(`../commands/${name}`)
  const { format } = require(`../formats/${name}`)
  handlers[name] = { command, format }
  return handlers
}

const buildParser = (handlers, context) => {
  const parser = (input, constants, filename, callback) => {
    const onPass = message => callback(chalk.green(message))
    const onFail = message => callback(chalk.red(`${message}`))
    const tokens = input.trim().split(/\s+/)
    const action = tokens[0].toLowerCase()
    if (!handlers[action])
      return callback(eval(input))
    const { command, format } = handlers[action]
    const options = { tokens, context }
    try { return onPass(format(command(options))) }
    catch(error) { onFail(error.toString()) }
  }
  return parser
}

const processor = (handlers, context) => {
  const options = {
    prompt: '',
    eval: buildParser(handlers, context)
  }
  repl.start(options)
}

export { processor, buildHandler }
