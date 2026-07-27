import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from '@/mocks/server'
import { resetTasksState } from '@/mocks/handlers'
import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  server.resetHandlers()
  resetTasksState()
  cleanup()
})
afterAll(() => server.close())
