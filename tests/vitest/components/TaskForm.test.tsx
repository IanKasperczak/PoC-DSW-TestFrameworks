/**
 * Pruebas unitarias del componente TaskForm.
 * Verifica el envío de títulos válidos y la prevención de títulos vacíos.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '@/components/TaskForm'

describe('TaskForm', () => {
  it('notifica al manejador con el título ingresado', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()

    render(<TaskForm onAdd={onAdd} />)
    const input = screen.getByPlaceholderText('Nueva tarea...')
    await user.type(input, 'Comprar leche')
    await user.click(screen.getByText('Agregar'))

    expect(onAdd).toHaveBeenCalledWith('Comprar leche')
  })

  it('no envía el título cuando el campo contiene solo espacios', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()

    render(<TaskForm onAdd={onAdd} />)
    const input = screen.getByPlaceholderText('Nueva tarea...')
    await user.type(input, '   ')
    await user.keyboard('{Enter}')

    expect(onAdd).not.toHaveBeenCalled()
  })
})
