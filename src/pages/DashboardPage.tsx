import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/Header'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import Card from '@/components/ui/Card'
import { useTasks } from '@/hooks/useTasks'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const { token, isAuthenticated } = useAuth()
  const { tasks, loading, error, addTask, toggleTask, deleteTask } = useTasks(isAuthenticated ? token : null)

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Card>
          <h2 className={styles.sectionTitle}>Mis tareas</h2>
          <TaskForm onAdd={addTask} />
          {loading && <p className={styles.status}>Cargando...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && (
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          )}
        </Card>
      </main>
    </div>
  )
}

export default DashboardPage
