import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '@/context/authContext';
import type { AuthUser, SignupData } from '@/context/authContext';
import { apiFetch } from '@/lib/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: replace with real auth endpoint when auth system is chosen
    // For now, find user by email from the users list
    const users = await apiFetch<AuthUser[]>('/users/');
    const found = users.find((u) => u.email === email);
    if (!found) throw new Error('Invalid credentials');
    // Skip password check for now — no real auth yet
    void password;
    setUser(found);
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    const created = await apiFetch<AuthUser>('/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setUser(created);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
