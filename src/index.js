import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig"

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render( <MsalProvider instance={msalInstance}><App /></MsalProvider>, document.getElementById('root'));
