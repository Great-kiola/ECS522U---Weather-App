import React from "react";
import Axios from "axios";
import { useState } from 'react'


import "../src/styling/style.css";
import guage from "./assets/gauge-medium-svgrepo-com.svg"
import speed from "./assets/speed-meter-svgrepo-com.svg"
import humidity from "./assets/humidity-svgrepo-com.svg"
import pin from "./assets/location-pin-svgrepo-com.svg"

// Weather condition GIFs
import clear from './assets/clear.gif';
import rain from './assets/rain.gif';
import snow from './assets/snow.gif';
import thunderstorm from './assets/thunderstorm.gif';
import few from './assets/few.gif';
import defaultGif from './assets/default.gif';


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
      
    </header>
  );

  // Current Weather Component

  const CurrentWeather = () => {
    let cardStyle = {};
  
    if (weatherDetails && weatherDetails.weather && weatherDetails.weather[0]) {
      const weatherCondition = weatherDetails.weather[0].main;
      let bgGif;
  
      if (weatherCondition === "Clear") bgGif = clear;
      else if (weatherCondition === "Rain") bgGif = rain;
      else if (weatherCondition === "Snow") bgGif = snow;
      else if (weatherCondition === "Thunderstorm") bgGif = thunderstorm;
      else if (weatherCondition === "Clouds") bgGif = few;
      else bgGif = defaultGif;
  
      cardStyle = {
        backgroundImage: `url(${bgGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    } else {
      cardStyle = { backgroundColor: '#93c1ec' };
    }
  
    return (
      <div className="currentWeather">
        <div className="weatherCard" style={cardStyle}>
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
                <span>{weatherDetails?.wind ? `${Math.floor(weatherDetails?.wind.speed * 2.237)}` : null} mph</span>
              </div>
            </div>
          </div>
        </div>
  
        <div className="forecast">
          <h2 className="forecastTitle">Weather for the next 5 days</h2>
          <div className="forecastGrid">
            <div className="forecastDay">
              <img src={guage} alt="guage icon" />
                <div className="today">
                  <h1 className="todayDate">Mon, 25, Oct, {weatherDetails?.weather[0].main}</h1>
                  <h3 className="details"> Feels like: <span>16</span></h3>
                  <div className="dayGrid">
                    <div><h3 className="details">Dew point: {weatherDetails?.wind ? weatherDetails.wind.speed : null}</h3></div>
                    <div><h3 className="details">Visibility: {weatherDetails?.wind ? weatherDetails.wind.speed : null}</h3></div>
                    <div><h3 className="details">humidity: {weatherDetails?.main.humidity}</h3></div>
                    <div><h3 className="details">UV: {weatherDetails?.wind ? weatherDetails.wind.speed : null}</h3></div>
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
  };

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
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/43d13020e59bf08717459f4ac3e4241db76c0ed4?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Sunrise"
              className="timeIcon"
            />
            {/**1000 is to convert from Unix timestamp(used by API which is seconds since 1/1/1970) to javascript timestamp(milliseconds since 1/1/1970)
             * hour: '2-digit' is to get the hour in 2 digit format (01, 02, ... 12, 13, ... 23)
             * minute: '2-digit' is to get the minute in 2 digit format (00, 01, ... 59)
             */}
            <p>{weatherDetails?.sys?.sunrise ? new Date(weatherDetails.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }): '--:--'}</p>
          </div>
          
          <div className="sunsetTime">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d9d43d7fc036cfde6ea1048c5d19714a999ab00?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
              alt="Sunset"
              className="timeIcon"
            />
            <p>{weatherDetails?.sys?.sunset? new Date(weatherDetails.sys.sunset * 1000).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }): '--:--'}</p>
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
          {weatherDetails?.main?.humidity ? (
            <>
              <p className="windValue">{weatherDetails.main.humidity} %</p>
            </>
          ) : null}
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
          {weatherDetails?.wind?.speed ? (
            <>
              <p className="windValue">{Math.floor(weatherDetails?.wind.speed *2.237)}mph</p>
            </>
          ) : null}
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
          {weatherDetails?.main?.feels_like ? (
            <>
              <p className="windValue">{Math.floor(weatherDetails.main.feels_like-273.15)} °C</p>
            </>
          ) : null}
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
          {weatherDetails?.visibility ? (
            <>
              <p className="windValue">{weatherDetails.visibility/1000} km</p>
            </>
          ) : null}
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
          {weatherDetails?.main?.pressure ? (
            <>
            <p className="windValue">{weatherDetails.main.pressure} hPa</p>
            </>
          ) : null}
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

  const VehicleWeather = () => {
    const [selectedVehicle, setSelectedVehicle] = useState("Cyclist");
    const [startPoint, setStartPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [startWeather, setStartWeather] = useState(null);
    const [destinationWeather, setDestinationWeather] = useState(null);
    const [recommendation, setRecommendation] = useState("");
    const [roadDisruptions, setRoadDisruptions] = useState([]);
    
  
    const API_key = "d4c1f3085a13b8325c6db3814dc45b81";
  
    // Function to determine if it's safe for cyclists
    const isSafeForCyclists = (windSpeed, temp) => {
      if (windSpeed > 20) return "Not safe: High wind speeds.";
      if (temp < 0) return "Not safe: Freezing temperatures.";
      return "Safe to travel.";
    };
  
    // Function to fetch weather data for a location
    const fetchWeatherData = async (location) => {
      try {
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching weather data for ${location}:`, error);
        return null;
      }
    };

    const fetchRoadDisruptions = async () => {
      const road = "M25"; // Only fetch disruptions for M25
      const startDate = new Date().toISOString().split("T")[0]; // Today's date
      const endDate = new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days from now
        .toISOString()
        .split("T")[0];
    
      try {
        const response = await Axios.get(
          `https://api.tfl.gov.uk/Road/${road}/Disruption?startDate=${startDate}&endDate=${endDate}`
        );
    
        const disruptions = response.data || []; // Ensure disruptions is always an array
        return { road, disruptions };
      } catch (error) {
        console.error("Error fetching road disruptions:", error);
        return { road, disruptions: [] }; // Return an empty array on error
      }
    };
  
    // Handle route submission
    const handleRouteSubmit = async (e) => {
      e.preventDefault();
    
      if (!startPoint || !destination) {
        alert("Please enter both starting point and destination.");
        return;
      }
    
      // Fetch weather data for both locations
      const startData = await fetchWeatherData(startPoint);
      const destinationData = await fetchWeatherData(destination);
    
      setStartWeather(startData);
      setDestinationWeather(destinationData);
    
      if (startData && destinationData) {
        const startWindSpeed = startData.wind ? Math.floor(startData.wind.speed * 2.237) : 0;
        const startTemp = startData.main ? Math.floor(startData.main.temp - 273.15) : 0;
        const destinationWindSpeed = destinationData.wind ? Math.floor(destinationData.wind.speed * 2.237) : 0;
        const destinationTemp = destinationData.main ? Math.floor(destinationData.main.temp - 273.15) : 0;
    
        // Cyclist Recommendations
        if (selectedVehicle === "Cyclist") {
          let cyclistMessage = "Recommendations for Cyclists:\n";
    
          if (startWindSpeed > 20 || destinationWindSpeed > 20) {
            cyclistMessage += "- Be cautious of high winds.\n";
          }
          if (startTemp < 0 || destinationTemp < 0) {
            cyclistMessage += "- Carry warm clothing.\n";
          }
          if (startData.weather[0].main.includes("Rain") || destinationData.weather[0].main.includes("Rain")) {
            cyclistMessage += "- Carry a raincoat.\n";
          }
          if (startWindSpeed > 30 || destinationWindSpeed > 30) {
            cyclistMessage += "- Too dangerous to travel due to extreme winds.\n";
          }
    
          setRecommendation(cyclistMessage);
        }
    
        // Car Recommendations
        if (selectedVehicle === "Car") {
          let carMessage = "Recommendations for Car Travel:\n";
    
          if (startWindSpeed > 20 || destinationWindSpeed > 20) {
            carMessage += "- Be cautious of high winds; they may reduce vehicle stability.\n";
          }
          if (startData.weather[0].main.includes("Rain") || destinationData.weather[0].main.includes("Rain")) {
            carMessage += "- Roads may be slippery due to rain. Drive carefully.\n";
          }
          if (startData.weather[0].main.includes("Fog") || destinationData.weather[0].main.includes("Fog")) {
            carMessage += "- Low visibility due to fog. Use fog lights and reduce speed.\n";
          }
          if (startTemp < 0 || destinationTemp < 0) {
            carMessage += "- Check tire pressure and carry emergency supplies for freezing temperatures.\n";
          }
          if (startTemp > 35 || destinationTemp > 35) {
            carMessage += "- Ensure your car's cooling system is functioning properly for high temperatures.\n";
          }
    
          setRecommendation(carMessage);
        }
      } else {
        setRecommendation("Unable to fetch weather data for one or both locations.");
      }

      // Fetch road disruptions
      const roadDisruptionData = await fetchRoadDisruptions();
      setRoadDisruptions([roadDisruptionData]);
    };
  
    return (
      <section className="vehicleWeather">
        <h2 className="vehicleTitle">Choose Your Mode of Travel</h2>
        <div className="vehicleButtons">
          <button
            className={`vehicleButton ${selectedVehicle === "Cyclist" ? "active" : ""}`}
            onClick={() => setSelectedVehicle("Cyclist")}
          >
            Cyclist
          </button>
          <button
            className={`vehicleButton ${selectedVehicle === "Car" ? "active" : ""}`}
            onClick={() => setSelectedVehicle("Car")}
          >
            Car
          </button>
          <button
            className={`vehicleButton ${selectedVehicle === "Train" ? "active" : ""}`}
            onClick={() => setSelectedVehicle("Train")}
          >
            Train
          </button>
        </div>
  
        <div className="vehicleInfo">
          {selectedVehicle === "Cyclist" && (
            <div className="cyclistInfo">
              <h2>Cyclist Information</h2>
              <form className="routeForm" onSubmit={handleRouteSubmit}>
                <div className="locationInput">
                  <label htmlFor="startPoint"><h3>Starting Point</h3></label>
                  <input
                    type="text"
                    id="startPoint"
                    placeholder="Enter location"
                    className="inputField"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                  />
                </div>
                <div className="locationInput">
                  <label htmlFor="destination"><h3>Destination:</h3></label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter location"
                    className="inputField"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <button type="submit" className="getWeather">
                  <h3>Get Route Weather</h3>
                </button>
              </form>

              {/* Display weather data for both locations */}
              {startWeather && destinationWeather && (
              <div className="routeWeatherContainer">
                {/* Starting Point Weather */}
                <div className="routeWeatherSection">
                  <h4 className="routeLocationHeader">Location: {startPoint}</h4>
                  <div className="routeWeatherDetails">
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle">Visibility</p>
                      <p className="routeWeatherValue">{(startWeather.visibility / 1609).toFixed(1)} mi</p>
                      <p className="routeWeatherDesc">Perfectly clear view</p>
                    </div>
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle"> Forecast</p>
                      <p className="routeWeatherValue">{startWeather.weather[0].main}</p>
                    </div>
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle"> Wind Speed</p>
                      <p className="routeWeatherValue">{Math.floor(startWeather.wind.speed * 2.237)} mph</p>
                    </div>
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle">Feels Like</p>
                      <p className="routeWeatherValue">{Math.floor(startWeather.main.feels_like - 273.15)}°C</p>
                      <p className="routeWeatherDesc">Actual: {Math.floor(startWeather.main.temp - 273.15)}°C</p>
                    </div>
                  </div>
                </div>

                {/* Destination Weather */}
                <div className="routeWeatherSection">
                  <h4 className="routeLocationHeader">Location: {destination}</h4>
                  <div className="routeWeatherDetails">
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle"> Visibility</p>
                      <p className="routeWeatherValue">{(destinationWeather.visibility / 1609).toFixed(1)} mi</p>
                      <p className="routeWeatherDesc">Perfectly clear view</p>
                    </div>
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle">Forecast</p>
                      <p className="routeWeatherValue">{destinationWeather.weather[0].main}</p>
                    </div>
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle"> Wind Speed</p>
                      <p className="routeWeatherValue">{Math.floor(destinationWeather.wind.speed * 2.237)} mph</p>
                    </div>
                    <div className="routeWeatherCard">
                      <p className="routeWeatherTitle">Feels Like</p>
                      <p className="routeWeatherValue">{Math.floor(destinationWeather.main.feels_like - 273.15)}°C</p>
                      <p className="routeWeatherDesc">Actual: {Math.floor(destinationWeather.main.temp - 273.15)}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
              {/* Display cyclist-specific recommendations */}
              {recommendation && (
                <div className="recommendation">
                  <h4>Recommendations for Cyclists:</h4>
                  <p>{recommendation}</p>
                </div>
              )}
            </div>
          )}
  
          {selectedVehicle === "Car" && (
            <div className="carInfo">
              <h2>Car Information</h2>
              <form className="routeForm" onSubmit={handleRouteSubmit}>
                <div className="locationInput">
                  <label htmlFor="startPoint"><h3>Starting Point</h3></label>
                  <input
                    type="text"
                    id="startPoint"
                    placeholder="Enter location"
                    className="inputField"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                  />
                </div>
                <div className="locationInput">
                  <label htmlFor="destination"><h3>Destination:</h3></label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter location"
                    className="inputField"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <button type="submit" className="getWeather">
                  <h3>Get Route Weather</h3>
                </button>
              </form>
  
              {/* Display weather data for both locations */}
              {startWeather && destinationWeather && (
                <div className="routeWeather">
                  <h4>Weather at Starting Point ({startPoint}):</h4>
                  <p>Visibility: {startWeather.visibility / 1000} km</p>
                  <p>Forecast: {startWeather.weather[0].main}</p>
                  <p>Wind Speed: {Math.floor(startWeather.wind.speed * 2.237)} mph</p>
                  <p>Feels Like: {Math.floor(startWeather.main.feels_like - 273.15)}°C</p>
  
                  <h4>Weather at Destination ({destination}):</h4>
                  <p>Visibility: {destinationWeather.visibility / 1000} km</p>
                  <p>Forecast: {destinationWeather.weather[0].main}</p>
                  <p>Wind Speed: {Math.floor(destinationWeather.wind.speed * 2.237)} mph</p>
                  <p>Feels Like: {Math.floor(destinationWeather.main.feels_like - 273.15)}°C</p>
                </div>
              )}
  
              {/* Display car-specific recommendations */}
              {recommendation && (
                <div className="recommendation">
                  <h4>Recommendations for Car Travel:</h4>
                  <p>{recommendation}</p>
                </div>
              )}
  
              {/* Fetch and display road disruptions */}
              <div className="roadConditions">
              <h4>Road Conditions:</h4>
              {roadDisruptions.length > 0 ? (
                roadDisruptions.map((road) => (
                  <div key={road.road}>
                    <h5>{road.road}</h5>
                    {road.disruptions.length > 0 ? (
                      <ul>
                        {road.disruptions.map((disruption, index) => (
                          <li key={index}>
                            <strong>{disruption.category}</strong>: {disruption.description}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No disruptions reported.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>Loading road conditions...</p>
              )}
            </div>
            </div>
          )}
  
          {selectedVehicle === "Train" && (
            <div className="trainInfo">
              <h3>Train Information</h3>
              <p>Train information will be integrated later using the TFL API.</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  

  return (
    <>
      <Header />
      <div className="weatherContent">
        <CurrentWeather />
        <WeatherMetrics />
      </div>
      <VehicleWeather />
    </>
  );
};

export default WeatherRoute;
