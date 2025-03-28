import "./style.css";
import pin from "./assets/map-pin.png"

export default function App (){
  
  let username = "Jane Doe"


  return (
    <>

      {/* Search div */}

      <div className="search--bar">

        <div className="navigation">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>

          <h2>Hello, {username}</h2>
        </div>

        <div className="Search--input">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input 
            type="text" 
            placeholder="search for a different location"
            className="input--bar"
          />
        </div>

      </div>


      {/* Weather Details div */}

      <div className="main--weather--div">
        <div className="first--div">
          <div className="location--div">

            <div className="curr-location">
              <img src={pin} alt="location pin"/>
              <h2>Qmul, united Kingdom</h2>
              <span>Today, 12:30pm</span>
            </div>

            <div className="temperature--div">
              <h3>14c</h3>
              <h3>Mostly Cloudy</h3>
            </div>

            <div className="parameters--div">
              <div className="params">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-wash-eco"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 6l1.721 10.329a2 2 0 0 0 1.973 1.671h5.306m8.162 -6.972l.838 -5.028" /><path d="M3.486 8.965c.168 .02 .34 .033 .514 .035c.79 .009 1.539 -.178 2 -.5c.461 -.32 1.21 -.507 2 -.5c.79 -.007 1.539 .18 2 .5c.461 .322 1.21 .509 2 .5c.79 .009 1.539 -.178 2 -.5c.461 -.32 1.21 -.507 2 -.5c.79 -.007 1.539 .18 2 .5c.461 .322 1.21 .509 2 .5c.17 0 .339 -.014 .503 -.034" /><path d="M16 22s0 -2 3 -4" /><path d="M19 21a3 3 0 0 1 0 -6h3v3a3 3 0 0 1 -3 3z" /></svg>
                <h2>230hpa</h2>

              </div>
              <div className="params">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-archive"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" /><path d="M10 12l4 0" /></svg>
                <h2>30%</h2>
              </div>
              <div className="params">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-speedtest"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.636 19.364a9 9 0 1 1 12.728 0" /><path d="M16 9l-4 4" /></svg>

                <h2>12Km/hr</h2>
              </div>
            </div>

          </div>

          <div className="routes--div">

          </div>
          <div className="weather--div">

          </div>
        </div>

        <div className="second--div">
          <div className="layout">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div>
        </div>
      </div>
    
    </>
  )
}