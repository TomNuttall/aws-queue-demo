import { useForm } from 'react-hook-form'
import UserPool from '../../lib/UserPool'

type FormInputs = {
  email: string
  password: string
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit = ({ email, password }: FormInputs) => {
    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.error(err)
      }

      console.log(data)
    })
  }

  console.log('Signup', errors)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input {...register('email', { required: true })}></input>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
        ></input>

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
