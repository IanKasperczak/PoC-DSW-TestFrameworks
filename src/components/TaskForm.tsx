import { useState } from 'react'
import Button from '@/components/ui/Button'
import styles from './TaskForm.module.css'

interface TaskFormProps {
  onAdd: (title: string) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" disabled={!title.trim()}>
        Agregar
      </Button>
    </form>
  )
}

export default TaskForm
