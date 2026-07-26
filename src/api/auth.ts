import type { User, LoginCredentials } from '@/types/auth'

export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Credenciales inválidas')
  }

  return response.json()
}

export async function getMe(token: string): Promise<User> {
  const response = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Sesión inválida')
  }

  return response.json()
}
