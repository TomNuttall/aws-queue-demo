import { handler, processMessage } from '../src'

describe('handler', () => {
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
    const res = await processMessage(message)

    // Assert
    expect(res).toBeTruthy()
  })
})
