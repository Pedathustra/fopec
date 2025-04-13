import { useState } from 'react';
import { createPerson } from '../../graphql/createPerson';
import { Input } from '../common/Input';


interface AuthFormProps {
  onLogin: (jwt: string) => void
}


const emptyPerson = { username: '', password: '', confirmPassword: '', firstName: '', middleName: '', lastName: '' }

export function AuthForm({ onLogin }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [auth, setAuth] = useState(emptyPerson)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setAuth(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (mode === 'register') {
      if (auth.password !== auth.confirmPassword) {
        setError("Passwords don't match")
        return
      }
  
      if (!auth.firstName || !auth.lastName || !auth.username || !auth.password) {
        setError("All fields are required")
        return
      }
  
      try {
        const success = await createPerson({
          firstName: auth.firstName,
          lastName: auth.lastName,
          middleName: '', // Optional, not included in form yet
          username: auth.username,
          password: auth.password,
        })
  
        if (!success) {
          setError("Registration failed. Try a different username.")
        } else {
          setError(null)
          setMode('login')
          setAuth(emptyPerson)
        }
      } catch (err) {
        setError("Something went wrong. Please try again.")
      }
    } else {
      // TODO: Call login function and pass JWT to onLogin
      console.log('Logging in user:', auth)
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
        <Input
          placeholder="First Name"
          value={auth.firstName}
          onChange={val => handleChange('firstName', val)}
        />
        <Input
          placeholder="Middle Name (optional)"
          value={auth.middleName}
          onChange={val => handleChange('middleName', val)}
        />
        <Input
          placeholder="Last Name"
          value={auth.lastName}
          onChange={val => handleChange('lastName', val)}
        />
      </>
    )}

    <Input
      placeholder="Username"
      value={auth.username}
      onChange={val => handleChange('username', val)}
    />

    <Input
      placeholder="Password"
      type="password"
      value={auth.password}
      onChange={val => handleChange('password', val)}
    />

    {mode === 'register' && (
      <Input
        placeholder="Confirm Password"
        type="password"
        value={auth.confirmPassword}
        onChange={val => handleChange('confirmPassword', val)}
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
