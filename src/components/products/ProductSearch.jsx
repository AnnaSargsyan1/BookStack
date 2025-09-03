import { useState } from "react";

export function ProductSearch({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
        placeholder="Search for a book..."
        className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
      />
    </div>
  );
}
