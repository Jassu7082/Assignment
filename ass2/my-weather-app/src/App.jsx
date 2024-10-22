import React, { useState, useEffect } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Searchbar from "./components/Searchbar";
import Loading from "./components/loading"; // Import the Loading component
import axios from "axios";

// Importing all the necessary icons from WeatherIcons folder
import clearSky from "./assets/WeatherIcons/clear_sky.png";
import cloudy from "./assets/WeatherIcons/cloudy.png";
import drizzle from "./assets/WeatherIcons/drizzle.png";
import dust from "./assets/WeatherIcons/dust.png";
import fog from "./assets/WeatherIcons/fog.png";
import freezingRain from "./assets/WeatherIcons/freezing_rain.png";
import hazy from "./assets/WeatherIcons/hazy.png";
import mist from "./assets/WeatherIcons/mist.png";
import partlyCloudy from "./assets/WeatherIcons/partly_cloudy.png";
import rain from "./assets/WeatherIcons/rain.png";
import sandstorm from "./assets/WeatherIcons/sandstorm.png";
import showers from "./assets/WeatherIcons/showers.png";
import sleet from "./assets/WeatherIcons/sleet.png";
import smoke from "./assets/WeatherIcons/smoke.png";
import snow from "./assets/WeatherIcons/snow.png";
import thunderstorm from "./assets/WeatherIcons/thunderstorm.png";
import tornado from "./assets/WeatherIcons/tornado.png";

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

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today'); // New state for active tab

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  const fetchWeatherData = (lat, lon, cityLabel) => {
    setLoading(true);
    const currentWeatherFetch = axios.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = axios.get(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then((response) => {
        setCurrentWeather({ city: cityLabel, ...response[0].data });
        setForecast({ city: cityLabel, ...response[1].data });
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherData(lat, lon, "Your Location"); // Replace "Your Location" with a dynamic label if needed
    }
  }, [lat, lon]);

  const WeatherDashboard = () => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    const renderContent = () => {
      if (activeTab === 'today' && currentWeather) {
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Current Weather</h2>
            <div className="flex items-center justify-between">
              <img
                src={iconMap[currentWeather.weather[0].icon] || clearSky}
                alt={currentWeather.weather[0].description}
                className="w-20 h-20"
              />
              <div className="text-right">
                <p className="text-4xl font-bold">{currentWeather.main.temp}°C</p>
                <p className="text-lg text-gray-700 capitalize">{currentWeather.weather[0].description}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-gray-600">
              <p>Humidity: {currentWeather.main.humidity}%</p>
              <p>Wind: {currentWeather.wind.speed} km/h</p>
              <p>Visibility: {(currentWeather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        );
      } else if (activeTab === 'forecast' && forecast) {
        return (
          <div className="grid grid-cols-4 gap-6 mt-4"> {/* Specify columns */}
            {forecast.list.map((day, index) => {
              if (index % 8 !== 0) return null; // Adjust this logic as needed
              return (
                <div key={day.dt} className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold">{formatDate(day.dt_txt)}</h3>
                  <img
                    src={iconMap[day.weather[0].icon] || clearSky}
                    alt={day.weather[0].description}
                    className="w-16 h-16"
                  />
                  <p className="text-2xl font-bold">{day.main.temp}°C</p>
                  <p className="text-sm text-gray-600">{day.weather[0].description}</p>
                </div>
              );
            })}
          </div>
        );
      }
    };
    
    return (
      <div className="flex min-h-screen bg-purple-50">
        {/* Sidebar */}
        <div className="w-1/3 bg-white shadow-lg p-4">
          <h1 className="text-3xl font-bold text-yellow-500 mb-8">Weather App</h1>
          <div className="flex flex-col">
            <button
              className={`p-2 text-lg ${activeTab === 'today' ? 'bg-purple-500 text-white' : 'text-purple-600'}`}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              className={`p-2 text-lg ${activeTab === 'forecast' ? 'bg-purple-500 text-white' : 'text-purple-600'}`}
              onClick={() => setActiveTab('forecast')}
            >
              Forecast
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-2/3 p-4">
          {loading ? (
            <Loading />
          ) : (
            renderContent()
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <WeatherDashboard />
    </>
  );
}

export default App;
