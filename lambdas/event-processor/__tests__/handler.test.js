import { handler, processMessage } from '../src'
import { jest } from '@jest/globals'

describe('handler', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('checks succesful response for empty message', async () => {
    // Arrange
    const event = { Records: [] }

    // Act
    const res = await handler(event)

    // Assert
    expect(res.statusCode).toBe(200)
  })
})

describe('processMessage', () => {
  it('checks succesful response', async () => {
    // Arrange
    const message = { body: '' }

    // Act
    const promise = processMessage(message)
    jest.runAllTimersAsync()

    const res = await promise

    // Assert
    expect(res).toBeTruthy()
  })
})
