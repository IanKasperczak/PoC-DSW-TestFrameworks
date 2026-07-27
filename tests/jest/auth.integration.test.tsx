/**
 * Pruebas de integración del flujo de autenticación: página de login,
 * contexto de autenticación, capa de API y enrutado, todo junto.
 */
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/pages/LoginPage'
import ProtectedRoute from '@/components/ProtectedRoute'
import { renderWithRoutes, Route } from './test-utils'

function routes() {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<h2>Panel privado</h2>} />
      <Route
        path="/privado"
        element={
          <ProtectedRoute>
            <h2>Contenido protegido</h2>
          </ProtectedRoute>
        }
      />
    </>
  )
}

describe('Flujo de inicio de sesión', () => {
  it('muestra el formulario con ambos campos', () => {
    renderWithRoutes(routes(), { route: '/login' })

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  it('valida que los campos no estén vacíos', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })

    await user.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('Todos los campos son obligatorios')).toBeInTheDocument()
  })

  it('navega al panel tras autenticarse correctamente', async () => {
    const user = userEvent.setup()
    renderWithRoutes(routes(), { route: '/login' })

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'secreto')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => expect(screen.getByText('Panel privado')).toBeInTheDocument())
  })
})

describe('ProtectedRoute', () => {
  it('redirige al login cuando no hay sesión', () => {
    renderWithRoutes(routes(), { route: '/privado' })

    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })
})
