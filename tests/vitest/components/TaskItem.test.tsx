/**
 * Pruebas unitarias del componente TaskItem.
 * Verifica que los botones de marcado y eliminación emitan los eventos
 * esperados con el identificador de la tarea.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '@/components/TaskItem'
import type { Task } from '@/types/task'

const TASK: Task = {
  id: '1',
  title: 'Tarea pendiente',
  completed: false,
  createdAt: '2024-01-01',
}

describe('TaskItem', () => {
  it('notifica el cambio de estado con el identificador de la tarea', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()

    render(<TaskItem task={TASK} onToggle={onToggle} onDelete={vi.fn()} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('notifica la eliminación con el identificador de la tarea', async () => {
    const onDelete = vi.fn()
    const user = userEvent.setup()

    render(<TaskItem task={TASK} onToggle={vi.fn()} onDelete={onDelete} />)
    await user.click(screen.getByText('Eliminar'))

    expect(onDelete).toHaveBeenCalledWith('1')
  })
})
