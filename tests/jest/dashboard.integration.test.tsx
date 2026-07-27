/**
 * Prueba de integración del recorrido completo: iniciar sesión, ver las
 * tareas, agregar una, marcarla y eliminarla. Atraviesa páginas, hooks,
 * contexto y capa de API contra la red simulada.
 */
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ProtectedRoute from '@/components/ProtectedRoute'
import { renderWithRoutes, Route } from './test-utils'

function routes() {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </>
  )
}

async function iniciarSesion(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.type(screen.getByLabelText('Contraseña'), 'secreto')
  await user.click(screen.getByRole('button', { name: 'Ingresar' }))
  await waitFor(() => expect(screen.getByText('Mis tareas')).toBeInTheDocument())
}

describe('Recorrido completo del panel de tareas', () => {
  it('lista las tareas del usuario después de iniciar sesión', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })

    await iniciarSesion(user)

    await waitFor(() => expect(screen.getByText('Aprender Vitest')).toBeInTheDocument())
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('muestra el nombre del usuario en la cabecera', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })

    await iniciarSesion(user)

    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('agrega una tarea y la muestra en el listado', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })
    await iniciarSesion(user)
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2))

    await user.type(screen.getByPlaceholderText('Nueva tarea...'), 'Preparar la defensa')
    await user.click(screen.getByRole('button', { name: 'Agregar' }))

    await waitFor(() => expect(screen.getByText('Preparar la defensa')).toBeInTheDocument())
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('marca una tarea como completada', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })
    await iniciarSesion(user)
    await waitFor(() => expect(screen.getByText('Aprender Vitest')).toBeInTheDocument())

    const item = screen.getByText('Aprender Vitest').closest('li') as HTMLElement
    await user.click(within(item).getByRole('checkbox'))

    await waitFor(() => expect(within(item).getByRole('checkbox')).toBeChecked())
  })

  it('elimina una tarea del listado', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })
    await iniciarSesion(user)
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2))

    const item = screen.getByText('Configurar MSW').closest('li') as HTMLElement
    await user.click(within(item).getByRole('button', { name: 'Eliminar' }))

    await waitFor(() => expect(screen.queryByText('Configurar MSW')).not.toBeInTheDocument())
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  it('cierra la sesión y vuelve al login', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })
    await iniciarSesion(user)

    await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument())
  })
})
