import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'

function renderLoginPage() {
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
  it('muestra error si los campos están vacíos', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    await user.click(screen.getByText('Ingresar'))
    expect(screen.getByText('Todos los campos son obligatorios')).toBeInTheDocument()
  })

  it('inicia sesión y redirige al dashboard', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.click(screen.getByText('Ingresar'))
    expect(await screen.findByText('Mis tareas')).toBeInTheDocument()
  })
})
