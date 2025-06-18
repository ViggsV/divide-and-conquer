export default function StatusFilter({ filter, setFilter }) {
  const baseStyle = "px-4 py-2 w-32 text-center rounded transition text-white";
  const active = "bg-emerald-600";
  const inactive = "bg-gray-700 hover:bg-rose-600";

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`${baseStyle} ${filter === "all" ? active : inactive}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`${baseStyle} ${filter === "completed" ? active : inactive}`}
      >
        ✅ 
      </button>
      <button
        onClick={() => setFilter("notCompleted")}
        className={`${baseStyle} ${filter === "notCompleted" ? active : inactive}`}
      >
        ❌ 
      </button>
    </div>
  );
}


// Renders the buttons for filtering items by status (All, Completed, Not Completed)