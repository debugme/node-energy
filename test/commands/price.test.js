import { command } from '../../source/commands/price'
import plans from '../../data/plans'

describe('the price command function', () => {

  let options = null

  beforeEach(() => {
    options = { tokens: [/* each test to fill in */], context: { plans, 'vatMultiplier': 1.05 }}
  })

  it('should generate a table when given valid inputs', () => {
    options.tokens = ['price', '1000']
    expect(command(options)).toMatchSnapshot()
  })

  it('should throw an error if wrong number of arguments were passed in', () => {
    options.tokens = ['price']
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

  it('should throw an error if invalid annual usage was passed in', () => {
    options.tokens = ['price', '10.5']
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toMatchSnapshot()
  })

})
