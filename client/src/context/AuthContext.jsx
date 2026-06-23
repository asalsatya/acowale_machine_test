import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_api_key') || null);

  const login = useCallback(async (apiKey) => {
    try {
      // Ping a protected route to verify the key
      await api.get('/analytics/summary', { headers: { 'x-api-key': apiKey } });
      localStorage.setItem('admin_api_key', apiKey);
      setToken(apiKey);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid API Key' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_api_key');
    setToken(null);
  }, []);

  // Validate the key on mount so stale keys are cleared immediately
  useEffect(() => {
    if (token) {
      api.get('/analytics/summary', { headers: { 'x-api-key': token } })
        .catch(() => {
          localStorage.removeItem('admin_api_key');
          setToken(null);
        });
    }
  }, []); // Only run once on mount

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthed: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
