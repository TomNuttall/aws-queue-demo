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
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <h2>Sign in</h2>

          <div className="form__input">
            <label htmlFor="username">
              Username <span className="form__error">*</span>
            </label>
            <input
              id="username"
              aria-invalid={errors.username ? 'true' : 'false'}
              {...register('username', { required: true })}
            ></input>
            {errors.username && (
              <p role="alert" className="form__error">
                A username is required
              </p>
            )}
          </div>

          <div className="form__input">
            <label htmlFor="password">
              Password <span className="form__error">*</span>
            </label>
            <input
              id="password"
              aria-invalid={errors.password ? 'true' : 'false'}
              type="password"
              {...register('password', { required: true })}
            ></input>
            {errors.password && (
              <p role="alert" className="form__error">
                A password is required
              </p>
            )}
          </div>

          <button type="submit">Login</button>
          {loginError && (
            <p role="alert" className="form__error login__submit">
              {loginError}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
