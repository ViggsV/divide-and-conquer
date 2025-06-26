import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChorePageSelector({ selectedPage, setSelectedPage }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function fetchPages() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get("https://divide-and-conquer-backend-2.onrender.com/api/pages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!Array.isArray(res.data)) {
          console.error("Expected pages array but got:", res.data);
          setPages([]);
          return;
        }

        setPages(res.data);

      
        if (!selectedPage && res.data.length > 0) {
          setSelectedPage(res.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch pages:", err);
        setPages([]);
      }
    }

    fetchPages();
  }, [selectedPage, setSelectedPage]);

  return (
    <select
      value={selectedPage ?? ""}
      onChange={(e) => setSelectedPage(e.target.value)}
      className="bg-emerald-400 border-2 border-emerald-400 rounded p-4 w-full"
    >
      {pages.length > 0 ? (
        pages.map((page) => (
          <option key={page._id} value={page._id}>
            {page.name}
          </option>
        ))
      ) : (
        <option disabled>No pages found</option>
      )}
    </select>
  );
}
