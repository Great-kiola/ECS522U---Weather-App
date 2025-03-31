// Package Import
import React, { useState, useEffect } from 'react';

// Firebase Imports
import { auth } from './firebase'; // confirm path
import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup 
} from 'firebase/auth';

// Other imports
import '../src/styling/Login.css';
import google_icon from './assets/google.svg';
import facebook_icon from './assets/facebook.svg';
import logo from '/rainy-day.png';
import { Link } from 'react-router-dom';

export default function Login() {
  const initialForm = {
    email: "",
    password: "" 
  };


  const [form, setForm] = useState(initialForm);
  const [formErr, setFormErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErr(validate(form));
    setIsSubmit(true);

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        setFormErr({ auth: error.message });
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google login success:", result.user);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
      });
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Facebook login success:", result.user);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Facebook sign-in error:", error.message);
      });
  };

  const validate = (value) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!value.password){
      errors.password = "Password is required";
    }

    if(!value.email){
      errors.email = "Email is required";
    } else if(!regex.test(value.email)) {
      errors.email = "Email is invalid";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErr).length > 0) {
      console.log(formErr);
    }
  }, [formErr]);

  return (
    <>
      <div className='card'>
        <div className='weatherLogo'>
          <img src={logo} alt="logo" />
          <h2>Weatherly</h2>
        </div>

        <h1 className='title'>Welcome Back!</h1>

        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='infoBar'>
              <label>Email</label>
              <p className={formErr.email ? 'err' : ''}>{formErr.email}</p>
            </div>

            <input 
              type="email" 
              placeholder='******@anymail.com' 
              className={formErr.email ? 'inputErr' : ''}
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <div className='infoBar'>
              <label>Password</label>
              <p className={formErr.password ? "err" : ''}> {formErr.password}</p>
            </div>

            <input 
              type="password" 
              placeholder='Enter your password' 
              className={formErr.password ? 'inputErr' : ''}
              name="password"
              value={form.password} 
              onChange={handleChange}
            />
          </div>

          <button type='submit'> Sign in </button>
          {formErr.auth && <p className='err'>{formErr.auth}</p>}
        </form>

        <div className="divider">or</div>

        <div className='altOptions'>
          <button onClick={googleSignIn}>
            <img src={google_icon} alt="google logo" />
            Sign in with Google
          </button>

          <button onClick={facebookSignIn}>
            <img src={facebook_icon} alt="facebook logo" />
            Sign in with Facebook
          </button>
        </div>

        <h3>Don't have an account? 
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
        </h3>
      </div>
    </>
  );
}


