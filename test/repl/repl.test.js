import { buildHandler } from '../../source/parser/parser'
import { buildRepl } from '../../source/repl/repl'

describe('the buildRepl function', () => {

  it('should call parser.parse when fed input', () => {
    const plans = require('./repl.data.json')
    const vatMultiplier = 1.05
    const context = { plans, vatMultiplier }
    const handlers = ['price'].reduce(buildHandler, {})
    const options = { handlers, context }
    const parser = { parse: jest.fn() }
    const repl = buildRepl(options, parser)
    repl.write('hello\n')
    expect(parser.parse).toHaveBeenCalled()
  })
})
