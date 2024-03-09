export const handler = async (event) => {
  try {
    for (const message of event.Records) {
      await processMessage(message)
    }
  } catch (err) {
    throw err
  }

  const response = {
    statusCode: 200,
    body: 'Success',
  }

  return response
}

export const processMessage = async (message) => {
  if (message.body === 'DLQ') {
    throw new Error('DLQ Test')
  }

  console.log(`Start process message ${message.body}`)
  await delay(5000)
  console.log(`End process message ${message.body}`)
  return Promise.resolve(true)
}

const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
