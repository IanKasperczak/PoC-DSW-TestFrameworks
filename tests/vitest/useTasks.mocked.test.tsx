/**
 * Mismo hook, pero reemplazando el módulo de API completo con vi.mock().
 * La llamada se iza automáticamente por encima de los imports, así que el
 * módulo simulado ya está en su lugar cuando el hook lo resuelve. Por ese
 * mismo izado la simulación alcanza a todo el archivo, y por eso estas
 * pruebas viven separadas de las que usan la red simulada real.
 */
// vi.mock se iza por encima de los imports: el módulo queda reemplazado
// antes de que el hook lo resuelva.
vi.mock('@/api/tasks')
import * as tasksApi from '@/api/tasks'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTasks } from '@/hooks/useTasks'

const TOKEN = 'mock-token'

const mockedApi = vi.mocked(tasksApi)

describe('useTasks (con el módulo de API simulado)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedApi.getTasks.mockResolvedValue([])
  })

  it('llama a getTasks con el token recibido', async () => {
    renderHook(() => useTasks(TOKEN))

    await waitFor(() => expect(mockedApi.getTasks).toHaveBeenCalledWith(TOKEN))
    expect(mockedApi.getTasks).toHaveBeenCalledTimes(1)
  })

  it('expone un mensaje de error si falla la creación', async () => {
    mockedApi.createTask.mockRejectedValue(new Error('fallo'))
    const { result } = renderHook(() => useTasks(TOKEN))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.addTask('Nueva')
    })

    expect(result.current.error).toBe('Error al crear tarea')
  })

  it('expone un mensaje de error si falla la eliminación', async () => {
    mockedApi.deleteTask.mockRejectedValue(new Error('fallo'))
    const { result } = renderHook(() => useTasks(TOKEN))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.deleteTask('1')
    })

    expect(result.current.error).toBe('Error al eliminar tarea')
  })
})
