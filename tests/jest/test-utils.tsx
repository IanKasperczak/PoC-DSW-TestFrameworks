import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'

/** Envuelve el árbol con el contexto de autenticación y un router en memoria. */
export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>,
  )
}

/** Igual que el anterior, pero declarando rutas para poder verificar navegación. */
export function renderWithRoutes(routes: ReactNode, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <Routes>{routes}</Routes>
      </AuthProvider>
    </MemoryRouter>,
  )
}

export { Route }
