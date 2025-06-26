"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function CreateChorePage() {
  const router = useRouter();

  const [pageName, setPageName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [error, setError] = useState('');

  const handleAddEmail = () => {
    const email = emailInput.trim();
    if (!email || invitedEmails.includes(email)) return;

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    setInvitedEmails([...invitedEmails, email]);
    setEmailInput('');
    setError('');
  };

  const handleRemoveEmail = (emailToRemove) => {
    setInvitedEmails(invitedEmails.filter(email => email !== emailToRemove));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!pageName.trim()) {
    setError("Page name is required");
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.post("https://divide-and-conquer-backend-2.onrender.com/api/pages", {
      name: pageName,
      invitedEmails: invitedEmails,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const newPage = res.data.page;
    router.push(`/chores?page=${newPage._id}`);
  } catch (err) {
    console.error("Error creating page:", err);
    setError("Failed to create page");
  }
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

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder="Page name"
            className="p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {/* Email Input */}
          <div className="flex gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter user email"
              className="flex-grow p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="px-4 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
              Add
            </button>
          </div>

          {/* Email List */}
          {invitedEmails.length > 0 && (
            <ul className="text-sm space-y-1">
              {invitedEmails.map((email) => (
                <li key={email} className="flex justify-between items-center">
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-between gap-4 pt-4">
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
              Create Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
