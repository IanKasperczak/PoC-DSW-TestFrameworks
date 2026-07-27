import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'
import type { Task } from '@/types/task'

const tasks: Task[] = [
  { id: '1', title: 'Tarea 1', completed: false, createdAt: '2024-01-01' },
  { id: '2', title: 'Tarea 2', completed: true, createdAt: '2024-01-01' },
]

describe('TaskList', () => {
  it('renderiza lista vacía', () => {
    render(<TaskList tasks={[]} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('No hay tareas todavía.')).toBeInTheDocument()
  })

  it('renderiza tareas existentes', () => {
    render(<TaskList tasks={tasks} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Tarea 1')).toBeInTheDocument()
    expect(screen.getByText('Tarea 2')).toBeInTheDocument()
  })
})
