import React from "react";
import Axios from "axios";
import { useState } from 'react'


import "../src/styling/style.css";
import guage from "./assets/gauge-medium-svgrepo-com.svg"
import speed from "./assets/speed-meter-svgrepo-com.svg"
import humidity from "./assets/humidity-svgrepo-com.svg"
import pin from "./assets/location-pin-svgrepo-com.svg"


// const timestamp = 1691622800; // start with a Unix timestamp
// const date = new Date(timestamp);
// console.log("Time:" , date.getHours(),":" , date.getMinutes(),":",date.getSeconds() ); // prints the hour (0-23)
// {date.getHours() `:`, date.getMinutes() `:`, date.getSeconds() }

// Main WeatherRoute Component
const WeatherRoute = () => {

  const [weatherDetails, setweatherDetails] = useState(null)
  const [val, setVal] = useState('')

  const API_key = "d4c1f3085a13b8325c6db3814dc45b81";



  const handleChange = (event) => {
    setVal(event.target.value);
  }

  const search = () => {

    console.log(val)

    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${API_key}`).then((res) => {
      setweatherDetails(res.data);
      console.log(res.data)
    })
    console.log("Hello")
  }

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

      <div className="weatherCard">
          <form className="searchBar" onSubmit={(e) => {
            e.preventDefault();
            search()
          }}>
            <input
              type="text"
              placeholder="Search for a different location"
              className="searchInput"
              onChange={handleChange}
              value={val}

              autoFocus
            />
            <button type="submit" className="search--Btn">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4ec8eb5f912c3be897baec8ed140a2642e8f0c3?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
                alt="Search"
              />
            </button>
          </form>

        <div className="locationInfo">
          <div className="locationHeader">
            <img src={pin} alt="Location" className="locationIcon" />
            <h2 className="locationName">{weatherDetails?.name}</h2>
          </div>


          <time className="timestamp">{formattedDate}</time>
        </div>
        <div className="temperature">
          <div className="tempValue">
            <div className="val-num">
              <span className="tempNumber">{weatherDetails?.main ? `${Math.floor(weatherDetails?.main.temp - 273.15)}` : null}</span>
              <div className="tempUnit">
                <span className="degree">O</span>
                <span className="celsius">C</span>
              </div>
            </div>

            <div className="weather-condtn">
              <p className="weatherCondition">{weatherDetails?.weather ? weatherDetails?.weather[0].main : null}</p>

            </div>

          </div>
          <div className="weatherMetrics">

            <div className="pressure">
              <img src={guage} alt="pressure" />
              <span>{weatherDetails?.main ? weatherDetails?.main.pressure : null}hPa</span>
            </div>

            <div className="pressure">
              <img src={humidity} alt="humidity" />
              <span>{weatherDetails?.main ? weatherDetails?.main.humidity : null}%</span>
            </div>

            <div className="pressure">
              <img src={speed} alt="speed" />
              <span>{weatherDetails?.wind ? weatherDetails?.wind.speed : null} km/hr</span>
            </div>



          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="forecast">
        <h2 className="forecastTitle">Weather for the next 5 days</h2>
        <div className="forecastGrid">
          <div className="forecastDay">
            <img src={guage} alt="guage icon" />

              <div className="today">
                <h1 className="todayDate">Mon, 25, Oct,  {weatherDetails?.weather[0].main} </h1>
                <h3 className="details"> Feels like: <span> 16 </span></h3>

                <div className="dayGrid">
                  <div>
                    <h3 className="details">Dew point: {weatherDetails?.wind ? weatherDetails?.wind.speed : null}</h3>
                  </div>
                  <div>
                    <h3 className="details">Visibility: {weatherDetails?.wind ? weatherDetails?.wind.speed : null}</h3>
                  </div>
                  <div>
                    <h3 className="details">humidity: {weatherDetails?.main.humidity}</h3>
                  </div>
                  <div>
                    <h3 className="details">UV: {weatherDetails?.wind ? weatherDetails?.wind.speed : null}</h3>
                  </div>
                </div>
                <div className="daySection">
                  
                </div>

                <div className="daySection">
                </div>
              </div>
          </div>

          <div className="otherDays">
            <h2>Tue</h2>
            <img src={humidity} alt="" />
            <h2>50</h2>
          </div>

          <div className="otherDays">
            <h2>Tue</h2>
            <img src={humidity} alt="" />
            <h2>50</h2>
          </div>

          <div className="otherDays">
            <h2>Tue</h2>
            <img src={humidity} alt="" />
            <h2>50</h2>
          </div>

          <div className="otherDays">
            <h2>Tue</h2>
            <img src={humidity} alt="" />
            <h2>50</h2>
          </div>

          <div className="otherDays">
            <h2>Tue</h2>
            <img src={humidity} alt="" />
            <h2>50</h2>
          </div>
        </div>
      </div>
    </div>
  );

  // Weather Metrics Component
  const WeatherMetrics = () => (
    <div className="metricsContainer">
      <div className="sunriseSunset">
        <div className="metricHeader">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Sunrise & Sunset"
            className="metricIcon"
          />
          <h3>Sunrise & Sunset</h3>
        </div>


        <div className="riseSet">
          <div className="sunriseTime">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d9d43d7fc036cfde6ea1048c5d19714a999ab00?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Sunrise"
              className="timeIcon"
            />

            <p>6:35</p>
          </div>

          <div className="sunsetTime">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/43d13020e59bf08717459f4ac3e4241db76c0ed4?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Sunset"
              className="timeIcon"
            />
            <p>12:35 PM</p>
          </div>
        </div>


      </div>

      <div className="metricRow">
        <section className="Humidity">
          <div className="metricHeader">
            <img
              src={humidity}
              alt="Humidity"
              className="metricIcon"
            />
            <h3>Humidity</h3>
          </div>
          <p className="windValue">{weatherDetails?.main.humidity}</p>
          <span className="unit">%</span>
        </section>
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
          <p className="windValue">{weatherDetails?.wind.speed}</p>
          <span className="unit">m/s</span>
        </section>
      </div>

      <div className="metricRow">
        <section className="FeelsLike">
          <div className="metricHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Feels like"
              className="metricIcon"
            />
            <h3>Feels like</h3>
          </div>
          <p className="windValue">{weatherDetails?.main.feels_like}</p>
          <span className="unit">C</span>
        </section>
      </div>

      <div className="metricRow">
        <section className="Visibility">
          <div className="metricHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Visibility"
              className="metricIcon"
            />
            <h3>Visibility</h3>
          </div>
          <p className="windValue">{weatherDetails?.visibility}</p>
          <span className="unit">m</span>
        </section>
      </div>

      <div className="metricRow">
        <section className="Pressure">
          <div className="metricHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Wind Speed"
              className="metricIcon"
            />
            <h3>Pressure</h3>
          </div>

            <p className="windValue">{weatherDetails?.main.pressure}</p>
            <span className="unit">hPa</span>
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
