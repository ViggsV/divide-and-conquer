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
      className="bg-gray-700 border border-gray-700 rounded p-4 w-full"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
