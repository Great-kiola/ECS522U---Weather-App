import React, { useCallback } from "react";
import "../src/styling/style.css";
import guage from "./assets/gauge-medium-svgrepo-com.svg";
import speed from "./assets/speed-meter-svgrepo-com.svg";
import humidity from "./assets/humidity-svgrepo-com.svg";
import pin from "./assets/location-pin-svgrepo-com.svg";
import Axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

// Main WeatherRoute Component
const WeatherRoute = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState(""); // State for user input
  const [weatherDetails, setweatherDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Cyclist");
  const [optionData, setOptionData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const API_key = "d4c1f3085a13b8325c6db3814dc45b81"; // Correct API key

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

  const fetchOptionData = async (option) => {
    try {
      if (option === "Car") {
        // Fetch road disruptions from TFL API
        const tflUrl = `https://api.tfl.gov.uk/Road/All/Disruption?startDate=2025-03-01&endDate=2025-03-30`;
        const tflResponse = await fetch(tflUrl);
        const tflData = await tflResponse.json();

        // Log the TFL API response for debugging
        console.log("TFL API Response:", tflData);

        // Filter for M25 road disruptions
        const m25Conditions = tflData
          .filter((disruption) => disruption.roadName === "M25")
          .map((disruption) => ({
            roadName: disruption.roadName,
            description: disruption.description,
            severity: disruption.severity,
          }));

        // Log the filtered M25 conditions for debugging
        console.log("M25 Conditions:", m25Conditions);

        setOptionData({ roadConditions: m25Conditions });
      } else {
        // Fetch weather data for other options
        const city = "London"; // Replace with dynamic city if needed
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
        const response = await fetch(url);
        const data = await response.json();

        const optionData = {
          temperature: data.main.temp,
          condition: data.weather[0].description,
          windSpeed: data.wind.speed,
          rain: data.rain ? data.rain["1h"] || 0 : 0,
        };

        setOptionData(optionData);
      }
    } catch (error) {
      console.error("Error fetching option data:", error);
    }
  };

  useEffect(() => {
    fetchOptionData(selectedOption);
  }, [selectedOption]);

  const search = useCallback(() => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`
    )
      .then((res) => {
        setweatherDetails(res.data); // Update weather details state
        console.log(res.data); // Log the response for debugging

        // Fetch the 5-day forecast
        Axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_key}`
        )
          .then((forecastRes) => {
            const forecastList = forecastRes.data.list.filter((item, index) =>
              index % 8 === 0 // Get one forecast per day (every 8th item)
            );
            setForecastData(forecastList); // Update forecast data state
            console.log(forecastList); // Log the forecast data for debugging
          })
          .catch((error) => {
            console.error("Error fetching forecast data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("City not found. Please try again.");
      });
  }, [city, API_key]); // Memoize the function to avoid unnecessary re-renders

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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
          <li
            className={`navItem ${selectedOption === "General" ? "active" : ""}`}
            onClick={() => setSelectedOption("General")}
          >
            General
          </li>
          <li
            className={`navItem ${selectedOption === "Cyclist" ? "active" : ""}`}
            onClick={() => setSelectedOption("Cyclist")}
          >
            Cyclist
          </li>
          <li
            className={`navItem ${selectedOption === "Train" ? "active" : ""}`}
            onClick={() => setSelectedOption("Train")}
          >
            Train
          </li>
          <li
            className={`navItem ${selectedOption === "Car" ? "active" : ""}`}
            onClick={() => setSelectedOption("Car")}
          >
            Auto Vehicle
          </li>
        </ul>
      </nav>
    </header>
  );

  const CurrentWeather = () => {
    const handleInputChange = (e) => {
      setCity(e.target.value); // Update city state on input change
    };

    return (
      <div className="currentWeather">
        <div className="weatherCard">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search for a different location"
              className="searchInput"
              value={city}
              onChange={handleInputChange} // Update city state
            />
            <button onClick={search} className="search--Btn">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4ec8eb5f912c3be897baec8ed140a2642e8f0c3?placeholderIfAbsent=true&Key=783f43a1f88d4776adadcdcf6ab220ed"
                alt="Search"
              />
            </button>
          </div>

          <div className="locationInfo">
            <div className="locationHeader">
              <img src={pin} alt="Location" className="locationIcon" />
              <h2 className="locationName">{weatherDetails?.name || "N/A"}</h2>
            </div>

            <time className="timestamp">{formattedDate}</time>
          </div>
          <div className="temperature">
            <div className="tempValue">
              <div className="val-num">
                <span className="tempNumber">
                  {weatherDetails?.main ? `${Math.floor(weatherDetails.main.temp)}` : "N/A"}
                </span>
                <div className="tempUnit">
                  <span className="degree">O</span>
                  <span className="celsius">C</span>
                </div>
              </div>

              <div className="weather-condtn">
                <p className="weatherCondition">
                  {weatherDetails?.weather ? weatherDetails.weather[0].main : "N/A"}
                </p>
              </div>
            </div>
            <div className="weatherMetrics">
              <div className="pressure">
                <img src={guage} alt="pressure" />
                <span>
                  {weatherDetails?.main ? weatherDetails.main.pressure : "N/A"} hPa
                </span>
              </div>

              <div className="pressure">
                <img src={humidity} alt="humidity" />
                <span>
                  {weatherDetails?.main ? weatherDetails.main.humidity : "N/A"}%
                </span>
              </div>

              <div className="pressure">
                <img src={speed} alt="speed" />
                <span>
                  {weatherDetails?.wind ? weatherDetails.wind.speed : "N/A"} km/hr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Weather Metrics Component
  const WeatherMetrics = () => {
    if (!weatherDetails || !weatherDetails.main || !weatherDetails.wind) {
      return <p>Loading metrics...</p>;
    }

    return (
      <div className="metricsGrid">
        {/* Sunrise & Sunset */}
        <div className="metricCard">
          <h3 className="metricTitle">Sunrise & Sunset</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Sunrise & Sunset Icon"
            className="metricIcon"
          />
          <div className="metricContent">
            <div className="metricRow">
              <span>
                {new Date(weatherDetails.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="metricRow">
              <span>
                {new Date(weatherDetails.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="metricCard">
          <h3 className="metricTitle">Humidity</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Humidity Icon"
            className="metricIcon"
          />
          <div className="metricContent">
            <span className="metricValue">{weatherDetails.main.humidity}%</span>
            <p className="metricNote">
              Dew Point: {weatherDetails.main.temp ? `${Math.round(weatherDetails.main.temp - 5)}°C` : "N/A"}
            </p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="metricCard">
          <h3 className="metricTitle">Wind Speed</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Wind Speed Icon"
            className="metricIcon"
          />
          <div className="metricContent">
            <span className="metricValue">{weatherDetails.wind.speed} mph</span>
          </div>
        </div>

        {/* Feels Like */}
        <div className="metricCard">
          <h3 className="metricTitle">Feels Like</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Feels Like Icon"
            className="metricIcon"
          />
          <div className="metricContent">
            <span className="metricValue">{Math.round(weatherDetails.main.feels_like)}°C</span>
            <p className="metricNote">
              Actual: {Math.round(weatherDetails.main.temp)}°C
            </p>
            <p className="metricNote">Wind is making it feel cooler</p>
          </div>
        </div>

        {/* Visibility */}
        <div className="metricCard">
          <h3 className="metricTitle">Visibility</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Visibility Icon"
            className="metricIcon"
          />
          <div className="metricContent">
            <span className="metricValue">
              {weatherDetails.visibility ? `${Math.round(weatherDetails.visibility / 1000)} km` : "N/A"}
            </span>
            <p className="metricNote">Perfectly clear view</p>
          </div>
        </div>

        {/* Pressure */}
        <div className="metricCard">
          <h3 className="metricTitle">Pressure</h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1143880fe42722dc31e18fd2cab9185f163a6244?placeholderIfAbsent=true&apiKey=783f43a1f88d4776adadcdcf6ab220ed"
            alt="Pressure Icon"
            className="metricIcon"
          />
          <div className="metricContent">
            <span className="metricValue">{weatherDetails.main.pressure} hPa</span>
            <p className="metricNote">Low</p>
          </div>
        </div>
      </div>
    );
  };

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

  const OptionSelector = () => (
    <div className="optionSelector">
      <button
        className={`optionButton ${
          selectedOption === "Cyclist" ? "active" : ""
        }`}
        onClick={() => setSelectedOption("Cyclist")}
      >
        Cyclist
      </button>
      <button
        className={`optionButton ${
          selectedOption === "Train" ? "active" : ""
        }`}
        onClick={() => setSelectedOption("Train")}
      >
        Train
      </button>
      <button
        className={`optionButton ${selectedOption === "Car" ? "active" : ""}`}
        onClick={() => setSelectedOption("Car")}
      >
        Car
      </button>
    </div>
  );

  const SelectedOptionContent = () => {
    const isCyclist = selectedOption === "Cyclist";
    const isCar = selectedOption === "Car";

    // Cyclist-specific road safety check
    const checkCyclistRoadSafety = () => {
      if (!optionData) return "Loading...";
      const { windSpeed, rain } = optionData;
      const isWet = rain && rain > 0;
      const isWindy = windSpeed > 20; // Example threshold for high wind speed

      if (isWet) {
        return "Roads are wet. Be cautious!";
      } else if (isWindy) {
        return "High winds detected. Ride carefully!";
      } else {
        return "Roads are safe for cycling.";
      }
    };

    // Car-specific road safety check
    const checkCarRoadSafety = () => {
      if (!optionData) return "Loading...";
      const { windSpeed, rain } = optionData;
      const isWet = rain && rain > 0;
      const isWindy = windSpeed > 20; // Example threshold for high wind speed

      if (isWet) {
        return "Roads are wet. Drive cautiously!";
      } else if (isWindy) {
        return "High winds detected. Drive carefully!";
      } else {
        return "Roads are safe for driving.";
      }
    };

    return (
      <div className="selectedOptionContent">
        <h2>{selectedOption} Weather Tracker</h2>
        {optionData ? (
          <div className="optionDetails">
            {/* Cyclist Section */}
            {isCyclist && (
              <>
                <p>Temperature: {optionData.temperature}°C</p>
                <p>Condition: {optionData.condition}</p>
                <p>Wind Speed: {optionData.windSpeed} km/hr</p>
                <div className="cyclistDetails">
                  <h3>Road Conditions</h3>
                  <p>Rain in the last hours: {optionData.rain || 0} mm</p>
                  <p>Road Status: {checkCyclistRoadSafety()}</p>
                </div>
              </>
            )}

            {/* Car Section */}
            {isCar && (
              <>
                <p>Temperature: {optionData.temperature}°C</p>
                <p>Condition: {optionData.condition}</p>
                <p>Wind Speed: {optionData.windSpeed} km/hr</p>
                <div className="cyclistDetails">
                  <h3>Road Conditions</h3>
                  {optionData.roadConditions && optionData.roadConditions.length > 0 ? (
                    <ul>
                      {optionData.roadConditions.map((road, index) => (
                        <li key={index}>
                          <p>
                            <strong>Road:</strong> {road.roadName}
                          </p>
                          <p>
                            <strong>Description:</strong> {road.description}
                          </p>
                          <p>
                            <strong>Severity:</strong> {road.severity}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No disruptions reported for M25.</p>
                  )}
                  <p>Road Status: {checkCarRoadSafety()}</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };

  return (
    <div className="gridContainer">
      {/* Navigation Bar */}
      <div className="navigationBar">
        <Header />
      </div>

      {/* General Information Section */}
      <div className="generalInfo">
        <div className="weatherCardContainer">
          <CurrentWeather />
          <OptionSelector />
          <SelectedOptionContent />
        </div>
      </div>

      <WeatherMetrics />
      {/* Weather Cards Section */}
      <div className="weatherCardsSection">
        <h3 className="forecastTitle">Weather for the next 5 days</h3>
        <div className="forecastGrid">
          {forecastData.length > 0 ? (
            forecastData.map((forecast, index) => (
              <div className="forecastDay" key={index}>
                <p>{new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</p>
                <img
                  className="forecastIcon"
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                />
                <p className="forecastTemp">{Math.round(forecast.main.temp)}°C</p>
              </div>
            ))
          ) : (
            <p>Loading forecast...</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default WeatherRoute;
