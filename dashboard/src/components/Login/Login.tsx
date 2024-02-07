import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContextProps, AuthContext } from '../../lib/AuthContext'

import './Login.scss'

type FormInputs = {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const context = useContext<AuthContextProps>(AuthContext)
  const onSubmit = async ({ username, password }: FormInputs) => {
    setLoginError('')
    try {
      await context.authenticate(username, password)
    } catch (error: any) {
      setLoginError(error.message)
    }
  }

  return (
    <div className="panel login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="panel__form">
          <h2>Sign in</h2>

          <div className="panel__input">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              {...register('username', { required: true })}
            ></input>
            {errors.username && (
              <p className="login__error">A username is required</p>
            )}
          </div>

          <div className="panel__input">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: true })}
            ></input>
            {errors.password && (
              <p className="login__error">A password is required</p>
            )}
          </div>

          <button type="submit">Login</button>
          {loginError && (
            <p className="login__error login__submit">{loginError}</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
