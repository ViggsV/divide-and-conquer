import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function ChorePageSelector({ selectedPage, setSelectedPage }) {
  const [pages, setPages] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchPages() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3001/api/pages", {
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

  const baseClass = "border-2 rounded p-4 w-full";
  const greenStyle = "bg-emerald-400 border-emerald-400 text-white";
  const whiteStyle = "bg-white border-gray-300 text-gray-800";

  const className =
    pathname === "/additem" ? `${baseClass} ${whiteStyle}` : `${baseClass} ${greenStyle}`;

  return (
    <select
      value={selectedPage ?? ""}
      onChange={(e) => setSelectedPage(e.target.value)}
      className={className}
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
