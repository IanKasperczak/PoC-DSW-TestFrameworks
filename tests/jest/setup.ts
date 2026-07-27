import '@testing-library/jest-dom'
import { server } from '@/mocks/server'
import { resetTasksState } from '@/mocks/handlers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  server.resetHandlers()
  resetTasksState()
})
afterAll(() => server.close())
