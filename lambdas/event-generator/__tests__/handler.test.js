import { mockClient } from 'aws-sdk-client-mock'
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'

import { handler } from '../src'

const snsMock = mockClient(SNSClient)

describe('handler', () => {
  beforeEach(() => {
    snsMock.reset()
  })

  it('checks succesful response', async () => {
    // Arrange
    const msgId = '1234'
    snsMock.on(PublishCommand).resolves({
      MessageId: msgId,
    })

    // Act
    const res = await handler({})

    // Assert
    expect(res.MessageId).toBe(msgId)
  })
})
