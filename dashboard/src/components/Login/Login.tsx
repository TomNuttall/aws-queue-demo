import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContextProps, AuthContext } from '../../lib/AuthContext'

import './Login.scss'

type FormInputs = {
  username: string
  password: string
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormInputs>()

  const context = useContext<AuthContextProps>(AuthContext)
  const onSubmit = async ({ username, password }: FormInputs) => {
    await context.authenticate(username, password)
  }

  return (
    <div className="panel">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="panel__form">
          <h2>Sign in</h2>
          <div className="panel__input">
            <label htmlFor="username">Username</label>
            <input {...register('username', { required: true })}></input>
          </div>

          <div className="panel__input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
            ></input>
          </div>

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
