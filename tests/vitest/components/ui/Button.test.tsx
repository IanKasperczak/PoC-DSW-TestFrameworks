import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'

describe('Button Component', () => {
  it('debería renderizar el texto pasado como children', () => {
    // Arrange
    const buttonText = 'Click me'

    // Act
    render(<Button>{buttonText}</Button>)

    // Assert
    const button = screen.getByText(buttonText)
    expect(button).toBeInTheDocument()
  })

  it('debería ejecutar la función onClick cuando el usuario hace clic', async () => {
    // Arrange
    const handleClick = vi.fn()
    const user = userEvent.setup()

    // Act
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByText('Click me')
    await user.click(button)

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('debería respetar la propiedad disabled', () => {
    // Arrange
    const buttonText = 'Inactivo'

    // Act
    render(<Button disabled>{buttonText}</Button>)

    // Assert
    const button = screen.getByText(buttonText)
    expect(button).toBeDisabled()
  })
})
