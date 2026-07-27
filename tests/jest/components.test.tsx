/**
 * Pruebas de componentes de interfaz sobre jsdom.
 * Muestran aserciones de DOM, simulación de callbacks con jest.fn() y
 * pruebas de instantánea (snapshots), característica distintiva de Jest.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import TaskList from '@/components/TaskList'
import type { Task } from '@/types/task'

const TASK: Task = {
  id: '1',
  title: 'Aprender Jest',
  completed: false,
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('Button', () => {
  it('renderiza el contenido recibido', () => {
    render(<Button>Guardar</Button>)
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('queda deshabilitado cuando se pasa la propiedad disabled', () => {
    render(<Button disabled>Inactivo</Button>)
    expect(screen.getByRole('button', { name: 'Inactivo' })).toBeDisabled()
  })

  it('invoca el manejador de click una sola vez', async () => {
    const onClick = jest.fn()
    const user = userEvent.setup()

    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no dispara el manejador si está deshabilitado', async () => {
    const onClick = jest.fn()
    const user = userEvent.setup()

    render(
      <Button onClick={onClick} disabled>
        Click
      </Button>,
    )
    await user.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Input', () => {
  it('asocia la etiqueta con el campo mediante un id derivado', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })

  it('muestra el mensaje de error cuando se proporciona', () => {
    render(<Input label="Contraseña" error="Campo obligatorio" />)
    expect(screen.getByText('Campo obligatorio')).toBeInTheDocument()
  })

  it('no muestra mensaje de error si no hay error', () => {
    render(<Input label="Email" />)
    expect(screen.queryByText(/obligatorio/i)).not.toBeInTheDocument()
  })
})

describe('TaskForm', () => {
  it('mantiene el botón deshabilitado mientras el campo está vacío', () => {
    render(<TaskForm onAdd={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Agregar' })).toBeDisabled()
  })

  it('envía el título y limpia el campo', async () => {
    const onAdd = jest.fn()
    const user = userEvent.setup()

    render(<TaskForm onAdd={onAdd} />)
    const field = screen.getByPlaceholderText('Nueva tarea...')

    await user.type(field, 'Comprar café')
    await user.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onAdd).toHaveBeenCalledWith('Comprar café')
    expect(field).toHaveValue('')
  })

  it('recorta los espacios del título antes de enviarlo', async () => {
    const onAdd = jest.fn()
    const user = userEvent.setup()

    render(<TaskForm onAdd={onAdd} />)
    await user.type(screen.getByPlaceholderText('Nueva tarea...'), '   Tarea con espacios   ')
    await user.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onAdd).toHaveBeenCalledWith('Tarea con espacios')
  })
})

describe('TaskItem', () => {
  it('refleja el estado completado en la casilla', () => {
    render(<TaskItem task={{ ...TASK, completed: true }} onToggle={jest.fn()} onDelete={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('notifica el cambio de estado con el identificador de la tarea', async () => {
    const onToggle = jest.fn()
    const user = userEvent.setup()

    render(<TaskItem task={TASK} onToggle={onToggle} onDelete={jest.fn()} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('notifica la eliminación con el identificador de la tarea', async () => {
    const onDelete = jest.fn()
    const user = userEvent.setup()

    render(<TaskItem task={TASK} onToggle={jest.fn()} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(onDelete).toHaveBeenCalledWith('1')
  })
})

describe('TaskList', () => {
  it('muestra un mensaje cuando no hay tareas', () => {
    render(<TaskList tasks={[]} onToggle={jest.fn()} onDelete={jest.fn()} />)
    expect(screen.getByText('No hay tareas todavía.')).toBeInTheDocument()
  })

  it('renderiza un elemento por cada tarea', () => {
    const tasks: Task[] = [TASK, { ...TASK, id: '2', title: 'Segunda tarea' }]

    render(<TaskList tasks={tasks} onToggle={jest.fn()} onDelete={jest.fn()} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('coincide con la instantánea registrada', () => {
    const { container } = render(
      <TaskList tasks={[TASK]} onToggle={jest.fn()} onDelete={jest.fn()} />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
