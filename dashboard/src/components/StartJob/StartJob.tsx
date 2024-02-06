import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContextProps, AuthContext } from '../../lib/AuthContext'

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
    // formState: { errors },
  } = useForm<FormInputs>()

  const context = useContext<AuthContextProps>(AuthContext)

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
    <div className="panel">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="panel__form">
          <h2>Start Job</h2>
          <div className="panel__input">
            <label htmlFor="jobType">Select job type</label>
            <div className="panel__select">
              <select id="jobType" {...register('jobType')}>
                <option value="add">Add</option>
                <option value="dlq">DLQ</option>
              </select>
            </div>
          </div>

          <button type="submit">Start Job</button>
        </div>
      </form>
    </div>
  )
}

export default StartJob
