/**
 * Pruebas unitarias del componente TaskList.
 * Verifica el mensaje de lista vacía y el renderizado de tareas existentes.
 */
import { render, screen } from '@testing-library/react'
import TaskList from '@/components/TaskList'
import type { Task } from '@/types/task'

const TASKS: Task[] = [
  { id: '1', title: 'Tarea 1', completed: false, createdAt: '2024-01-01' },
  { id: '2', title: 'Tarea 2', completed: true, createdAt: '2024-01-01' },
]

describe('TaskList', () => {
  it('muestra un mensaje cuando no hay tareas', () => {
    render(<TaskList tasks={[]} onToggle={vi.fn()} onDelete={vi.fn()} />)

    const message = screen.getByText('No hay tareas todavía.')
    expect(message).toBeInTheDocument()
  })

  it('renderiza un elemento por cada tarea', () => {
    render(<TaskList tasks={TASKS} onToggle={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('Tarea 1')).toBeInTheDocument()
    expect(screen.getByText('Tarea 2')).toBeInTheDocument()
  })
})
