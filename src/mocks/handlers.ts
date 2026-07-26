import { http, HttpResponse } from 'msw'
import type { Task } from '@/types/task'
import type { User } from '@/types/auth'

const MOCK_USER: User = { id: '1', email: 'test@example.com', name: 'Test' }
const MOCK_TOKEN = 'mock-token'

const DEFAULT_TASKS: Task[] = [
  { id: '1', title: 'Aprender Vitest', completed: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Configurar MSW', completed: true, createdAt: new Date().toISOString() },
]

let tasks = structuredClone(DEFAULT_TASKS)
let nextId = 3

export function resetTasksState(): void {
  tasks = structuredClone(DEFAULT_TASKS)
  nextId = 3
}

function isAuthenticated(request: Request): boolean {
  return request.headers.get('Authorization') === `Bearer ${MOCK_TOKEN}`
}

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }
    if (!body.email || !body.password) {
      return HttpResponse.json({ message: 'Credenciales inválidas' }, { status: 400 })
    }
    return HttpResponse.json({ user: MOCK_USER, token: MOCK_TOKEN })
  }),

  http.get('/api/auth/me', ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json({ message: 'No autorizado' }, { status: 401 })
    }
    return HttpResponse.json(MOCK_USER)
  }),

  http.get('/api/tasks', ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json({ message: 'No autorizado' }, { status: 401 })
    }
    return HttpResponse.json(tasks)
  }),

  http.post('/api/tasks', async ({ request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json({ message: 'No autorizado' }, { status: 401 })
    }
    const body = (await request.json()) as { title: string }
    const task: Task = {
      id: String(nextId++),
      title: body.title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    tasks = [task, ...tasks]
    return HttpResponse.json(task, { status: 201 })
  }),

  http.patch('/api/tasks/:id', async ({ params, request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json({ message: 'No autorizado' }, { status: 401 })
    }
    const body = (await request.json()) as Partial<Pick<Task, 'title' | 'completed'>>
    const index = tasks.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ message: 'Tarea no encontrada' }, { status: 404 })
    }
    tasks[index] = { ...tasks[index], ...body }
    return HttpResponse.json(tasks[index])
  }),

  http.delete('/api/tasks/:id', ({ params, request }) => {
    if (!isAuthenticated(request)) {
      return HttpResponse.json({ message: 'No autorizado' }, { status: 401 })
    }
    const index = tasks.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ message: 'Tarea no encontrada' }, { status: 404 })
    }
    tasks = tasks.filter((t) => t.id !== params.id)
    return new HttpResponse(null, { status: 204 })
  }),
]
