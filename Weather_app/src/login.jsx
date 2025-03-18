import './Login.css'
import google_icon from "./assets/google.svg"
import facebook_icon from "./assets/facebook.svg"
import logo from "/public/rainy-day.png"

function Login() {
    return (
        <>
            <div className='card'>
                <div className='weatherLogo'>
                    <img src={logo} alt="logo"/>
                    <h2>Weatherly</h2>
                </div>

                <h1>Sign in</h1>

                <div className='inputs'>
                    <p>Email</p>
                    <input type="text" placeholder='******@anymail.com' />

                    <p>Password</p>
                    <input type="text" placeholder='Enter your password' />
                </div>

                <button>Sign in</button>

                <div className="divider">or</div> 

                <div className='altOptions'>
                    <button>
                        <img src={google_icon} alt="google logo" />
                        Sign in with google
                    </button>

                    <button>
                        <img src={facebook_icon}  alt="facebook logo"/>
                        Sign in with facebook
                    </button>
                    
                </div>

                <h3>Don't have an account? <span><a href="#">Sign Up</a></span></h3>

            </div>
        
        </>
    )
}


export default Login