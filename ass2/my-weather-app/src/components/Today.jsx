const Today = ({ data }) => {
    const { main, name, weather, wind } = data;
    return (
      <div className="bg-white shadow-lg p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <p className="text-xl">{weather[0].description}</p>
        <p className="text-4xl font-bold mb-2">{Math.round(main.temp)}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind Speed: {wind.speed} m/s</p>
      </div>
    );
  };
  
  export default Today;
  