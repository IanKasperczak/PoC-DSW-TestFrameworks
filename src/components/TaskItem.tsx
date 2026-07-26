import type { Task } from '@/types/task'
import Button from '@/components/ui/Button'
import styles from './TaskItem.module.css'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className={styles.checkbox}
        />
        <span className={styles.title}>{task.title}</span>
      </label>
      <Button variant="danger" onClick={() => onDelete(task.id)}>
        Eliminar
      </Button>
    </li>
  )
}

export default TaskItem
