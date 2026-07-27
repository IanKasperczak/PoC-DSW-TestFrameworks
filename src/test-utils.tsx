import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, type AuthContextValue } from '@/context/AuthContext'
import type { ReactElement } from 'react'
import type { User } from '@/types/auth'

const MOCK_USER: User = { id: '1', email: 'test@example.com', name: 'Test' }

function createAuthContextValue(overrides?: Partial<AuthContextValue>): AuthContextValue {
  return {
    user: MOCK_USER,
    token: 'mock-token',
    login: async () => {},
    logout: () => {},
    isAuthenticated: true,
    ...overrides,
  }
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  authValue?: Partial<AuthContextValue>
  initialEntries?: string[]
}

function renderWithProviders(
  ui: ReactElement,
  options: RenderWithProvidersOptions = {},
) {
  const { authValue, initialEntries = ['/'], ...renderOptions } = options
  const authContextValue = createAuthContextValue(authValue)

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <AuthContext.Provider value={authContextValue}>
          {children}
        </AuthContext.Provider>
      </MemoryRouter>
    )
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export { renderWithProviders, MOCK_USER }
