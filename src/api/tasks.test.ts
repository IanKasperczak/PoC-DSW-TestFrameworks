import { describe, it, expect } from 'vitest'
import * as tasksApi from '@/api/tasks'

const VALID_TOKEN = 'mock-token'

describe('Tasks API', () => {
  it('obtiene tareas correctamente', async () => {
    const tasks = await tasksApi.getTasks(VALID_TOKEN)
    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toBe('Aprender Vitest')
  })

  it('lanza error al obtener tareas con token inválido', async () => {
    await expect(tasksApi.getTasks('invalid')).rejects.toThrow('Error al obtener tareas')
  })

  it('crea una tarea correctamente', async () => {
    const task = await tasksApi.createTask(VALID_TOKEN, 'Nueva tarea')
    expect(task.title).toBe('Nueva tarea')
    expect(task.completed).toBe(false)
    expect(task).toHaveProperty('id')
  })
})
