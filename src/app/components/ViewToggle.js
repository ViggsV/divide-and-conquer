export default function ViewToggle({ viewMode, setViewMode }) {
  const baseStyle = "px-4 py-2 w-32 text-center rounded transition text-white";
  const active = "bg-emerald-600";
  const inactive = "bg-rose-700 hover:bg-emerald-600";

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setViewMode("chores")}
        className={`${baseStyle} ${viewMode === "chores" ? active : inactive}`}
      >
        Chores
      </button>
      <button
        onClick={() => setViewMode("bills")}
        className={`${baseStyle} ${viewMode === "bills" ? active : inactive}`}
      >
        Bills
      </button>
    </div>
  );
}


// Renders the buttons for toggling between Chores and Bills