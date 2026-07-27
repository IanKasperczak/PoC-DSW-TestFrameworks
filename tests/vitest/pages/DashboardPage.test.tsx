/**
 * Pruebas de la página del panel de tareas.
 * Verifica que los elementos principales se rendericen y que el nombre
 * del usuario autenticado se muestre en la cabecera.
 */
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import DashboardPage from '@/pages/DashboardPage'

describe('DashboardPage', () => {
  it('renderiza la cabecera y la sección de tareas', () => {
    renderWithProviders(<DashboardPage />, {
      initialEntries: ['/dashboard'],
    })

    expect(screen.getByText('Test Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Mis tareas')).toBeInTheDocument()
  })

  it('muestra el nombre del usuario en la cabecera', () => {
    renderWithProviders(<DashboardPage />, {
      initialEntries: ['/dashboard'],
    })

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
