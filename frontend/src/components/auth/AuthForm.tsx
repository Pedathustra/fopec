import { useState } from 'react'

interface AuthFormProps {
  onLogin: (jwt: string) => void
}

export function AuthForm({ onLogin }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [auth, setAuth] = useState({ username: '', password: '', confirmPassword: '', firstName: '', lastName: '' })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setAuth(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'register') {
      if (auth.password !== auth.confirmPassword) {
        setError("Passwords don't match")
        return
      }
      console.log('Registering user:', auth)
      // Later: call register mutation
    } else {
      console.log('Logging in user:', auth)
      // Later: call login mutation and pass jwt to onLogin(jwt)
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
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      {mode === 'register' && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={auth.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={auth.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
          />
        </>
      )}

      <input
        type="text"
        placeholder="Username"
        value={auth.username}
        onChange={e => handleChange('username', e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={auth.password}
        onChange={e => handleChange('password', e.target.value)}
      />

      {mode === 'register' && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={auth.confirmPassword}
          onChange={e => handleChange('confirmPassword', e.target.value)}
        />
      )}

      <button type="submit" style={buttonStyle}>
        {mode === 'login' ? 'Login' : 'Register'}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login')
          setError(null)
        }}
        style={buttonStyle}
      >
        {mode === 'login' ? 'Register' : 'Already Registered?'}
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}
