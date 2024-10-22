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

const Today = ({ data }) => {
  return (
    <div className="bg-[#38bdf8] shadow-lg rounded-lg p-6 m-4 flex flex-col items-center w-full md:w-1/2 lg:w-1/3 text-purple-600">
      <h1 className="text-5xl  mb-2">Today</h1>
      <h2 className="text-3xl font-bold mb-2">{data.city}</h2>
      <p className="text-lg mb-2">Temperature: {data.main.temp}°C</p>
      <p className="text-lg mb-2">Condition: {data.weather[0].description}</p>
      <img
        src={iconMap[data.weather[0].icon] || iconMap["01d"]}
        alt={data.weather[0].description}
        className="w-20 h-20"
      />
    </div>
  );
};

export default Today;
