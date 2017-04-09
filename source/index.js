import chalk from 'chalk'
import jsonfile from 'jsonfile'
import { buildRepl } from './repl/repl'
import { buildHandler, buildParser } from './parser/parser'
import { VAT } from './constants/constants'

const main = () => {
  try {
    if (process.argv.length < 3)
      throw new Error('provide path to JSON file holding plans ')
    const path = process.argv[2]
    const plans = jsonfile.readFileSync(path)
    const vatMultiplier = 1 + (VAT / 100)
    const context = { plans, vatMultiplier }
    const handlers = ['exit', 'price', 'usage'].reduce(buildHandler, {})
    const onPass = result => console.log(chalk.green(result))
    const onFail = errors => console.log(chalk.red(`${errors}`))
    const options = { handlers, context, onPass, onFail }
    const parser = buildParser(options)
    buildRepl(parser)
  } catch (error) {
    console.log(`error: ${error.toString()}`)
  }
}

main()