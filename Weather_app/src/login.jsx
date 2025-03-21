// Package Import
import React , {useState, useEffect}  from 'react'

// Other imports
import './Login.css'
import google_icon from "./assets/google.svg"
import facebook_icon from "./assets/facebook.svg"
import logo from "/rainy-day.png"



export default function Login() {
 
    const initialForm = {
        email: "",
        pass: ""
    }

    // State management
    const [form, setForm] = useState(initialForm)
    const [formErr, setFormErr] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [isActive, setIsActive] = useState(false);


    const toggleClass = () => {
        setIsActive(!isActive);
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm({...form, [name]: value})
        // setForm((preform) => ({
        //     ...preform,
        //     [name]: value,
        // }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        setFormErr(validate(form))
        setIsSubmit(true)
        toggleClass()
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!values.password){
            errors.password = "Password is required"
        }

        if(!values.email){
            errors.email = "Email is required"
        } else if(!regex.test(values.email)) {
            errors.email = "Email is invalid"
        }
        return errors;
    }

    useEffect (() => {
        console.log(formErr)

        if (Object.keys(formErr).length === 0 && isSubmit){
            console.log(form)
        }
    }, [formErr]);

    return (
        <>
            <div className='card'>
                <div className='weatherLogo'>
                    <img src={logo} alt="logo"/>
                    <h2>Weatherly</h2>
                </div>

                <h1>Sign in</h1>

                <form onSubmit={handleSubmit}>
                    <div className='inputs'>

                    <div className='infoBar'>
                        <label>Email</label>
                        <p className='err'>{formErr.email}</p>
                    </div>
                    <input 
                        type="text" 
                        placeholder='******@anymail.com' 
                        className= {isActive ? 'inputErr' : ""}
                        name = "email"
                        value = {form.email}
                        onChange={handleChange}
                    />

                    <div className='infoBar'>
                        <label>Password</label>
                        <p className='err'> {formErr.password}</p>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Enter your password' 
                        className='inputErr' 
                        name = "pass"
                        value = {form.pass}
                        onChange={handleChange}
                    />

                    </div>

                    <button type='submit'> Sign in </button>
                    {/* <button type='submit' onClick={handleClick}>Sign in</button> */}

                </form>

                {/* Second Phase */}

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


// export default Login;