import { describe, it, expect } from 'vitest'
import * as tasksApi from '@/api/tasks'

const VALID_TOKEN = 'mock-token'

describe('Tasks API', () => {
  it('debería obtener correctamente la lista de tareas desde la API', async () => {
    // Act
    const tasks = await tasksApi.getTasks(VALID_TOKEN)

    // Assert
    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toBe('Aprender Vitest')
  })

  it('debería manejar correctamente un error al obtener las tareas', async () => {
    // Act & Assert
    await expect(tasksApi.getTasks('invalid')).rejects.toThrow('Error al obtener tareas')
  })

  it('debería crear una nueva tarea correctamente', async () => {
    // Arrange
    const newTaskTitle = 'Nueva tarea'

    // Act
    const createdTask = await tasksApi.createTask(VALID_TOKEN, newTaskTitle)

    // Assert
    expect(createdTask.title).toBe(newTaskTitle)
    expect(createdTask.completed).toBe(false)
    expect(createdTask).toHaveProperty('id')
  })
})
