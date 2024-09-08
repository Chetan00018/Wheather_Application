import React, { useRef, useState } from "react";
import "./Wheather.css";
import { useEffect } from "react";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const Wheather = () => {
  const [wheatherdata, setwheatherdata] = useState(false);

  const inputref = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03d": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("enter a city name");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
    const responce = await fetch(url);
    if (!responce.ok) {
      alert("data can not found");
      return;
    }
    const data = await responce.json();
    console.log(data);
    const icon = allIcons[data.weather[0].icon] || clear_icon;
    setwheatherdata({
      humidity: data.main.humidity,
      windspeed: data.wind.speed,
      temparature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon,
    });
  };

  useEffect(() => {
    search("pune");
  }, []);

  return (
    <div className="wheather">
      <div className="wheather-content">
        <div className="search-bar">
          <input
            ref={inputref}
            type="text"
            placeholder="search"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search(inputref.current.value);
              }
            }}
          />
          <button>
            <img
              src={search_icon}
              alt=""
              onClick={() => {
                search(inputref.current.value);
              }}
            />
          </button>
        </div>
      </div>
      <img src={wheatherdata.icon} alt="" className="wheather-icon" />
      <p className="temperature">{wheatherdata.temparature}°C</p>
      <p className="city">{wheatherdata.location}</p>
      <div className="wheather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{wheatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{wheatherdata.windspeed}km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheather;
