import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import DashboardPage from '@/pages/DashboardPage'

describe('Dashboard Page', () => {
  it('debería mostrar el título de la aplicación y la sección de tareas', () => {
    // Act
    renderWithProviders(<DashboardPage />, {
      initialEntries: ['/dashboard'],
    })

    // Assert
    const appTitle = screen.getByText('Test Frameworks')
    const sectionTitle = screen.getByText('Mis tareas')
    expect(appTitle).toBeInTheDocument()
    expect(sectionTitle).toBeInTheDocument()
  })

  it('debería mostrar el usuario autenticado en el dashboard', () => {
    // Act
    renderWithProviders(<DashboardPage />, {
      initialEntries: ['/dashboard'],
    })

    // Assert
    const userName = screen.getByText('Test')
    expect(userName).toBeInTheDocument()
  })
})
