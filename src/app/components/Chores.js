"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ChorePageSelector from "../components/ChorePageSelector";
import ViewToggle from "../components/ViewToggle";
import StatusFilter from "../components/StatusFilter";
import ItemCard from "../components/ItemCard";
import AddItemButton from "../components/AddItemButton";

export default function MainPage({items}) {
    console.log(items)
  const [chorePages, setChorePages] = useState([
    { id: 1, name: "Home" },
    { id: 2, name: "Work" },
  ]);
  const [selectedPage, setSelectedPage] = useState(chorePages[0]?.id || null);

  const [viewMode, setViewMode] = useState("chores"); // chores or bills
  const [filter, setFilter] = useState("all"); // all, completed, notCompleted

  const router = useRouter();

  // Redirect to /additem for adding items
  function handleAddItem() {
    router.push("/additem");
  }

  // Navigate to /newpage to create a new page
  function handleNewPage() {
    router.push("/newpage");
  }

  // Filtering items
  const filteredItems = items.filter(
    (item) =>
      item.pageId === selectedPage &&
      item.type === viewMode
  );

  console.log(filteredItems)

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Top Panel */}
      <div className="border-2 border-rose-800 rounded-md p-4 mb-6 bg-emerald-900 shadow-sm">
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
      <div className="flex justify-center mb-6">
        <AddItemButton onClick={handleAddItem} />
      </div>

      {/* Items */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-emerald-400">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              {...item}
             
            />
          ))}
        </div>
      )}
    </div>
  );
}
