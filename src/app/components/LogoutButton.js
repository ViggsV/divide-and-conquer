'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedToken = window.localStorage.getItem('authToken');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    localStorage.setItem('logoutMessage', 'You have logged out');
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  return (
    <button
      onClick={() => {
        if (isLoggedIn) {
          handleLogout();
        } else {
          router.push('/login');
        }
      }}
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
    >
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
};

export default LogoutButton;