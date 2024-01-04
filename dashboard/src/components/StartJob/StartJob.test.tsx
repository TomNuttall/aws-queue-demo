import { render, screen } from '@testing-library/react'
import StartJob from '.'

describe('StartJob', () => {
  it('renders title', async () => {
    // Arrange

    // Act
    render(<StartJob />)

    // Assert
    expect(await screen.findByText('Start Job')).toBeInTheDocument()
  })
})
