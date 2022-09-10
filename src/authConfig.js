
export const msalConfig = {
    auth: {
        clientId: "5f22d9a2-7be4-4f31-9aec-5e86edd026e8",
        authority: "https://login.microsoftonline.com/0abcb1ac-22a3-4acf-a24f-b2d95286a1a5", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
   };
   
   // Add the endpoints here for Microsoft Graph API services you'd like to use.
   export const graphConfig = {
       graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
   };