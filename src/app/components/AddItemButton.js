export default function AddItemButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="ml-4 px-6 py-4 bg-rose-600 text-m text-white rounded hover:bg-emerald-700 transition"
    >
      + Add Item
    </button>
  );
}
