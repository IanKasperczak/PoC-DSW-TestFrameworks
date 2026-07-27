import { describe, it, expect } from 'vitest'
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

describe('Login Page', () => {
  it('debería mostrar un error cuando los campos están vacíos', async () => {
    // Arrange
    const user = userEvent.setup()
    renderLoginPageWithRouter()

    // Act
    const loginButton = screen.getByText('Ingresar')
    await user.click(loginButton)

    // Assert
    const errorMessage = screen.getByText('Todos los campos son obligatorios')
    expect(errorMessage).toBeInTheDocument()
  })

  it('debería iniciar sesión y redirigir al dashboard', async () => {
    // Arrange
    const user = userEvent.setup()
    const validEmail = 'test@example.com'
    const validPassword = 'password123'

    // Act
    renderLoginPageWithRouter()
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    await user.type(emailInput, validEmail)
    await user.type(passwordInput, validPassword)
    const submitButton = screen.getByText('Ingresar')
    await user.click(submitButton)

    // Assert
    const dashboardTitle = await screen.findByText('Mis tareas')
    expect(dashboardTitle).toBeInTheDocument()
  })
})
