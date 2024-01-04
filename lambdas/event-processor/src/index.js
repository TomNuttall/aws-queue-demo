export const handler = async (event) => {
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
  console.log(`Start process message ${message.body}`)
  await delay(2000)
  console.log(`Install`)
  await delay(2000)
  console.log(`Build`)
  await delay(2000)
  console.log(`Test`)
  await delay(2000)
  console.log(`Deploy`)
  await delay(2000)
  console.log(`End process message ${message.body}`)

  return Promise.resolve(true)
}

const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
