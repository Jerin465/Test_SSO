import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../../authConfig";
// import { useMsal } from "@azure/msal-react";
import { useMsal, useAccount } from "@azure/msal-react";
import { data } from "../../config";
import "../../App.css";
import BackgroundImage from "../../assets/images/bg.png";

export default function LandingPage() {
  // const { instance } = useMsal();
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const navigate = useNavigate();
  function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  }
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
