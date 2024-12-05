import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateResetToken } from '../utils/auth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock authentication - replace with actual API call
      if (email === 'admin@example.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'ADMIN',
          createdAt: new Date(),
          lastLogin: new Date()
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual implementation
      const resetToken = generateResetToken();
      console.log('Password reset requested for:', email);
      console.log('Reset token:', resetToken);
      
      // In a real implementation, send email with reset link
      // await sendResetEmail(email, resetToken);
      
      // For demo purposes, we'll store the token in localStorage
      localStorage.setItem('resetToken', resetToken);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual implementation
      const storedToken = localStorage.getItem('resetToken');
      
      if (token !== storedToken) {
        throw new Error('Invalid or expired reset token');
      }
      
      // In a real implementation, validate token and update password in backend
      console.log('Password reset successful');
      localStorage.removeItem('resetToken');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        requestPasswordReset,
        resetPassword,
        isLoading, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}