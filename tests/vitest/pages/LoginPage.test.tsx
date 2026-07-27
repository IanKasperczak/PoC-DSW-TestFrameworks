/**
 * Pruebas de la página de inicio de sesión.
 * Verifica la validación de campos vacíos y la redirección tras
 * autenticarse correctamente.
 */
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'

function renderLoginPageWithRouter() {
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

describe('LoginPage', () => {
  it('valida que los campos no estén vacíos', async () => {
    const user = userEvent.setup()
    renderLoginPageWithRouter()

    await user.click(screen.getByText('Ingresar'))

    const error = screen.getByText('Todos los campos son obligatorios')
    expect(error).toBeInTheDocument()
  })

  it('navega al panel tras autenticarse correctamente', async () => {
    const user = userEvent.setup()
    renderLoginPageWithRouter()

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.click(screen.getByText('Ingresar'))

    const title = await screen.findByText('Mis tareas')
    expect(title).toBeInTheDocument()
  })
})
