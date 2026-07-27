import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
  it('agrega una tarea correctamente', async () => {
    const handleAdd = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAdd={handleAdd} />)
    const input = screen.getByPlaceholderText('Nueva tarea...')
    await user.type(input, 'Comprar leche')
    await user.click(screen.getByText('Agregar'))
    expect(handleAdd).toHaveBeenCalledWith('Comprar leche')
  })

  it('no permite agregar tarea vacía', async () => {
    const handleAdd = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAdd={handleAdd} />)
    const input = screen.getByPlaceholderText('Nueva tarea...')
    await user.type(input, '   ')
    await user.keyboard('{Enter}')
    expect(handleAdd).not.toHaveBeenCalled()
  })
})
