import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { AuthContext } from '../../lib/AuthContext'
import Login from './Login'

describe('Login', () => {
  it('renders component', async () => {
    // Act
    render(<Login />)

    // Assert
    expect(await screen.findByText('Sign in')).toBeInTheDocument()
  })

  it('can fill in fields', async () => {
    // Arrange
    const username = 'test@test.com'

    // Act
    render(<Login />)

    const usernameField = await screen.getByRole('textbox', {
      name: 'Username',
    })

    await userEvent.type(usernameField, username)

    // Assert
    expect(usernameField).toHaveValue(username)
  })

  it('shows error message if require fields are empty`', async () => {
    // Arrange
    const authenticate = vi.fn()
    const getSession = vi.fn()
    const logout = vi.fn()

    // Act
    render(
      <AuthContext.Provider value={{ authenticate, getSession, logout }}>
        <Login />
      </AuthContext.Provider>,
    )

    const passwordField = await screen.getByLabelText('Password')
    await userEvent.type(passwordField, '123')

    const buttonElement = await screen.getByRole('button')
    await userEvent.click(buttonElement)

    // Assert
    expect(
      await screen.findByText('A username is required'),
    ).toBeInTheDocument()
  })

  it('can submit login form`', async () => {
    // Arrange
    const authenticate = vi.fn()
    const getSession = vi.fn()
    const logout = vi.fn()

    // Act
    render(
      <AuthContext.Provider value={{ authenticate, getSession, logout }}>
        <Login />
      </AuthContext.Provider>,
    )

    const usernameField = await screen.getByLabelText('Username')
    await userEvent.type(usernameField, 'test@test.com')

    const passwordField = await screen.getByLabelText('Password')
    await userEvent.type(passwordField, '123')

    const buttonElement = await screen.getByRole('button')
    await userEvent.click(buttonElement)

    // Assert
    expect(authenticate).toHaveBeenCalledOnce()
  })

  it('shows error message if submit fails`', async () => {
    // Arrange
    const errorMsg = 'Incorrect username or password.'
    const authenticate = vi.fn(() => Promise.reject(new Error(errorMsg)))
    const getSession = vi.fn()
    const logout = vi.fn()

    // Act
    render(
      <AuthContext.Provider value={{ authenticate, getSession, logout }}>
        <Login />
      </AuthContext.Provider>,
    )

    const usernameField = await screen.getByLabelText('Username')
    await userEvent.type(usernameField, 'test@test.com')

    const passwordField = await screen.getByLabelText('Password')
    await userEvent.type(passwordField, '123')

    const buttonElement = await screen.getByRole('button')
    await userEvent.click(buttonElement)

    // Assert
    expect(await screen.findByText(errorMsg)).toBeInTheDocument()
  })
})
