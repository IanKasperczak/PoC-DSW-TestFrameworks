import { useState, useEffect } from 'react'
import type { Task } from '@/types/task'
import * as tasksApi from '@/api/tasks'

interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: string | null
  addTask: (title: string) => Promise<void>
  toggleTask: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export function useTasks(token: string | null): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false

    tasksApi
      .getTasks(token)
      .then((data) => {
        if (!cancelled) setTasks(data)
      })
      .catch(() => {
        if (!cancelled) setError('Error al cargar tareas')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const addTask = async (title: string) => {
    if (!token) return
    try {
      const task = await tasksApi.createTask(token, title)
      setTasks((prev) => [task, ...prev])
    } catch {
      setError('Error al crear tarea')
    }
  }

  const toggleTask = async (id: string) => {
    if (!token) return
    try {
      const task = tasks.find((t) => t.id === id)
      if (!task) return
      const updated = await tasksApi.updateTask(token, id, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch {
      setError('Error al actualizar tarea')
    }
  }

  const deleteTask = async (id: string) => {
    if (!token) return
    try {
      await tasksApi.deleteTask(token, id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Error al eliminar tarea')
    }
  }

  return { tasks, loading, error, addTask, toggleTask, deleteTask }
}
