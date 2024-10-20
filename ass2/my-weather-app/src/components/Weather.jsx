import React from 'react';

const Weather = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold">{weatherData.name}</h2>
      <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
