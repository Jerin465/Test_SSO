import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest, googleConfig } from "../../authConfig";
// import { useMsal } from "@azure/msal-react";
import { useMsal, useAccount } from "@azure/msal-react";
import { data } from "../../config";
import "../../App.css";
import BackgroundImage from "../../assets/images/bg.png";
import { useGoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { callMsGraph } from "../../Service/graph";




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
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }

  const onSuccess = (res) => {
    if (res) {
      data.map((_x) => {
        if (res.profileObj.email == _x.username) {
          console.log(_x.userType);
          if (_x.userType == 1) {
            navigate("/admin")
          }
          if (_x.userType == 2) {
            navigate("/home")
          }
        };
      });
      // callMsGraph(res.accessToken).then((result) => {
      //   console.log('Login Success: currentUser:', result);

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
    accessType: 'offline',
    cookiePolicy: 'single_host_origin'
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
            console.log(response);

            data.map((_x) => {
              if (response.account.username == _x.username) {
                if (_x.userType == 2) {
                  navigate("/home")
                }
                if (_x.userType == 1) {
                  navigate("/admin")
                }
              };
            });
            callMsGraph(response.accessToken).then((result) => {
              localStorage.setItem('userData', JSON.stringify(result))
            });
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
