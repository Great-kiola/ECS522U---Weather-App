// Package Import
import React , {useState, useEffect}  from 'react'


// Other imports
import '../signUp.css'
import google_icon from "../assets/google.svg"
import logo from "/rainy-day.png"

import { Link } from 'react-router-dom'



export default function Login() {
 
    const initialForm = {
        name: "",
        email: "",
        password: ""
    }

    // State management
    const [form, setForm] = useState(initialForm)
    const [formErr, setFormErr] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);


    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        setFormErr(validate(form))
        setIsSubmit(true)
    }

    

    const validate = (value) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!value.password){
            errors.password = "Password is required"
        }

        if (!value.name){
            errors.name = "Enter your name"
        }
        
        if(!value.email){
            errors.email = "Email is required"
        } else if(!regex.test(value.email)) {
            errors.email = "Email is invalid"
        }
        return errors;
    }

    useEffect (() => {
        if (Object.keys(formErr).length > 0) {
            console.log(formErr)
        }

        if (Object.keys(formErr).length === 0 && isSubmit){
            console.log(form)
            
            // window.location.href = "/";
        }
    }, [formErr, form, isSubmit]);

    return (
        <>

            <div className='card'>
                <div className='weatherLogo'>
                    <img src={logo} alt="logo"/>
                    <h2>Weatherly</h2>
                </div>

                <h1 className='title'>Create your account</h1>

                <div className='altOptions'>
                    <button>
                        <img src={google_icon} alt="google logo" />
                        Sign in with google
                    </button>
                </div>

                {/* Other login options */}
                <div className="divider">or</div> 


                <form onSubmit={handleSubmit}>
                    <div className='inputs'>

                    <div className='infoBar'>
                        <label>First Name</label>
                        <p className = {formErr.name ? "err" : ''}> {formErr.name}</p>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Enter your name' 
                        className={formErr.name ? 'inputErr' : ''} 
                        name = "name"
                        value = {form.name} 
                        onChange={handleChange}
                    />

                    <div className='infoBar'>
                        <label>Email</label>
                        <p className={formErr.email ? 'err' : ''}>{formErr.email}</p>
                    </div>
                    <input 
                        type="email" 
                        placeholder='******@anymail.com' 
                        className={formErr.email ? 'inputErr' : ''}
                        name = "email"
                        value = {form.email}
                        onChange={handleChange}
                    />

                    <div className='infoBar'>
                        <label>Password</label>
                        <p className = {formErr.password ? "err" : ''}> {formErr.password}</p>
                    </div>
                    <input 
                        type="password" 
                        placeholder='Enter your password' 
                        className={formErr.password ? 'inputErr' : ''} 
                        name = "password"
                        value = {form.password} 
                        onChange={handleChange}
                    />

                    

                    </div>

                    <button type='submit'> Sign in </button>

                </form>

                <h3>Already have an account? 
                    <span>
                        <Link to="/Login">Log in</Link>
                    </span>
                </h3>

            </div>
        
        </>
    )
}
