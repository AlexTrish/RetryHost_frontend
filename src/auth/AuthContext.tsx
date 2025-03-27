import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface User {
  email: string;
  isNewUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lastLoginTime, setLastLoginTime] = useState<number | null>(null);

  const triggerConfetti = () => {
    // Left side confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0, y: 0.5 }
    });

    // Right side confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 1, y: 0.5 }
    });
  };

  useEffect(() => {
    if (user) {
      if (user.isNewUser) {
        toast.success('Welcome to RetryHost! 🎉', {
          duration: 5000,
          position: 'top-center',
        });
        triggerConfetti();
      } else if (lastLoginTime) {
        const hoursSinceLastLogin = (Date.now() - lastLoginTime) / (1000 * 60 * 60);
        if (hoursSinceLastLogin >= 1) {
          toast.success(`Welcome back, ${user.email}! 👋`, {
            duration: 3000,
            position: 'top-center',
          });
        }
      }
    }
  }, [user, lastLoginTime]);

  const login = async (email: string, password: string) => {
    // Simple authentication for demo purposes
    if (email === 'test@test.test' && password === 'test') {
      const isNewUser = !lastLoginTime;
      setUser({ email, isNewUser });
      setLastLoginTime(Date.now());
      return;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};