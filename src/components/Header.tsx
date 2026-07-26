import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import styles from './Header.module.css'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>PoC - Vitest</h1>
      <div className={styles.userArea}>
        <span className={styles.userName}>{user?.name}</span>
        <Button variant="secondary" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}

export default Header
