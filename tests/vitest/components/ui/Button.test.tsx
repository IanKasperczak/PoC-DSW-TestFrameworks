/**
 * Pruebas unitarias del componente Button.
 * Verifica renderizado, interacción con clics y la propiedad disabled.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'

describe('Button', () => {
  it('renderiza el contenido recibido', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
  })

  it('invoca el manejador de click una sola vez', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={onClick}>Click me</Button>)
    await user.click(screen.getByText('Click me'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('queda deshabilitado cuando se pasa la propiedad disabled', () => {
    render(<Button disabled>Inactivo</Button>)

    const button = screen.getByText('Inactivo')
    expect(button).toBeDisabled()
  })
})
