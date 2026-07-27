/**
 * Pruebas del hook useTasks contra la red simulada real (MSW).
 * Verifica el estado de carga, la exposición de tareas y las operaciones
 * de agregar, marcar, eliminar, y el manejo de errores.
 */
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTasks } from '@/hooks/useTasks'

const TOKEN = 'mock-token'

describe('useTasks (contra la red simulada)', () => {
  it('arranca en estado de carga y luego expone las tareas', async () => {
    const { result } = renderHook(() => useTasks(TOKEN))

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.tasks).toHaveLength(2)
    expect(result.current.error).toBeNull()
  })

  it('agrega una tarea al principio del listado', async () => {
    const { result } = renderHook(() => useTasks(TOKEN))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.addTask('Tarea agregada')
    })

    expect(result.current.tasks).toHaveLength(3)
    expect(result.current.tasks[0].title).toBe('Tarea agregada')
  })

  it('invierte el estado de completado de una tarea', async () => {
    const { result } = renderHook(() => useTasks(TOKEN))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.toggleTask('1')
    })

    expect(result.current.tasks.find((t) => t.id === '1')?.completed).toBe(true)
  })

  it('quita la tarea eliminada del listado', async () => {
    const { result } = renderHook(() => useTasks(TOKEN))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.deleteTask('1')
    })

    expect(result.current.tasks.map((t) => t.id)).toEqual(['2'])
  })

  it('no consulta la API cuando no hay token', () => {
    const { result } = renderHook(() => useTasks(null))

    expect(result.current.tasks).toEqual([])
    expect(result.current.loading).toBe(true)
  })

  it('registra un error cuando el token es inválido', async () => {
    const { result } = renderHook(() => useTasks('token-falso'))

    await waitFor(() => expect(result.current.error).toBe('Error al cargar tareas'))
    expect(result.current.tasks).toEqual([])
  })
})
