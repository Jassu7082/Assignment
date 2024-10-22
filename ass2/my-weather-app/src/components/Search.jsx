import React, { useState } from 'react';

const Search = ({ onCitySelect }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length > 2) {
      const cities = await fetchCities(value);
      setSuggestions(cities);
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (suggestion) => {
    setCity(suggestion.city); // Set the selected city name
    setSuggestions([]);
    onCitySelect(suggestion); // Call the function to fetch weather data for the selected city
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Search for a city..."
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded bg-white w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleCitySelect(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion.city}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;

const fetchCities = async (query) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fee7c4806emsh9aa50f0782ebea0p126d3cjsn92af68e5e03b',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };
  const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, options);
  const data = await response.json();
  return data.data;
};
