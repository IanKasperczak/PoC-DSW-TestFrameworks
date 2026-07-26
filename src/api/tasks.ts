import type { Task } from '@/types/task'

export async function getTasks(token: string): Promise<Task[]> {
  const response = await fetch('/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Error al obtener tareas')
  }

  return response.json()
}

export async function createTask(token: string, title: string): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  })

  if (!response.ok) {
    throw new Error('Error al crear tarea')
  }

  return response.json()
}

export async function updateTask(
  token: string,
  taskId: string,
  data: Partial<Pick<Task, 'title' | 'completed'>>,
): Promise<Task> {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error al actualizar tarea')
  }

  return response.json()
}

export async function deleteTask(token: string, taskId: string): Promise<void> {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Error al eliminar tarea')
  }
}
