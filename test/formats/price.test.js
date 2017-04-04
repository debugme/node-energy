import { format } from '../../source/formats/price'

describe('the price format function', () => {
  it('should render passed in data correctly', () => {
    const expectData = 'eon,variable,108.68'
    const actualData = format([{ supplier: 'eon', plan: 'variable', totalCost: 108.68 }])
    expect(actualData).toBe(expectData)
  })
})
