export default function ChorePageSelector({ selectedPage, setSelectedPage }) {
  const options = [
    'Home Chores',
    'Work Tasks',
    'Flatmate Duties'
  ];

  return (
    <select
      value={selectedPage}
      onChange={(e) => setSelectedPage(e.target.value)}
      className="bg-emerald-400 border-2 border-emerald-400 rounded p-4 w-full"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
