import { describe, it, expect, beforeAll, vi } from 'vitest'
import { handler, processMessage } from '../src'

describe('handler', () => {
  beforeAll(() => {
    vi.useFakeTimers()
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
  beforeAll(() => {
    vi.useFakeTimers()
  })

  it('checks succesful response', async () => {
    // Arrange
    const message = { body: '' }

    // Act
    const promise = processMessage(message)
    vi.runAllTimersAsync()

    const res = await promise

    // Assert
    expect(res).toBeTruthy()
  })

  it('throws error if DLQ', async () => {
    // Arrange
    const message = { body: 'DLQ' }

    // Act
    const testThrow = async () => {
      const promise = processMessage(message)
      vi.runAllTimersAsync()

      await promise
    }

    // Assert
    expect(async () => {
      await testThrow()
    }).rejects.toThrow('DLQ Test')
  })
})
