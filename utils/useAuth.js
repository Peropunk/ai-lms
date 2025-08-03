import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = (requiredRole = null) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userData = localStorage.getItem('user');

        if (!isAuthenticated || !userData) {
          router.push('/login');
          return;
        }

        const parsedUser = JSON.parse(userData);
        
        // Check if user has required role
        if (requiredRole && parsedUser.role !== requiredRole) {
          router.push('/login');
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return { user, loading, logout };
};