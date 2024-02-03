// src/frameworks/hooks/useAuth.ts
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useAuth() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken")

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token;
}

// Use this hook in your components that require authentication
