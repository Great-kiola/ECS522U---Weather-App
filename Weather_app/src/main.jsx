import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './styling/index.css'
import App from './App.jsx'
import Login from './login.jsx'
import SignUp from './pages/signUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
)