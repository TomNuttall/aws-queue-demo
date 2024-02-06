import { render, screen } from '@testing-library/react'
import Login from '.'

describe('Login', () => {
  it('renders title', async () => {
    // Arrange
    const title = 'Project'

    // Act
    render(<Login />)

    // Assert
    expect(await screen.findByText(title)).toBeInTheDocument()
  })
})
