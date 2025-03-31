// Package Import
import React, { useState, useEffect } from 'react';

// Firebase imports
import { auth } from '../firebase'; // Confirm the relative path is correct
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Other imports
import "../styling/signUp.css"
import google_icon from "../assets/google.svg";
import logo from "/rainy-day.png";
import { Link } from 'react-router-dom';

export default function SignUp() {

    const initialForm = {
        name: "",
        email: "",
        password: ""
    };

    const [form, setForm] = useState(initialForm);
    const [formErr, setFormErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormErr(validate(form));
        setIsSubmit(true);

        if (Object.keys(validate(form)).length === 0) {
            createUserWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential) => {
                    console.log('User signed up:', userCredential.user);
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.error('Signup error:', error.message);
                    setFormErr({ auth: error.message });
                });
        }
    };

    const googleSignUp = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google sign-up success:", result.user);
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Google sign-up error:", error.message);
            });
    };

    const validate = (value) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value.password) {
            errors.password = "Password is required";
        }

        if (!value.name) {
            errors.name = "Enter your name";
        }

        if (!value.email) {
            errors.email = "Email is required";
        } else if (!regex.test(value.email)) {
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

                <h1 className='title'>Create your account</h1>

                <div className='altOptions'>
                    <button onClick={googleSignUp}>
                        <img src={google_icon} alt="google logo" />
                        Sign up with Google
                    </button>
                </div>

                <div className="divider">or</div>

                <form onSubmit={handleSubmit}>
                    <div className='inputs'>

                        <div className='infoBar'>
                            <label>First Name</label>
                            <p className={formErr.name ? "err" : ''}> {formErr.name}</p>
                        </div>
                        <input
                            type="text"
                            placeholder='Enter your name'
                            className={formErr.name ? 'inputErr' : ''}
                            name="name"
                            value={form.name}
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

                    <button type='submit'> Sign Up </button>
                    {formErr.auth && <p className='err'>{formErr.auth}</p>}

                </form>

                <h3>Already have an account?
                    <span>
                        <Link to="/Login">Log in</Link>
                    </span>
                </h3>
            </div>
        </>
    );
}
