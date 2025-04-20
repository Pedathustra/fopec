import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id: number;
};

export function usePersonId(): number | null {
  return useMemo(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.id;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }, []);
}
