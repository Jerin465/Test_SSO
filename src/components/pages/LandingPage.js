import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest,googleConfig } from "../../authConfig";
// import { useMsal } from "@azure/msal-react";
import { useMsal, useAccount } from "@azure/msal-react";
import { data } from "../../config";
import "../../App.css";
import BackgroundImage from "../../assets/images/bg.png";
import { useGoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';



export default function LandingPage() {
  // const { instance } = useMsal();
  const clientId = googleConfig.auth.clientId;
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const navigate = useNavigate();
  function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
    const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      accessType: 'Testing',
    });
 };
 gapi.load('client:auth2', initClient);
  }

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    if (res) {
      data.map((_x) => {
        if (res.profileObj.email == _x.username) navigate("/home");
      });
      // callMsGraph(response.accessToken).then((result) => {
      // });
    }
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'Testing',
    cookiePolicy:'single_host_origin'
  });


  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: ["User.Read"],
          account: account,
        })
        .then((response) => {
          if (response) {
            data.map((_x) => {
              if (response.account.username == _x.username) navigate("/home");
            });
            // callMsGraph(response.accessToken).then((result) => {
            // });
          }
        });
    }
  }, [account, instance]);
  return (
    <header style={HeaderStyle}>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button">log in</button>
        </Link>
      </div>
      <div className="buttons text-center">
        <Link to="">
          <button
            className="primary-button"
            id="reg_btn"
            onClick={() => handleLogin(instance)}
          >
            <span>Continue With Microsoft </span>
          </button>
        </Link>
        <Link to="">
          <button
            className="primary-button"
            id="reg_btn"
            onClick={signIn}
          >
            <span>Continue With Google </span>
          </button>
        </Link>
      </div>
    </header>
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
