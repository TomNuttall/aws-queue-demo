import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddJob from './AddJob'

describe('AddJob', () => {
  it('renders component', async () => {
    // Act
    render(<AddJob />)

    // Assert
    expect(await screen.findByText('Jobs')).toBeInTheDocument()
  })

  // it('select options', async () => {
  //   // Act
  //   render(<StartJob />)

  //   const selectElement = await screen.findByLabelText('Select job type', {
  //     exact: false,
  //   })
  //   const selectOption = screen.getByText('Add')

  //   userEvent.selectOptions(selectElement, selectOption)

  //   screen.debug(selectElement)
  //   console.log(selectOption.selected)
  //   // Assert
  //   expect(selectElement.selected).toBe(true)
  // })
})
