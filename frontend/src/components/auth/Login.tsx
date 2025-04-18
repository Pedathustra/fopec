import { useEffect, useState } from 'react'
import { loginPerson } from '../../graphql/loginPerson'
import { Input } from '../common/Input'

interface LoginProps {
  onLogin: (jwt: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => {
      setSuccessMessage('Registration successful! You can now log in.')
      setTimeout(() => setSuccessMessage(null), 3000)
    }
    window.addEventListener('notifyLoginSuccess', handler)
    return () => window.removeEventListener('notifyLoginSuccess', handler)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await loginPerson(username, password)
      if (!result.success) {
        setError(result.error || 'Login failed')
      } else {
        setError(null)
        onLogin(result.token!)
      }
    } catch {
      setError('Something went wrong during login.')
    }
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    fontWeight: 'bold',
    background: '#1a1a1a',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <h2>Login</h2>

      <Input
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <button type="submit" style={buttonStyle}>
        Login
      </button>

      {successMessage && <div style={{ color: '#5ef1a5' }}>{successMessage}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('triggerRegister'))}
        style={buttonStyle}
      >
       Register
      </button>
    </form>
  )
} 
