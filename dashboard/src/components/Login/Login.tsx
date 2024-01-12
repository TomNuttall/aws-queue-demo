import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AccountContextProps, AccountContext } from '../../lib/Account'

type FormInputs = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const context = useContext<AccountContextProps>(AccountContext)
  const onSubmit = async ({ email, password }: FormInputs) => {
    await context.authenticate(email, password)
  }

  console.log('Login', errors)

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

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
