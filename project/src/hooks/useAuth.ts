import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Demo login logic
      if (email === 'demo@example.com' && password === 'demo123') {
        const user = { email };
        setUser(user);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const savedEmail = localStorage.getItem('userEmail');
      
      if (isLoggedIn && savedEmail) {
        setUser({ email: savedEmail });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return React.createElement(AuthContext.Provider, {
    value: {
      user,
      login,
      logout,
      isLoading
    }
  }, children);
};

export { AuthContext };