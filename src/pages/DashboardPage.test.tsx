import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test-utils'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  it('renderiza correctamente', () => {
    renderWithProviders(<DashboardPage />, {
      initialEntries: ['/dashboard'],
    })
    expect(screen.getByText('Test Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Mis tareas')).toBeInTheDocument()
  })

  it('muestra el usuario autenticado', () => {
    renderWithProviders(<DashboardPage />, {
      initialEntries: ['/dashboard'],
    })
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
