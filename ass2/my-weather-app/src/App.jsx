import { useState, useEffect } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Today from "./components/Today";
import Forecast from "./components/Forecast";
import Searchbar from "./components/Searchbar";
import axios from "axios";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
    if (lat && lon) {
      axios
        .get(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        )
        .then((response) => setCurrentWeather(response.data))
        .catch(console.log);

      axios
        .get(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        )
        .then((response) => setForecast(response.data))
        .catch(console.log);
    }
  }, [lat, lon]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col items-center p-4">
      <Searchbar onSearchChange={handleOnSearchChange} />
      <div className="w-full md:flex md:gap-8 md:items-start md:justify-center">
        {currentWeather && <Today data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
