import { describe, it, expect } from 'vitest'
import * as authApi from '@/api/auth'

describe('Authentication API', () => {
  it('debería lanzar un error cuando las credenciales son incorrectas', async () => {
    // Arrange
    const invalidCredentials = { email: '', password: '' }

    // Act & Assert
    await expect(authApi.login(invalidCredentials)).rejects.toThrow('Credenciales inválidas')
  })
})
