import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'

function renderApp() {
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

describe('Flujo completo de integración', () => {
  it('login, crear tarea, completar tarea y eliminar tarea', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.click(screen.getByText('Ingresar'))

    expect(await screen.findByText('Mis tareas')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Nueva tarea...')
    await user.type(input, 'Tarea de integración')
    await user.click(screen.getByText('Agregar'))
    expect(await screen.findByText('Tarea de integración')).toBeInTheDocument()

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await waitFor(() => {
      const updatedCheckboxes = screen.getAllByRole('checkbox')
      expect(updatedCheckboxes[0]).toBeChecked()
    })

    const deleteButtons = screen.getAllByText('Eliminar')
    await user.click(deleteButtons[0])
    await waitFor(() => {
      expect(screen.queryByText('Tarea de integración')).not.toBeInTheDocument()
    })
  })
})
