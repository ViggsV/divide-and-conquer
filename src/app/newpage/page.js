"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateChorePage() {
  const router = useRouter();
  const [pageName, setPageName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle creating the page/chore
    console.log('Creating page:', pageName);
    router.push('/chores');
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
  {/* Header */}
  <header className="bg-rose-500 text-white p-6 shadow-md">
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-3xl font-extrabold tracking-tight">
        All Your Chores
      </Link>
    </div>
  </header>

  {/* Form Card */}
  <div className="max-w-md mx-auto mt-12 p-6 bg-white text-gray-800 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-4">Create New Chore Page</h1>

    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={pageName}
        onChange={(e) => setPageName(e.target.value)}
        placeholder="Page name"
        className="p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/chores")}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</div>
  );
}
