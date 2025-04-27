import { useEffect, useState } from 'react';
import { createPerson } from '../../graphql/createPerson';
import { updatePerson } from '../../graphql/updatePerson';
import { Input } from '../common/Input';
import { CreatePerson } from '../../types/types';

import { getPerson } from '../../graphql/getPerson';
import { jwtDecode } from 'jwt-decode';
interface PersonFormProps {
  mode: 'register' | 'update';
  initialData?: Partial<CreatePerson> & { id?: number };
  onSuccess?: (message: string) => void;
}

export const emptyPerson = {
  id: -1,
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  middleName: '',
  lastName: '',
  isActive: true,
};

export function PersonForm({ mode, initialData, onSuccess }: PersonFormProps) {
  const [auth, setAuth] = useState({ ...emptyPerson, ...initialData });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const handleChange = (field: string, value: string | boolean) => {
    setAuth((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    if (mode === 'register') setLoading(false);
  }, [mode, setLoading]);
  useEffect(() => {
    if (mode === 'update') {
      const token = localStorage.getItem('token');
      if (token) {
        const { id } = jwtDecode<{ id: number }>(token);
        getPerson(id).then((data) => {
          if (data) {
            setAuth((prev) => {
              return {
                ...prev,
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName || '',
                username: data.username,
                isActive: data.isActive || true,
              };
            });
            setLoading(false);
          }
        });
      }
    }
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (auth.password !== auth.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!auth.firstName || !auth.lastName || !auth.username || !auth.password) {
      setError('All fields are required');
      return;
    }
    try {
      if (mode === 'register') {
        const success = await createPerson({
          firstName: auth.firstName,
          lastName: auth.lastName,
          middleName: auth.middleName,
          username: auth.username,
          password: auth.password,
        });

        if (!success) {
          setError('Registration failed. Try a different username.');
        } else {
          setSuccessMessage('Registration successful!');
          window.dispatchEvent(new CustomEvent('notifyLoginSuccess'));
          setTimeout(() => {
            setSuccessMessage(null);
            if (onSuccess !== undefined) onSuccess('registered');
          }, 2000);
        }
      } else {
        const result = await updatePerson({
          id: auth.id!,
          firstName: auth.firstName,
          lastName: auth.lastName,
          middleName: auth.middleName,
          username: auth.username,
          password: auth.password,
          isActive: auth.isActive,
        });

        if (!result.success) {
          setError(result.error || 'Update failed');
        } else {
          setSuccessMessage('Profile updated!');
        }
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    fontWeight: 'bold',
    background: '#1a1a1a',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  };
  if (mode === 'update') {
    console.log('auth', auth);
  }

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '300px',
          }}
        >
          <h2>{mode === 'register' ? 'Register' : 'Update Profile'}</h2>

          <Input
            placeholder="First Name"
            value={auth.firstName}
            onChange={(val) => handleChange('firstName', val)}
          />
          <Input
            placeholder="Middle Name (optional)"
            value={auth.middleName}
            onChange={(val) => handleChange('middleName', val)}
          />
          <Input
            placeholder="Last Name"
            value={auth.lastName}
            onChange={(val) => handleChange('lastName', val)}
          />
          <Input
            placeholder="Username"
            value={auth.username}
            onChange={(val) => handleChange('username', val)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={auth.password}
            onChange={(val) => handleChange('password', val)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={auth.confirmPassword}
            onChange={(val) => handleChange('confirmPassword', val)}
          />
          {mode === 'update' && (
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <input
                type="checkbox"
                checked={auth.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
              />
              Active
            </label>
          )}

          <button type="submit" style={buttonStyle}>
            {mode === 'register' ? 'Register' : 'Update'}
          </button>
          {mode === 'register' && (
            <button
              type="button"
              style={buttonStyle}
              onClick={() =>
                window.dispatchEvent(new CustomEvent('triggerLogin'))
              }
            >
              Login
            </button>
          )}
          {successMessage && (
            <div style={{ color: '#5ef1a5' }}>{successMessage}</div>
          )}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
