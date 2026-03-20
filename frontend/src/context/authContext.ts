import { createContext } from 'react';

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  neighborhood: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  neighborhood?: string;
  phone?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
