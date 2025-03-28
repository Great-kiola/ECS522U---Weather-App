// import { useState } from 'react';
// import './App.css'
// import Axios from 'axios';

// // ! Dont delete
// // fetch("Url")
// //   .then((res) => res.json())
// //   .then((data) => {
// //     console.log(data);
// //   })

// function App() {
//   let ApiKey = "278b506dd020c8ea4a386833fc15488d"  //! Ola Api
//   let city = "London"

//   // let ApiKey = "278b506dd020c8ea4a386833fc15488d"   //* Uncomment & Add your api key here

//   const [weatherDetails, setweatherDetails] = useState(null)

//   const fetchData =() => {
//     Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`).then((res) => {
//       setweatherDetails(res.data);
//       console.log(res.data)
//     })

//   }

//   return (
//     <>
//       <button onClick={fetchData} > Get Location</button>
//         <div className='details'>
//           <h2>Getting the weather for {city}</h2>

//           {/* <h2>Location : {weatherDetails?.city}</h2> */}
//           <h2> Temp : {weatherDetails?.main.temp} </h2>
//           <h2>Pressure : {weatherDetails?.main.pressure}</h2>
//           <h2>feels Like : {weatherDetails?.main.feels_like}</h2>
//           <h2>description : {weatherDetails?.weather[0].description}</h2>
//         </div>

//     </>
//   )

// }

// export default App

import React from "react";
import "./style.css";
import {useState} from 'react'
import { useEffect } from "react";

// Main WeatherRoute Component
const WeatherRoute = () => {
  const [data, setData] = useState({})
  const  [location, setLocation] = useState('')
  const API_key = "d4c1f3085a13b8325c6db3814dc45b81";

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "London";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${API_key}`;
      const response = await fetch(url);
      const defaultData = await response.json();
      setData(defaultData);
    };
    fetchDefaultWeather();
  }, []);

  // const handleInputChange = (e) => {
  //   setLocation(e.target.value);

  // }
  const search = async () => {
    if (location.trim()!== '') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_key}`;
      const response = await fetch(url);
      const searchData = await response.json();
      console.log(searchData)
      setData(searchData);
      setLocation('')
    }
  }
    // const handleKeyDown = (e) => {
    //   if (e.key === 'Enter') {
    //     search();
    //   }
    // }
    const currentDate = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
  // Header Component
  const Header = () => (
    <header className="header">
      <h1 className="title">
        <span className="titleHighlight">Weather</span>Route
      </h1>
      <nav className="navigation">
        <ul className="navList">
          <li className="navItem">General</li>
          <li className="navItem">Cyclist</li>
          <li className="navItem">Trains</li>
          <li className="navItem">Auto Vehicle</li>
        </ul>
      </nav>
    </header>
  );

  // Current Weather Component
  const CurrentWeather = () => (
    <div className="currentWeather">
      <div className="searchBar">
      <input
          type="text"
          placeholder="Search for a different location"
          className="searchInput"
          // value = {location}
          // onChange={handleInputChange}
          // onKeyDown={handleKeyDown}
        />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4ec8eb5f912c3be897baec8ed140a2642e8f0c3?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Search"
            className="searchIcon"
            onClick={search} />
      </div>
      
      
      
      <div className="weatherCard">
        <div className="locationInfo">
          <div className="locationHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca67b2fa098019c13aa7411e6706b9b6410dcacd?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Location"
              className="locationIcon"
            />
            <h2 className="locationName">{data.name}</h2>
          </div>
          <time className="timestamp">{formattedDate}</time>
        </div>
        <div className="temperature">
          <div className="tempValue">
            <span className="tempNumber">{data.main ? `${Math.floor(data.main.temp)}` : null}</span>
            <div className="tempUnit">
              <span className="degree">O</span>
              <span className="celsius">C</span>
            </div>
          </div>
          <p className="weatherCondition">{data.weather ? data.weather[0].main : null}</p>
          <div className="weatherMetrics">
            <span>{data.main ? data.main.pressure : null}hPa</span>
            <span>{data.main ? data.main.humidity : null}%</span>
            <span>{data.wind ? data.wind.speed : null} km/hr</span>
          </div>
        </div>
      </div>
      <div className="welcomeMessage">
        <h2>WELCOME...</h2>
        <h3>JANE DOE</h3>
        <p>LETS GET STARTED ON YOUR JOURNEY!</p>
      </div>

      {/* Forecast */}
      {/* <div className="forecast">
      <h2 className="forecastTitle">Weather for the next 5 days</h2>
      <div className="forecastGrid">
        {[
          {
            day: "Tue",
            temp: "10",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/80732e6720b9254f6f43217eae9e520f207311da?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed",
          },
          {
            day: "Tue",
            temp: "-10",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/80732e6720b9254f6f43217eae9e520f207311da?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed",
          },
          { day: "Tue", temp: "23" },
          {
            day: "Tue",
            temp: "35",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/80732e6720b9254f6f43217eae9e520f207311da?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed",
          },
          { day: "Tue", temp: "200" },
          {
            day: "Tue",
            temp: "32",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3256debd33e29a0a2f4f7318ae564fc50154b490?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed",
          },
        ].map((day, index) => (
          <div
            key={index}
            className={`forecastDay ${index === 0 ? "bordered" : ""}`}
          >
            <h3>{day.day}</h3>
            {day.icon && (
              <img src={day.icon} alt="Weather" className="forecastIcon" />
            )}
            <span className="forecastTemp">{day.temp}</span>
          </div>
        ))}
      </div>
    </div> */}
    </div>
  );

  // // Weather Forecast Component
  // const WeatherForecast = () => (

  // );

  // Weather Metrics Component
  const WeatherMetrics = () => (
    <div className="metricsContainer">
      <div className="sunriseSunset">
        <div className="metricHeader">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/abaaad633f86ffdea0db57b147d48081433a2690?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Sunrise & Sunset"
            className="metricIcon"
          />
          <h3>Sunrise & Sunset</h3>
        </div>

        <div className="sunriseTime">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d9d43d7fc036cfde6ea1048c5d19714a999ab00?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Sunrise"
            className="timeIcon"
          />
          <time>6:35 AM</time>
        </div>

        <div className="sunsetTime">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/43d13020e59bf08717459f4ac3e4241db76c0ed4?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Sunset"
            className="timeIcon"
          />
          <time>12:35 PM</time>
        </div>
      </div>

      <div className="metricRow">
        <section className="windSpeed">
          <div className="metricHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Wind Speed"
              className="metricIcon"
            />
            <h3>Wind Speed</h3>
          </div>
          <div className="windValue">20</div>
          <span className="unit">mph</span>
        </section>
      </div>
    </div>
  );

  // Weather Warning Component
  const WeatherWarning = () => (
    <section className="warnings">
      <h3 className="warningTitle">WARNINGS</h3>
      <div className="warningDivider" />
      <div className="warningMessage">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f32b8ee4ee696a89bf10c3c3a44d0ab988ed1e2?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
          alt="Warning"
          className="warningIcon"
        />
        <p className="warningText">
          HIGH SPEEDS: BE CAREFUL WHEN TRAV(get form api of road works?)
        </p>
      </div>
    </section>
  );

  // Location Weather Component
  const LocationWeather = () => {
    const renderLocationMetrics = () => (
      <div className="locationMetrics">
        <section className="locationVisibility">
          <div className="metricHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/187f594ab4892783c791f93331da5aeb20722bda?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Visibility"
              className="metricIcon"
            />
            <h3>Visibility</h3>
          </div>
          <div className="visibilityValue">19</div>
          <p className="visibilityNote">Perfectly clear View</p>
        </section>
        <section className="locationForecast">
          <div className="metricHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/90f54bb9a55890470a342b8758687f5262da254f?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Forecast"
              className="metricIcon"
            />
            <h3>Forecast</h3>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8df73dc80a2516f18824464ffd13dc989d36ef2b?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Weather"
            className="forecastIcon"
          />
        </section>
        <div className="locationConditions">
          <section className="locationWind">
            <div className="metricHeader">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e2b558fa46d26698a2adfa59d051204eb7c9da1?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                alt="Wind Speed"
                className="metricIcon"
              />
              <h3>Wind Speed</h3>
            </div>
            <div className="windValue">20</div>
            <span className="unit">mph</span>
          </section>
          <section className="locationFeelsLike">
            <div className="metricHeader">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/264749dbae4c0b606396f003e0ca3d330cb01613?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                alt="Feels Like"
                className="metricIcon"
              />
              <h3>Feels Like</h3>
            </div>
            <div className="tempDisplay">
              <span className="tempValue">6</span>
              <div className="tempUnit">
                <span className="degree">O</span>
                <span className="celsius">C</span>
              </div>
            </div>
            <p className="actualTemp">Actual : 12</p>
            <p className="tempNote">Wind is making it feel cooler</p>
          </section>
        </div>
      </div>
    );

    return (
      <section className="locationWeather">
        <h2 className="locationTitle">YOUR WEATHER ROUTE</h2>
        <div className="locations">
          <div className="location">
            <h3 className="locationName">Location : London</h3>
            {renderLocationMetrics("london")}
          </div>
          <div className="location">
            <h3 className="locationName">Location : Dartford, Kent</h3>
            {renderLocationMetrics("dartford")}
          </div>
        </div>
      </section>
    );
  };

  // Route Tracker Component
  const RouteTracker = () => (
    <section className="routeTracker">
      <h2 className="routeTitle">
        TRAVELLING BY BIKE: CYCLISTS WEATHER TRACKER
      </h2>
      <div className="routeContent">
        <div className="routePlanner">
          <div className="routeMap">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/23fe541d5033b30f34c490cad148f4ca8669debc?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Route Map"
              className="mapImage"
            />
            <form className="routeForm">
              <div className="locationInput">
                <label htmlFor="startPoint">Starting Point:</label>
                <input
                  type="text"
                  id="startPoint"
                  placeholder="Enter location"
                  className="inputField"
                />
              </div>
              <div className="locationInput">
                <label htmlFor="destination">Destination 1:</label>
                <div className="destinationWrapper">
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter location"
                    className="inputField"
                  />
                  <div className="timeSelector">
                    <span>Time</span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae276bd8a14e01f8aa0ecfd1db634d510bf77811?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                      alt="Time"
                      className="timeIcon"
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="addDestination">
                Add destination +
              </button>
              <button type="submit" className="getWeather">
                Get Route Weather
              </button>
            </form>
          </div>
          <WeatherWarning />
        </div>
        <LocationWeather />
      </div>
    </section>
  );

  // Route Tracker Component
  const RouteTracker1 = () => (
    <section className="routeTracker">
      <h2 className="routeTitle">
        TRAVELLING BY BIKE: CYCLISTS WEATHER TRACKER
      </h2>
      <div className="routeContent">
        <div className="routePlanner">
          <div className="routeMap">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/23fe541d5033b30f34c490cad148f4ca8669debc?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Route Map"
              className="mapImage"
            />
            <form className="routeForm">
              <div className="locationInput">
                <label htmlFor="startPoint">Starting Point:</label>
                <input
                  type="text"
                  id="startPoint"
                  placeholder="Enter location"
                  className="inputField"
                />
              </div>
              <div className="locationInput">
                <label htmlFor="destination">Destination 1:</label>
                <div className="destinationWrapper">
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter location"
                    className="inputField"
                  />
                  <div className="timeSelector">
                    <span>Time</span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae276bd8a14e01f8aa0ecfd1db634d510bf77811?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                      alt="Time"
                      className="timeIcon"
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="addDestination">
                Add destination +
              </button>
              <button type="submit" className="getWeather">
                Get Route Weather
              </button>
            </form>
          </div>
          <WeatherWarning />
        </div>
        <LocationWeather />
      </div>
    </section>
  );
  // Route Tracker Component
  const RouteTracker2 = () => (
    <section className="routeTracker">
      <h2 className="routeTitle">TRAVELLING BY TRAIN: WEATHER TRACKER</h2>
      <div className="routeContent">
        <div className="routePlanner">
          <div className="routeMap">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/23fe541d5033b30f34c490cad148f4ca8669debc?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Route Map"
              className="mapImage"
            />
            <form className="routeForm">
              <div className="locationInput">
                <label htmlFor="startPoint">Starting Point:</label>
                <input
                  type="text"
                  id="startPoint"
                  placeholder="Enter location"
                  className="inputField"
                />
              </div>
              <div className="locationInput">
                <label htmlFor="destination">Destination 1:</label>
                <div className="destinationWrapper">
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter location"
                    className="inputField"
                  />
                  <div className="timeSelector">
                    <span>Time</span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae276bd8a14e01f8aa0ecfd1db634d510bf77811?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                      alt="Time"
                      className="timeIcon"
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="addDestination">
                Add destination +
              </button>
              <button type="submit" className="getWeather">
                Get Route Weather
              </button>
            </form>
          </div>
          <WeatherWarning />
        </div>
        <LocationWeather />
      </div>
    </section>
  );
  // Route Tracker Component
  const RouteTracker3 = () => (
    <section className="routeTracker">
      <h2 className="routeTitle">TRAVELLING BY CAR: WEATHER TRACKER</h2>
      <div className="routeContent">
        <div className="routePlanner">
          <div className="routeMap">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/23fe541d5033b30f34c490cad148f4ca8669debc?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Route Map"
              className="mapImage"
            />
            <form className="routeForm">
              <div className="locationInput">
                <label htmlFor="startPoint">Starting Point:</label>
                <input
                  type="text"
                  id="startPoint"
                  placeholder="Enter location"
                  className="inputField"
                />
              </div>
              <div className="locationInput">
                <label htmlFor="destination">Destination 1:</label>
                <div className="destinationWrapper">
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter location"
                    className="inputField"
                  />
                  <div className="timeSelector">
                    <span>Time</span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae276bd8a14e01f8aa0ecfd1db634d510bf77811?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                      alt="Time"
                      className="timeIcon"
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="addDestination">
                Add destination +
              </button>
              <button type="submit" className="getWeather">
                Get Route Weather
              </button>
            </form>
          </div>
          <WeatherWarning />
        </div>
        <LocationWeather />
      </div>
    </section>
  );

  return (
    <>
      <Header />
      <div className="weatherContent">
        <CurrentWeather />
        <WeatherMetrics />
      </div>

      <RouteTracker />
    </>
  );
};

export default WeatherRoute;
