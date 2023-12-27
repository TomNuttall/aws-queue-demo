import { handler } from '../src'

describe('handler', () => {
  it('checks succesful response', async () => {
    // Arrange
    const event = { Records: [] }

    // Act
    const res = await handler(event)

    // Assert
    expect(res.statusCode).toBe(200)
  })
})
