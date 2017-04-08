import jsonfile from 'jsonfile'

import { repl } from './repl/repl'
import { buildHandler } from './parser/parser'
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
    repl(handlers, context)
  } catch(error) {
    console.log(`error: ${error.toString()}`)
  }
}

main()