'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect} from "react"

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.setItem('logoutMessage', 'You have logged out');
    localStorage.removeItem("authToken")
    window.location.href = "/"
  };

  const token = window && window.localStorage.getItem("authToken")

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [token])

  return (
    <button
      onClick={() => {
        if (isLoggedIn) {
          handleLogout()
          return; 
        }
        router.push("/login")
      }}
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
    >
      {
        isLoggedIn ? "Logout" : "Login"
      }
    </button>
  );
};

export default LogoutButton;