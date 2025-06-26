'use client';

import React, { useEffect, useState } from 'react';
import MainPage from '../components/Chores';
import Link from 'next/link';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const pageFromUrl = searchParams.get('page');

  const [items, setItems] = useState([]);
  const [selectedPage, setSelectedPage] = useState(pageFromUrl || '');

  useEffect(() => {
    if (!selectedPage) return;

    const fetchChores = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get(`https://divide-and-conquer-backend-2.onrender.com/api/chores?pageId=${selectedPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { pageId: selectedPage },
        });

        setItems(res.data);
      } catch (err) {
        console.error("Failed to fetch chores:", err);
      }
    };

    fetchChores();
  }, [selectedPage]);


  return (
    <div>
      <header className="bg-rose-500 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-3xl font-extrabold">All Your Chores</Link>
        </div>
      </header>
      <MainPage items={items} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </div>
  );
}
