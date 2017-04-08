const buildHandler = (handlers, name) => {
  const { command } = require(`../commands/${name}`)
  const { format } = require(`../formats/${name}`)
  handlers[name] = { command, format }
  return handlers
}

const buildParser = (options) => {
  const { handlers, context, onPass, onFail } = options
  const parse = (input) => {
    const tokens = input.trim().split(/\s+/)
    const action = tokens[0].toLowerCase()
    try {
      if (handlers[action]) {
        const { command, format } = handlers[action]
        const options = { tokens, context }
        return onPass(format(command(options)))
      }
      if (action)
        return onPass(eval(input))
    }
    catch (error) {
      onFail(error.toString())
    }
  }
  const parser = { parse }
  return parser
}

export { buildHandler, buildParser }