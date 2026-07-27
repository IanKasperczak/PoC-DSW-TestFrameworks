/**
 * Prueba de integración del recorrido completo: iniciar sesión, crear una
 * tarea, marcarla como completada y eliminarla. Atraviesa páginas, contexto
 * y capa de API contra la red simulada con MSW.
 */
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'

function renderAppWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

async function iniciarSesion(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.type(screen.getByLabelText('Contraseña'), 'password123')
  await user.click(screen.getByText('Ingresar'))
  await waitFor(() => expect(screen.getByText('Mis tareas')).toBeInTheDocument())
}

describe('Recorrido completo del panel de tareas', () => {
  it('completa el flujo de autenticación, creación, marcado y eliminación', async () => {
    const user = userEvent.setup()
    renderAppWithRouter()

    await iniciarSesion(user)

    const input = screen.getByPlaceholderText('Nueva tarea...')
    await user.type(input, 'Tarea de integración')
    await user.click(screen.getByText('Agregar'))
    await waitFor(() => expect(screen.getByText('Tarea de integración')).toBeInTheDocument())

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await waitFor(() => {
      const updated = screen.getAllByRole('checkbox')
      expect(updated[0]).toBeChecked()
    })

    const deleteButtons = screen.getAllByText('Eliminar')
    await user.click(deleteButtons[0])
    await waitFor(() => {
      expect(screen.queryByText('Tarea de integración')).not.toBeInTheDocument()
    })
  })
})
