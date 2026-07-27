import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '@/components/TaskItem'
import type { Task } from '@/types/task'

const sampleTask: Task = {
  id: '1',
  title: 'Tarea pendiente',
  completed: false,
  createdAt: '2024-01-01',
}

describe('TaskItem Component', () => {
  it('debería marcar la tarea como completada cuando el usuario hace clic en el checkbox', async () => {
    // Arrange
    const handleToggle = vi.fn()
    const user = userEvent.setup()
    render(<TaskItem task={sampleTask} onToggle={handleToggle} onDelete={vi.fn()} />)

    // Act
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    // Assert
    expect(handleToggle).toHaveBeenCalledWith('1')
  })

  it('debería eliminar la tarea cuando el usuario hace clic en Eliminar', async () => {
    // Arrange
    const handleDelete = vi.fn()
    const user = userEvent.setup()
    render(<TaskItem task={sampleTask} onToggle={vi.fn()} onDelete={handleDelete} />)

    // Act
    const deleteButton = screen.getByText('Eliminar')
    await user.click(deleteButton)

    // Assert
    expect(handleDelete).toHaveBeenCalledWith('1')
  })
})
