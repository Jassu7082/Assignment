import React from 'react';

// Importing all the necessary icons from WeatherIcons folder
import clearSky from "../assets/WeatherIcons/clear_sky.png";
import cloudy from "../assets/WeatherIcons/cloudy.png";
import drizzle from "../assets/WeatherIcons/drizzle.png";
import dust from "../assets/WeatherIcons/dust.png";
import fog from "../assets/WeatherIcons/fog.png";
import freezingRain from "../assets/WeatherIcons/freezing_rain.png";
import hazy from "../assets/WeatherIcons/hazy.png";
import mist from "../assets/WeatherIcons/mist.png";
import partlyCloudy from "../assets/WeatherIcons/partly_cloudy.png";
import rain from "../assets/WeatherIcons/rain.png";
import sandstorm from "../assets/WeatherIcons/sandstorm.png";
import showers from "../assets/WeatherIcons/showers.png";
import sleet from "../assets/WeatherIcons/sleet.png";
import smoke from "../assets/WeatherIcons/smoke.png";
import snow from "../assets/WeatherIcons/snow.png";
import thunderstorm from "../assets/WeatherIcons/thunderstorm.png";
import tornado from "../assets/WeatherIcons/tornado.png";

// Create a mapping between API icon codes and your PNG images
const iconMap = {
  "01d": clearSky,
  "01n": clearSky,
  "02d": partlyCloudy,
  "02n": partlyCloudy,
  "03d": cloudy,
  "03n": cloudy,
  "04d": cloudy,
  "04n": cloudy,
  "09d": drizzle,
  "09n": drizzle,
  "10d": rain,
  "10n": rain,
  "11d": thunderstorm,
  "11n": thunderstorm,
  "13d": snow,
  "13n": snow,
  "50d": mist,
  "50n": mist,
  "dust": dust,
  "fog": fog,
  "haze": hazy,
  "smoke": smoke,
  "sandstorm": sandstorm,
  "tornado": tornado,
  "freezing_rain": freezingRain,
  "showers": showers,
  "sleet": sleet,
};

const WeatherDashboard = ({ todayData, forecastData }) => {
  // Helper function to format date for forecast days
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (!todayData || !forecastData || !todayData.weather || !forecastData.length) {
    return <div className="text-red-600">Error loading weather data.</div>;
  }

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-4xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Weather App</h1>
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">User Name</p>
            <img
              src="path_to_settings_icon"
              alt="Settings"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        {/* Today's Weather */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Today's Weather</h2>
          <div className="flex justify-between items-center">
            <img
              src={iconMap[todayData.weather[0].icon] || clearSky} // Fallback to default icon
              alt={todayData.weather[0].description}
              className="w-16 h-16"
            />
            <p className="text-4xl font-bold">{todayData.main.temp}°C</p>
          </div>
          <p className="text-lg text-gray-600">{todayData.weather[0].description}</p>
        </div>

        {/* Today's Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* UV Index */}
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Today's Highlights</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">UV Index</p>
              <p className="text-2xl font-bold text-yellow-500">5</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Sunrise</p>
                <p className="text-sm text-gray-500">{new Date(todayData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div>
                <p className="text-lg">Sunset</p>
                <p className="text-sm text-gray-500">{new Date(todayData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>

          {/* Wind Status */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-2">Wind Status</h2>
            <p className="text-2xl font-bold">{todayData.wind.speed} km/h</p>
            <p className="text-sm text-gray-500">{todayData.wind.deg}°</p>
          </div>

          {/* Visibility */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-2">Visibility</h2>
            <p className="text-2xl font-bold">{(todayData.visibility / 1000).toFixed(1)} km</p>
            <p className="text-sm text-gray-500">Average</p>
          </div>

          {/* Humidity */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-2">Humidity</h2>
            <p className="text-2xl font-bold">{todayData.main.humidity}%</p>
            <p className="text-sm text-gray-500">Normal</p>
          </div>

          {/* Air Quality */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-purple-600 mb-2">Air Quality</h2>
            <p className="text-2xl font-bold">33</p>
            <p className="text-sm text-gray-500">Good</p>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-purple-600 mb-4">Hourly Forecast</h2>
          <div className="flex space-x-4">
            {forecastData.slice(0, 5).map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium">{new Date(item.dt * 1000).getHours()}:00</p>
                <p className="text-lg font-bold">{Math.round(item.main.temp)}°C</p>
                <img
                  src={iconMap[item.weather[0].icon] || clearSky} // Fallback to default icon
                  alt={item.weather[0].description}
                  className="w-16 h-16 mx-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Forecast for the next few days */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-purple-600 mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {forecastData.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-lg text-center">
                <p className="text-lg font-bold mb-2">{formatDate(item.dt_txt)}</p>
                <img
                  src={iconMap[item.weather[0].icon] || clearSky} // Fallback to default icon
                  alt={item.weather[0].description}
                  className="w-16 h-16 mx-auto"
                />
                <p className="text-lg">{Math.round(item.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
