import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renderiza el texto pasado como children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('aplica la variante danger correctamente', () => {
    render(<Button variant="danger">Eliminar</Button>)
    const button = screen.getByText('Eliminar')
    expect(button).toBeInTheDocument()
  })

  it('deshabilita el botón cuando se pasa disabled', () => {
    render(<Button disabled>Inactivo</Button>)
    expect(screen.getByText('Inactivo')).toBeDisabled()
  })
})
