export const handler = async (event) => {
  try {
    for (const message of event.Records) {
      await processMessageAsync(message)
    }
  } catch (err) {
    console.error('An error occurred')
    throw err
  }

  const response = {
    statusCode: 200,
    body: 'Success',
  }

  return response
}

const processMessageAsync = async (message) => {
  console.log(`Processed message ${message.body}`)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
}
