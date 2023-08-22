import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false }); //used to gather info and display it after API call -> ready: false used to not fall in an infinite API call loop
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    //Creates an object where we pass all info we need from API
    setWeatherData({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      /*iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,*/
      icon: response.data.weather[0].icon,
      ready: true, //allows information rendering once API call is made
      coordinates: response.data.coord,
    });
  }

  function search() {
    //make API call
    const apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(e) {
    e.preventDefault();
    search(); //is in charge of making API call
  }

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  if (weatherData.ready) {
    //Render information
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        {/*sends weatherData data to new component*/}
        <WeatherForecast size={52} coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}

//add degrees conversion onclick for 5-days forecast
//update design
//add info from API
