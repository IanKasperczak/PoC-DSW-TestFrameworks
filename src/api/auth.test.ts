import { describe, it, expect } from 'vitest'
import * as authApi from '@/api/auth'

describe('Auth API', () => {
  it('login con credenciales incorrectas lanza error', async () => {
    await expect(authApi.login({ email: '', password: '' })).rejects.toThrow('Credenciales inválidas')
  })
})
