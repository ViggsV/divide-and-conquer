"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ChorePageSelector from "../components/ChorePageSelector";
import ViewToggle from "../components/ViewToggle";
import StatusFilter from "../components/StatusFilter";
import ItemCard from "../components/ItemCard";
import AddItemButton from "../components/AddItemButton";

export default function MainPage() {
  const [chorePages, setChorePages] = useState([
    { id: 1, name: "Home" },
    { id: 2, name: "Work" },
  ]);
  const [selectedPage, setSelectedPage] = useState(chorePages[0]?.id || null);

  const [viewMode, setViewMode] = useState("chores"); // chores or bills
  const [filter, setFilter] = useState("all"); // all, completed, notCompleted

  const [items, setItems] = useState([
    {
      id: 1,
      type: "chores",
      pageId: 1,
      title: "Take out trash",
      completed: false,
      dueDate: "2025-06-10",
      description: "Take bins out on Tuesday",
      difficulty: 5,
      assignedUser: null,
    },
    {
      id: 2,
      type: "bills",
      pageId: 1,
      title: "Pay electricity bill",
      completed: true, 
      dueDate: "2025-06-05",
      description: "Monthly electricity payment",
      price: 50.75,
      pricePerPerson: 16.92,
    },
    {
      id: 3,
      type: "chores",
      pageId: 2,
      title: "Finish project report",
      completed: false,
      dueDate: null,
      description: "",
      difficulty: null,
      assignedUser: "Alice",
    },
  ]);

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
      item.type === viewMode &&
      (filter === "all" ||
        (filter === "completed" && item.completed) ||
        (filter === "notCompleted" && !item.completed))
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Top Panel */}
      <div className="border-2 border-gray-800 rounded-md p-4 mb-6 bg-gray-900 shadow-sm">
        {/* Dropdown + New Page Button */}
        <div className="flex items-center mb-4">
          <ChorePageSelector
            chorePages={chorePages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <button
            onClick={handleNewPage}
            className="ml-3 px-4 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-500 transition"
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
        <p className="text-center text-gray-400">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
             
            />
          ))}
        </div>
      )}
    </div>
  );
}
