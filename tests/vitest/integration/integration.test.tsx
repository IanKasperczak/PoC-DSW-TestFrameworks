import { describe, it, expect } from 'vitest'
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

describe('Application Integration', () => {
  it('debería completar el flujo completo de autenticación y gestión de tareas', async () => {
    // Arrange
    const user = userEvent.setup()
    renderAppWithRouter()

    // Act — Login
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    const loginButton = screen.getByText('Ingresar')
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(loginButton)

    // Assert — Redirección al dashboard
    const sectionTitle = await screen.findByText('Mis tareas')
    expect(sectionTitle).toBeInTheDocument()

    // Act — Crear tarea
    const taskInput = screen.getByPlaceholderText('Nueva tarea...')
    const addButton = screen.getByText('Agregar')
    await user.type(taskInput, 'Tarea de integración')
    await user.click(addButton)

    // Assert — Tarea creada
    const createdTask = await screen.findByText('Tarea de integración')
    expect(createdTask).toBeInTheDocument()

    // Act — Marcar como completada
    const taskCheckboxes = screen.getAllByRole('checkbox')
    await user.click(taskCheckboxes[0])

    // Assert — Tarea completada
    await waitFor(() => {
      const updatedCheckboxes = screen.getAllByRole('checkbox')
      expect(updatedCheckboxes[0]).toBeChecked()
    })

    // Act — Eliminar tarea
    const deleteButtons = screen.getAllByText('Eliminar')
    await user.click(deleteButtons[0])

    // Assert — Tarea eliminada
    await waitFor(() => {
      expect(screen.queryByText('Tarea de integración')).not.toBeInTheDocument()
    })
  })
})
