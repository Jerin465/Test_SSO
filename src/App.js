import React,{ useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import AdminPage from './components/pages/AdminPage'

import { useMsal, useAccount } from "@azure/msal-react";
// import { useHistory } from 'react-router-dom'
import {data} from'./config'

import './App.css'

export default function App() {
    // const { instance, accounts, inProgress } = useMsal();
    // const account = useAccount(accounts[0] || {});
  
   
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={ <LandingPage /> } />
                    <Route path="/login" element={ <LoginPage/> } />
                    <Route path="/register" element={ <RegisterPage/> } />
                    <Route path="/forget-password" element={ <ForgetPasswordPage /> } />
                    <Route path="/home" element={ <HomePage /> } />
                    <Route path="/admin" element={ <AdminPage /> } />

                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

const Footer = () => {
    return (
        <p className="text-center" style={ FooterStyle }>Designed & coded by <a href="https://octosignals.com" target="_blank" rel="">Octosignals</a></p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}