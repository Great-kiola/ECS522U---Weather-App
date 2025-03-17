import './Login.css'
import google_icon from "./assets/google.svg"
import facebook_icon from "./assets/facebook.svg"

function Login() {
    return (
        <>
            <div className='card'>
                <h1>Sign in</h1>

                <div className='inputs'>
                    <p>Email</p>
                    <input type="text" placeholder='******@anymail.com' />

                    <p>Password</p>
                    <input type="text" placeholder='Enter your password' />
                </div>

                <button>Sign in</button>
            </div>

            <img src={google_icon} alt="" />
            <img src={facebook_icon} alt="" />
        
        </>
    )
}


export default Login