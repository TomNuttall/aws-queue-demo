import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
const snsClient = new SNSClient({})

export const handler = async (event) => {
  const res = await snsClient.send(
    new PublishCommand({
      Message: 'Tom Test',
      TopicArn: process.env.TOPIC_ARN,
    }),
  )

  const response = {
    statusCode: 200,
    body: 'Success',
  }

  return response
}
