import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('actualiza correctamente su valor', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" />)
    const input = screen.getByLabelText('Email')
    await user.type(input, 'test@example.com')
    expect(input).toHaveValue('test@example.com')
  })

  it('renderiza el placeholder', () => {
    render(<Input label="Email" placeholder="tu@email.com" />)
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
  })
})
