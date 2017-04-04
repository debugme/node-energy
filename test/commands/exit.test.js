import { command } from '../../source/commands/exit'

describe('the exit command function', () => {
  it('should request program termination', () => {
    const processExit = jest.spyOn(process, 'exit').mockImplementation()
    command()
    expect(processExit).toHaveBeenCalledTimes(1)
    expect(processExit).toHaveBeenCalledWith(0)
    processExit.mockReset()
    processExit.mockRestore()
  })
})