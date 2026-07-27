/**
 * Pruebas unitarias de la capa de tareas contra la red simulada con MSW.
 * Verifica el listado, el manejo de errores de autorización y la creación
 * de nuevas tareas.
 */
import * as tasksApi from '@/api/tasks'

const TOKEN = 'mock-token'

describe('api/tasks', () => {
  it('lista las tareas existentes', async () => {
    const tasks = await tasksApi.getTasks(TOKEN)

    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toBe('Aprender Vitest')
  })

  it('rechaza el listado sin autorización', async () => {
    await expect(tasksApi.getTasks('token-falso')).rejects.toThrow('Error al obtener tareas')
  })

  it('crea una tarea y la devuelve sin completar', async () => {
    const task = await tasksApi.createTask(TOKEN, 'Nueva tarea')

    expect(task.title).toBe('Nueva tarea')
    expect(task.completed).toBe(false)
    expect(task).toHaveProperty('id')
  })
})
