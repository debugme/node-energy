import { command } from '../../source/commands/usage'
import plans from '../../data/plans'

describe('the usage command function', () => {

  let options = null

  beforeEach(() => {
    options = { tokens: [/* each test to fill in */], context: { plans, 'vatMultiplier': 1.05 } }
  })

  it('should return correct usage for constant plan', () => {
    options.tokens = ['usage', 'bg', 'standing-charge', 120]
    expect(command(options)).toMatchSnapshot()
  })

  it('should return correct usage for variable plan', () => {
    options.tokens = ['usage', 'ovo', 'standard', 1000]
    expect(command(options)).toMatchSnapshot()
  })

  it('should throw an error if wrong number of arguments were passed in', () => {
    options.tokens = ['usage']
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

  it('should throw an error if an unrecognised supplier was passed in', () => {
    options.tokens = ['usage', 'banana', 'variable', 1000]
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

  it('should throw an error if an unrecognised plan was passed in', () => {
    options.tokens = ['usage', 'eon', 'banana', 1000]
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

  it('should throw an error if invalid monthly spend was passed in ', () => {
    options.tokens = ['usage', 'eon', 'variable', 10.5]
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

  it('should throw an error if invalid supplier and plan were passed in', () => {
    options.tokens = ['usage', 'ovo', 'variable', 10]
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

})
