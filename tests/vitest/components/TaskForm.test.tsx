import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '@/components/TaskForm'

describe('TaskForm Component', () => {
  it('debería agregar una nueva tarea al enviar un título válido', async () => {
    // Arrange
    const handleAdd = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAdd={handleAdd} />)
    const taskInput = screen.getByPlaceholderText('Nueva tarea...')

    // Act
    await user.type(taskInput, 'Comprar leche')
    const addButton = screen.getByText('Agregar')
    await user.click(addButton)

    // Assert
    expect(handleAdd).toHaveBeenCalledWith('Comprar leche')
  })

  it('debería impedir agregar una tarea con el título vacío', async () => {
    // Arrange
    const handleAdd = vi.fn()
    const user = userEvent.setup()
    render(<TaskForm onAdd={handleAdd} />)
    const taskInput = screen.getByPlaceholderText('Nueva tarea...')

    // Act
    await user.type(taskInput, '   ')
    await user.keyboard('{Enter}')

    // Assert
    expect(handleAdd).not.toHaveBeenCalled()
  })
})
