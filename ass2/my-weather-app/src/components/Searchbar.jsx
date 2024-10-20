import { useState } from "react";
import axios from "axios";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";

const Searchbar = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=fee7c4806emsh9aa50f0782ebea0p126d3cjsn92af68e5e03b`
    );
    setSuggestions(response.data.features.map((item) => ({
      label: item.properties.formatted,
      value: `${item.geometry.coordinates[1]} ${item.geometry.coordinates[0]}`
    })));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 2) fetchSuggestions(value);
  };

  return (
    <div className="w-full mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a city..."
        className="border-2 p-2 w-full rounded-md"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 bg-white border rounded-md">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.label}
              onClick={() => onSearchChange(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
