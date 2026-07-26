import { createContext, useReducer, type ReactNode } from 'react'
import type { AuthState } from '@/types/auth'
import * as authApi from '@/api/auth'

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; user: AuthState['user']; token: string }
  | { type: 'LOGOUT' }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { user: action.user, token: action.token }
    case 'LOGOUT':
      return { user: null, token: null }
    default:
      return state
  }
}

const initialState: AuthState = { user: null, token: null }

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (email: string, password: string) => {
    const { user, token } = await authApi.login({ email, password })
    dispatch({ type: 'LOGIN_SUCCESS', user, token })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login,
        logout,
        isAuthenticated: state.token !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
