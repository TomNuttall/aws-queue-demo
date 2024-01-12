import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AccountContextProps, AccountContext } from '../../lib/Account'

import './StartJob.scss'

enum JobEnum {
  add = 'Job',
  dlq = 'DLQ',
}

interface FormInputs {
  jobType: JobEnum
}

const StartJob: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const context = useContext<AccountContextProps>(AccountContext)
  const onSubmit = async ({ jobType }: FormInputs) => {
    const session = await context.getSession()
    const response = await fetch('https://api.jobqueue.tomnuttall.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session.accessToken.jwtToken,
      },
      body: jobType.valueOf(),
    })

    const res = await response.text()
    console.log(res)
  }

  return (
    <div className="start-job">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="jobType">Select job type</label>
        <select id="jobType" {...register('jobType')}>
          <option value="add">Add</option>
          <option value="dlq">DLQ</option>
        </select>

        <button type="submit">Start Job</button>
      </form>
    </div>
  )
}

export default StartJob
