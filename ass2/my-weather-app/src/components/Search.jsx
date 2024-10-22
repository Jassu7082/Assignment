import React, { useState } from 'react';

const Search = ({ onCitySelect }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.length > 2) {
      try {
        const cities = await fetchCities(value);
        setSuggestions(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
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
              onClick={() => onCitySelect(suggestion)}
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

const fetchCities = async (query) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fee7c4806emsh9aa50f0782ebea0p126d3cjsn92af68e5e03b', 
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  return data.data;
};

export default Search;
