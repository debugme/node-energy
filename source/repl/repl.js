import readline from 'readline'

const buildRepl = (parser) => {
  const config = { input: process.stdin, output: process.stdout, prompt: '' }
  const reader = readline.createInterface(config)
  const onLine = (line) => parser.parse(line)
  reader.on('line', onLine)
  return reader
}

export { buildRepl }
