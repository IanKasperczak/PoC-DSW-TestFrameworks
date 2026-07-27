/**
 * Pruebas unitarias de la capa de API contra la red simulada con MSW.
 * Verifican tanto el camino feliz como el manejo de errores.
 */
import { login, getMe } from '@/api/auth'
import { getTasks, createTask, updateTask, deleteTask } from '@/api/tasks'

const TOKEN = 'mock-token'

describe('api/auth', () => {
  it('devuelve usuario y token con credenciales válidas', async () => {
    const result = await login({ email: 'test@example.com', password: '1234' })

    expect(result.token).toBe(TOKEN)
    expect(result.user).toEqual({ id: '1', email: 'test@example.com', name: 'Test' })
  })

  it('lanza un error cuando faltan credenciales', async () => {
    await expect(login({ email: '', password: '' })).rejects.toThrow('Credenciales inválidas')
  })

  it('recupera el usuario autenticado con un token válido', async () => {
    await expect(getMe(TOKEN)).resolves.toMatchObject({ name: 'Test' })
  })

  it('rechaza un token inválido', async () => {
    await expect(getMe('token-falso')).rejects.toThrow('Sesión inválida')
  })
})

describe('api/tasks', () => {
  it('lista las tareas existentes', async () => {
    const tasks = await getTasks(TOKEN)

    expect(tasks).toHaveLength(2)
    expect(tasks.map((t) => t.title)).toEqual(['Aprender Vitest', 'Configurar MSW'])
  })

  it('rechaza el listado sin autorización', async () => {
    await expect(getTasks('token-falso')).rejects.toThrow('Error al obtener tareas')
  })

  it('crea una tarea y la devuelve sin completar', async () => {
    const task = await createTask(TOKEN, 'Escribir tests con Jest')

    expect(task).toMatchObject({ title: 'Escribir tests con Jest', completed: false })
    expect(task.id).toBeDefined()
  })

  it('agrega la tarea creada al listado', async () => {
    await createTask(TOKEN, 'Tarea nueva')
    const tasks = await getTasks(TOKEN)

    expect(tasks).toHaveLength(3)
    expect(tasks[0].title).toBe('Tarea nueva')
  })

  it('actualiza el estado de una tarea', async () => {
    const updated = await updateTask(TOKEN, '1', { completed: true })

    expect(updated).toMatchObject({ id: '1', completed: true })
  })

  it('lanza un error al actualizar una tarea inexistente', async () => {
    await expect(updateTask(TOKEN, '999', { completed: true })).rejects.toThrow(
      'Error al actualizar tarea',
    )
  })

  it('elimina una tarea', async () => {
    await deleteTask(TOKEN, '1')
    const tasks = await getTasks(TOKEN)

    expect(tasks).toHaveLength(1)
    expect(tasks.find((t) => t.id === '1')).toBeUndefined()
  })

  it('aísla el estado entre pruebas', async () => {
    // El hook afterEach del setup restablece los datos: vuelven a ser dos.
    const tasks = await getTasks(TOKEN)
    expect(tasks).toHaveLength(2)
  })
})
