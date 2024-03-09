import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContextProps, AuthContext } from '../../lib/AuthContext'

import './AddJob.scss'

enum JobEnum {
  add = 'Job',
  dlq = 'DLQ',
}

interface FormInputs {
  jobType: JobEnum
  jobCount: string
}

const AddJob: React.FC = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const jobCount = watch('jobCount')
  const context = useContext<AuthContextProps>(AuthContext)

  const onSubmit = async ({ jobType, jobCount }: FormInputs) => {
    const session = await context.getSession()
    if (session) {
      const count = parseInt(jobCount)
      const promises = Array(count)
        .fill(0)
        .map((_: number, idx: number) =>
          fetch('https://api.jobqueue.tomnuttall.dev', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: session.getAccessToken().getJwtToken(),
            },
            body: jobType === JobEnum.add ? `Message ${idx}` : 'DLQ',
          }),
        )

      await Promise.all(promises)
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
                <option value={JobEnum.add}>Add to Queue</option>
                <option value={JobEnum.dlq}>Throw to Dead Letter Queue</option>
              </select>
            </div>
            {errors.jobType && (
              <p role="alert" className="form__error">
                An option needs to be selected
              </p>
            )}
          </div>

          <div className="form__input">
            <label htmlFor="jobCount">Select queue amount</label>
            <div className="form__select">
              <select id="jobCount" {...register('jobCount')}>
                <option disabled value="">
                  Select an option
                </option>
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <button type="submit">{`Add Job${
            jobCount === '1' ? '' : 's'
          }`}</button>
        </div>
      </form>
    </div>
  )
}

export default AddJob
