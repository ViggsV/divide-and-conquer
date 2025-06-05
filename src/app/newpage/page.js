"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPage() {
  const [pageName, setPageName] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!pageName.trim()) return alert("Please enter a page name");

    // We can store the new page in a global store, API, or another way.
    // For now, we will just alert the user and redirect them back to the chores main page

    alert(`New page "${pageName}" created!`);
    // Redirecting back to chores main page after creating
    router.push("/chores");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-md shadow-md">
      <h1 className="text-2xl mb-4">Create New Chore Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          placeholder="Page name"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/chores")}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
