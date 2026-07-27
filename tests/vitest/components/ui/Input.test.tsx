/**
 * Pruebas unitarias del componente Input.
 * Verifica la actualización del valor y la visualización del placeholder.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '@/components/ui/Input'

describe('Input', () => {
  it('actualiza el valor del campo cuando el usuario escribe', async () => {
    const user = userEvent.setup()

    render(<Input label="Email" />)
    const input = screen.getByLabelText('Email')
    await user.type(input, 'test@example.com')

    expect(input).toHaveValue('test@example.com')
  })

  it('muestra el placeholder cuando se proporciona', () => {
    render(<Input label="Email" placeholder="tu@email.com" />)

    const input = screen.getByPlaceholderText('tu@email.com')
    expect(input).toBeInTheDocument()
  })
})
