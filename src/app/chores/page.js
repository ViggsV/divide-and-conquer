'use client';
import React, { useEffect, useState } from 'react';
import Chores from '../components/Chores';
import Link from 'next/link';
import axios from 'axios';

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchChores = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3001/api/chores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const chores = res.data.map(item => ({
          ...item,
          pageId: 1,
          type: "chores",
        }));

        setItems(chores);
      } catch (err) {
        console.error("Failed to fetch chores:", err);
      }
    };

    fetchChores();
  }, []);

  return (
    <div>
      <header className="bg-rose-500 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-3xl font-extrabold">
            All Your Chores
          </Link>
        </div>
      </header>

      <Chores items={items} />
      
      
    </div>
  );
}
