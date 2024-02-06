import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StartJob from './StartJob'
import { AuthContext } from '../../lib/AuthContext'

describe('StartJob', () => {
  it('renders title', async () => {
    // Arrange
    const authenticate = jest.fn()
    const getSession = jest.fn()
    const logout = jest.fn()

    // Act
    render(
      <AuthContext.Provider value={{ authenticate, getSession, logout }}>
        <StartJob />
      </AuthContext.Provider>,
    )

    const buttonElement = await screen.getByRole('button')
    await userEvent.click(buttonElement)

    // Assert
    expect(authenticate).toHaveBeenCalledOnce()
  })
})
