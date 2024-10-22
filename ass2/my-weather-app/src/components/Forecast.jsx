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

// Helper function to format date
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', weekday: 'short' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Forecast component to display weather data
const Forecast = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-[3/4] md:w-3/4 lg:w-1/2 text-purple-600">
      <h2 className="text-3xl font-bold mb-4 text-center">Forecast</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="p-2">Date</th>
            <th className="p-2">Temperature (°C)</th>
            <th className="p-2">Condition</th> */}
          </tr>
        </thead>
        <tbody>
          {data.list.slice(0, 5).map((item, index) => (
            <tr key={index} className="text-center">
              <td className="p-2">
                {formatDate(item.dt_txt)}
              </td>
              <td className="p-2">{item.main.temp}°C</td>
              <td className="p-2 text-center">
              <img
            src={iconMap[item.weather[0].icon] || iconMap["c01d"]} // Fallback to "clear sky day" if icon not found
            alt={item.weather[0].description}
            className="w-16 h-16 mx-auto p-2"
          />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forecast;
