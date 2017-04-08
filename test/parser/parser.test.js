import { command } from '../../source/commands/exit'
import { format } from '../../source/formats/exit'
import { buildHandler, buildParser } from '../../source/parser/parser'

describe('the buildHandler function', () => {
  it('should correctly build a valid handler', () => {
    const name = 'exit'
    const handlers = {}
    buildHandler(handlers, name)
    expect(handlers).not.toBe({})
    expect(handlers[name]).toBeTruthy()
    expect(handlers[name].command).toBe(command)
    expect(handlers[name].format).toBe(format)
  })
})

describe('the buildParser function', () => {

  let options = null
  let parser = null

  beforeEach(() => {
    const plans = require('./parser.data.json')
    const vatMultiplier = 1.05
    const context = { plans, vatMultiplier }
    const handlers = ['price'].reduce(buildHandler, {})
    const onPass = jest.fn()
    const onFail = jest.fn()
    options = { handlers, context, onPass, onFail }
    parser = buildParser(options)
  })

  it('should correctly process supported commands with valid arguments', () => {
    const input = '  pRiCe  1000  '
    const expectedData = 'eon,variable,108.68\nedf,fixed,111.25'
    parser.parse(input)
    expect(options.onPass).toHaveBeenCalledWith(expectedData)
  })

  it('should correctly process supported commands with invalid arguments', () => {
    const input = 'PRIce naughty'
    const expectedData = 'Error: annual usage "naughty" is not a positive integer amount'
    parser.parse(input)
    expect(options.onFail).toHaveBeenCalledWith(expectedData)
  })

  it('should correctly process a blank line of input', () => {
    const input = ''
    parser.parse(input)
    expect(options.onPass).not.toHaveBeenCalled()
    expect(options.onFail).not.toHaveBeenCalled()
  })

  it('should correctly process a valid JavaScript expression', () => {
    const input = '( 1  + 2 +  3 )'
    const expectedData = 6
    parser.parse(input)
    expect(options.onPass).toHaveBeenCalledWith(expectedData)
  })

  it('should correctly process invalid expressions', () => {
    const input = 'naughty'
    const expectedData = 'ReferenceError: naughty is not defined'
    parser.parse(input)
    expect(options.onFail).toHaveBeenCalledWith(expectedData)
  })

})