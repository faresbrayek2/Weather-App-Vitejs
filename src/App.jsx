import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import notfound from "./assets/404.png";
import clear from "./assets/clear.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import mist from "./assets/mist.png";
import cloud from "./assets/cloud.png";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setWeather({});
    const city = e.target.elements.city.value;
    const APIKey = "a846d48e397bfc3a8ce746b7d420985e";

    if (city === "") return;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    );
    const data = await res.json();
    console.log(data);
    if (data.cod === "404") {
      setError(true);
      setLoading(false);
      return;
    }

    setWeather(data);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-white px-10 py-10 rounded-lg shadow-lg w-1/4">
        <form onSubmit={getWeather}>
          <div className="flex items-center justify-between">
            <FontAwesomeIcon icon={faLocationDot} className="text-blue-400" />
            <input
              type="text"
              name="city"
              placeholder="Enter your location"
              className="outline-none w-3/5 py-2 px-3 text-gray-700 font-medium"
            />
            <button className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-3 rounded-full">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
        {loading && (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center mt-4 flex justify-center">
            <img src={notfound} alt="error" className="w-1/3" />
            <div className="flex flex-col justify-center items-center ml-4">
              <p className="text-gray-700 font-medium mt-2">
                Oops! Invalid location :/
              </p>
            </div>
          </div>
        )}
        {Object.keys(weather).length !== 0 && (
          <div className="text-center mt-4">
            <div className="mt-4 flex justify-center">
              <img
                src={
                  weather.weather[0].main === "Clear"
                    ? clear
                    : weather.weather[0].main === "Rain"
                    ? rain
                    : weather.weather[0].main === "Snow"
                    ? snow
                    : weather.weather[0].main === "Clouds"
                    ? cloud
                    : weather.weather[0].main === "Haze"
                    ? mist
                    : null
                }
                className="flex justify-center items-center w-1/4"
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <p className="text-3xl font-medium">
                {parseInt(weather.main.temp)}
                <span className="text-base font-normal">°C</span>
              </p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <p className="text-base font-medium">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-2xl"
                  icon={faWater}
                  style={{ color: "#06283D" }}
                />
                <div className="ml-4">
                  <span className="text-lg font-medium">
                    {weather.main.humidity}%
                  </span>
                  <p className="text-sm font-medium">Humidity</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-2xl"
                  icon={faWind}
                  style={{ color: "#06283D" }}
                />
                <div className="ml-4">
                  <span className="text-lg font-medium">
                    {parseInt(weather.wind.speed)}Km/h
                  </span>
                  <p className="text-sm font-medium">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
