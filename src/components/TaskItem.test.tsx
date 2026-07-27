import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from './TaskItem'
import type { Task } from '@/types/task'

const task: Task = {
  id: '1',
  title: 'Tarea pendiente',
  completed: false,
  createdAt: '2024-01-01',
}

describe('TaskItem', () => {
  it('marca la tarea como completada al hacer click', async () => {
    const handleToggle = vi.fn()
    const user = userEvent.setup()
    render(<TaskItem task={task} onToggle={handleToggle} onDelete={vi.fn()} />)
    await user.click(screen.getByRole('checkbox'))
    expect(handleToggle).toHaveBeenCalledWith('1')
  })

  it('elimina la tarea al hacer click en Eliminar', async () => {
    const handleDelete = vi.fn()
    const user = userEvent.setup()
    render(<TaskItem task={task} onToggle={vi.fn()} onDelete={handleDelete} />)
    await user.click(screen.getByText('Eliminar'))
    expect(handleDelete).toHaveBeenCalledWith('1')
  })
})
