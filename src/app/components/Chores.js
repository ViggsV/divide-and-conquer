"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ChorePageSelector from "../components/ChorePageSelector";
import ViewToggle from "../components/ViewToggle";
import StatusFilter from "../components/StatusFilter";
import ItemCard from "../components/ItemCard";
import AddItemButton from "../components/AddItemButton";

export default function MainPage({ items }) {
  const [chorePages, setChorePages] = useState([
    { id: 1, name: "Home" },
    { id: 2, name: "Work" },
  ]);
  const [selectedPage, setSelectedPage] = useState(chorePages[0]?.id || null);
  const [viewMode, setViewMode] = useState("chores");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const router = useRouter();

  function handleAddItem() {
    router.push("/additem");
  }

  function handleNewPage() {
    router.push("/newpage");
  }
const handleDelete = async (id) => {
    const apiClient = new ApiClient();
    try {
      await apiClient.removeChore(id);
      setChores((prevChores) => prevChores.filter((chore) => chore._id !== id));
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete ad.";
      alert(message);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.pageId === selectedPage &&
      item.type === viewMode &&
      (filter === "all" ||
        (filter === "completed" && item.completed) ||
        (filter === "notCompleted" && !item.completed))
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Top Panel */}
      <div className="border-2 border-rose-800 rounded-md p-4 mb-3 bg-emerald-900 shadow-sm">
        {/* Dropdown + New Page Button */}
        <div className="flex items-center mb-4">
          <ChorePageSelector
            chorePages={chorePages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <button
            onClick={handleNewPage}
            className="ml-3 px-4 py-1 bg-rose-700 text-white rounded-md hover:bg-emerald-500 transition"
          >
            New Page
          </button>
        </div>

        {/* View Toggle + Status Filter */}
        <div className="flex justify-between items-center gap-4">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          <StatusFilter filter={filter} setFilter={setFilter} />
        </div>
        
      </div>

      {/* Add Item Button */}
      <div className="relative mb-6">
        <div className="absolute left-1/2 -translate-x-1/2">
          <AddItemButton onClick={handleAddItem} />
        </div>
        {/* Sort By Dropdown */}
        <div className="flex justify-end">
          <div className="border border-gray-500 rounded bg-emerald-900 px-4 py-2 text-white shadow-sm">
            <label className="mr-2 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-emerald-800 border border-gray-600 text-white px-2 py-1 rounded"
            >
              <option value="recent">Most Recent</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items */}
      {sortedItems.length === 0 ? (
        <p className="text-center text-emerald-400">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {sortedItems.map((item) => (
            <ItemCard
              key={item._id}
              {...item}
              onToggleCompleted={() => toggleCompleted(item._id)}
            />
          ))}
          <div>
          <button
                  onClick={() => handleDelete(item._id)}
                  className="text-sm"
                >
                  &#128465; Delete
                </button>
              </div>
        </div>
        
      )}
    </div>
  );
}
