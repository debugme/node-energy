import { format } from '../../source/formats/usage'

describe('the usage format function', () => {
  it('should render passed in data correctly', () => {
    const expectData = 44267
    const actualData = format(44267)
    expect(actualData).toBe(expectData)
  })
})
