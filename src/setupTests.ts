import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '@/mocks/server'
import { resetTasksState } from '@/mocks/handlers'
import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  server.resetHandlers()
  resetTasksState()
})
afterAll(() => server.close())
