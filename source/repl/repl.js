import chalk from 'chalk'
import readline from 'readline'
import { buildParser } from '../parser/parser'

const buildReader = (parser) => {
  const options = { input: process.stdin, output: process.stdout }
  const handler = readline.createInterface(options)
  const onLine = (line) => parser.parse(line)
  const start = () => handler.on('line', onLine)
  const reader = { start }
  return reader
}

const repl = (handlers, context) => {
  const onPass = message => console.log(chalk.green(message))
  const onFail = message => console.log(chalk.red(`${message}`))
  const options = { handlers, context, onPass, onFail }
  const parser = buildParser(options)
  const reader = buildReader(parser)
  reader.start()
}

export { repl }
