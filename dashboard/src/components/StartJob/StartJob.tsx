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
    formState: { errors },
  } = useForm<FormInputs>()

  const context = useContext<AuthContextProps>(AuthContext)

  const onSubmit = async ({ jobType }: FormInputs) => {
    console.log(jobType)
    const session = await context.getSession()
    if (session) {
      const response = await fetch('https://api.jobqueue.tomnuttall.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: session.getAccessToken().getJwtToken(),
        },
        body: jobType.valueOf(),
      })

      const res = await response.text()
      console.log(res)
    }
  }

  return (
    <div className="startJob">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <h2>Jobs</h2>
          <div className="form__input">
            <label htmlFor="jobType">
              Select job type <span className="form__error">*</span>
            </label>
            <div className="form__select">
              <select
                id="jobType"
                aria-invalid={errors.jobType ? 'true' : 'false'}
                {...register('jobType', {
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message: 'error message',
                  },
                })}
              >
                <option value="">Select an option</option>
                <option value="add">Add</option>
                <option value="dlq">DLQ</option>
              </select>
            </div>
            {errors.jobType && (
              <p role="alert" className="form__error">
                An option needs to be selected
              </p>
            )}
          </div>

          <button type="submit">Start Job</button>
        </div>
      </form>
    </div>
  )
}

export default StartJob
