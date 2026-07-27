import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '@/components/ui/Input'

describe('Input Component', () => {
  it('debería actualizar su valor cuando el usuario escribe', async () => {
    // Arrange
    const user = userEvent.setup()
    const expectedValue = 'test@example.com'

    // Act
    render(<Input label="Email" />)
    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, expectedValue)

    // Assert
    expect(emailInput).toHaveValue(expectedValue)
  })

  it('debería mostrar el placeholder cuando se proporciona uno', () => {
    // Arrange
    const placeholderText = 'tu@email.com'

    // Act
    render(<Input label="Email" placeholder={placeholderText} />)

    // Assert
    const input = screen.getByPlaceholderText(placeholderText)
    expect(input).toBeInTheDocument()
  })
})
