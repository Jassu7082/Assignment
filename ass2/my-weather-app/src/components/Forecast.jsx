const Forecast = ({ data }) => {
    const forecastItems = data.list.slice(0, 5).map((item) => (
      <div
        key={item.dt}
        className="bg-blue-100 p-4 rounded-md mb-2 flex justify-between"
      >
        <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
        <p>{Math.round(item.main.temp)}°C</p>
        <p>{item.weather[0].description}</p>
      </div>
    ));
  
    return (
      <div className="bg-white shadow-lg p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
        {forecastItems}
      </div>
    );
  };
  
  export default Forecast;
  