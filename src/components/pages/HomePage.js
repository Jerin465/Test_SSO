import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { loginRequest,googleConfig } from "../../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useGoogleLogout } from 'react-google-login';


const clientId = googleConfig.auth.clientId;

export default function HomePage() {
    const { instance, accounts, inProgress } = useMsal();
    const navigate = useNavigate();
    const userData =JSON.parse(localStorage.getItem('userData'));
    function handleLogout() {
        instance.logoutPopup().then(resp => navigate("/")).catch(e => {
            console.error(e);
            localStorage.clear();
        });
    }

    const { signOut } = useGoogleLogout({
        clientId
      });
    
    return (
        <div className="text-center bg-gray">
            <h1 className="main-title home-page-title">welcome  {userData&&userData.displayName}</h1>
            <h3 className="home-page-title">Successfully logged In</h3>
            <Link to="/">
                <button className="primary-button" onClick={handleLogout}>Log out</button>
            </Link>
            <Link to="/">
                <button className="primary-button" onClick={signOut}>Google Log out</button>
            </Link>
        </div>
    )
}
