import { buildRepl } from '../../source/repl/repl'

describe('the buildRepl function', () => {

  it('should call parser.parse when fed input', () => {
    const parser = { parse: jest.fn() }
    const repl = buildRepl(parser)
    repl.write('\n')
    expect(parser.parse).toHaveBeenCalled()
  })
})
