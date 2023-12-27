import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'

const snsClient = new SNSClient({})

export const handler = async (_) => {
  const res = await snsClient.send(
    new PublishCommand({
      Message: 'Test Message',
      TopicArn: process.env.TOPIC_ARN,
    }),
  )

  return res
}
