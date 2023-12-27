export const handler = async (event) => {
  console.log(event)

  try {
    for (const message of event.Records) {
      await processMessage(message)
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

export const processMessage = async (message) => {
  console.log(`Processed message ${message.body}`)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}
