import { command } from '../../source/commands/price'
import plans from '../../data/plans'

describe('the price command function', () => {

  let options = null

  beforeEach(() => {
    options = { tokens: [/* each test to fill in */], context: { plans, 'vatMultiplier': 1.05 }}
  })

  it('should generate a table when given valid inputs', () => {
    options.tokens = ['price', '1000']
    const table = [
      { supplier: 'eon', plan: 'variable', totalCost: 108.68 },
      { supplier: 'edf', plan: 'fixed', totalCost: 111.25 },
      { supplier: 'ovo', plan: 'standard', totalCost: 120.23 },
      { supplier: 'bg', plan: 'standing-charge', totalCost: 121.33 }
    ]
    expect(command(options)).toEqual(table)
  })

  it('should throw an error if wrong number of arguments were passed in', () => {
    options.tokens = ['price']
    const expectMessage = 'Error: format is "price <annual_usage>"'
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toEqual(expectMessage)
  })

  it('should throw an error if invalid annual usage was passed in', () => {
    options.tokens = ['price', '10.5']
    const expectMessage = 'Error: annual usage "10.5" is not a positive integer amount'
    let actualMessage = ''
    try { command(options) }
    catch (error) { actualMessage = error.toString() }
    expect(actualMessage).toEqual(expectMessage)
  })

})
