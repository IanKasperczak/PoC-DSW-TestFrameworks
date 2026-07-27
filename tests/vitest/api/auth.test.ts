/**
 * Pruebas de la capa de autenticación contra la red simulada con MSW.
 * Verifica el manejo de errores con credenciales inválidas.
 */
import * as authApi from '@/api/auth'

describe('api/auth', () => {
  it('lanza un error cuando faltan credenciales', async () => {
    await expect(authApi.login({ email: '', password: '' })).rejects.toThrow('Credenciales inválidas')
  })
})
