import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from '@/components/TaskList'
import type { Task } from '@/types/task'

const existingTasks: Task[] = [
  { id: '1', title: 'Tarea 1', completed: false, createdAt: '2024-01-01' },
  { id: '2', title: 'Tarea 2', completed: true, createdAt: '2024-01-01' },
]

describe('TaskList Component', () => {
  it('debería renderizar una lista vacía cuando no existen tareas', () => {
    // Act
    render(<TaskList tasks={[]} onToggle={vi.fn()} onDelete={vi.fn()} />)

    // Assert
    const emptyMessage = screen.getByText('No hay tareas todavía.')
    expect(emptyMessage).toBeInTheDocument()
  })

  it('debería renderizar todas las tareas existentes', () => {
    // Act
    render(<TaskList tasks={existingTasks} onToggle={vi.fn()} onDelete={vi.fn()} />)

    // Assert
    expect(screen.getByText('Tarea 1')).toBeInTheDocument()
    expect(screen.getByText('Tarea 2')).toBeInTheDocument()
  })
})
