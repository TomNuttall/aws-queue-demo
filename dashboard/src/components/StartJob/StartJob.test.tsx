import { render, screen } from '@testing-library/react'
import StartJob from './StartJob'

describe('StartJob', () => {
  it('renders component', async () => {
    // Act
    render(<StartJob />)

    // Assert
    expect(await screen.findByText('Jobs')).toBeInTheDocument()
  })

  // it('select options', async () => {
  //   // Act
  //   render(<StartJob />)

  //   // const buttonElement = await screen.getByRole('button')
  //   // await userEvent.click(buttonElement)

  //   // Assert
  //   expect(await screen.findByText('Jobs')).toBeInTheDocument()
  // })
})
