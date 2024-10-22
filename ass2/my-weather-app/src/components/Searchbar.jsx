import { useState } from "react";

const Searchbar = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search) {
      onSearchChange({ label: search, value: "19.0760 72.8777" }); // Hardcoding coordinates for example
    }
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Enter city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
