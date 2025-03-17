import { useState } from 'react';
import './App.css'
import Axios from 'axios';


// ! Dont delete
// fetch("Url")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   })



function App() {
  // let ApiKey = "278b506dd020c8ea4a386833fc15488d"   // Add you api key here

  const [weatherDetails, setweatherDetails] = useState(null)

  const fetchData =() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${ApiKey}`).then((res) => {
      setweatherDetails(res.data)
      // console.log(res.data)
    })
  
  }

  


  return (
    <>
      <button onClick={fetchData} > Get Location</button>
        <div className='details'>
          <h2>Location : London</h2>
          <h2>Temp : {weatherDetails?.main.temp}</h2>
          <h2>Pressure : {weatherDetails?.main.pressure}</h2>
          <h2>feels Like : {weatherDetails?.main.feels_like}</h2>
        </div>

    </>
  )
}

export default App
