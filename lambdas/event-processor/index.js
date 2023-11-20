export const handler = async (event) => {
  throw 'Test DLQ'
  for (const message of event.Records) {
    await processMessageAsync(message)
  }
  console.info('done')

  const response = {
    statusCode: 200,
    body: 'Success',
  }

  return response
}

const processMessageAsync = async (message) => {
  try {
    console.log(`Processed message ${message.body}`)
    // TODO: Do interesting work based on the new message
    await Promise.resolve(1) //Placeholder for actual async work
  } catch (err) {
    console.error('An error occurred')
    throw err
  }
}
