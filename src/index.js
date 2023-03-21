import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak('/keycloak.json');

keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
  if (authenticated) {
    console.log("User is authenticated");
  } else {
    console.log("User is not authenticated");
  }
});*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/*
Let initOptions={
  url:'http://localhost:8080/auth/',
  realm:'my_realm_client',
  clientId:'react_login_client',
  onload:'login-required'
}
Let keycloak=(initOPtions);

keycloak.init({onload: initOptions.onLoad}).success((auth)=>{
  if(!auth){
    window.location.reload();
  } else{
    console.info("Authnticatd");
  }
  localStorage.setItem("bearer-token",keycloak.token);
  loacatStorage.setItem("refresh-token,keycloak.refreshToken");
  console.log(keycloak.token);

  setTimeout(() =>{
    keycloak.updateToken(70).success((refreshed)=>{
      if (refreshed){console.debug("Token refreshed"+ refreshed);}
      else{console.debug("Token not refreshed valid for "+ Math.round(keycloak.tokenParsed.exp +keycloak.refreshToken));}

    }).error(()=>{console.error("Failed to refresh token");
  });
  },60000)
}).error(()=>{"Authentication failed");});



function CheckRoles(){
  const check = () =>{
    $.ajax({
      type: "GET",
      url: "http://localhost:9090/forAdmin",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer-token")
    },
    success: function (data1) {
      document.getElementById("admin").innerHTML = data1;
  },
  error: function (data1) {
    document.getElementById("admin").innerHTML = "you dont have authorization";
  }
});

   $.ajax({
      type: "GET",
      url: "http://localhost:9090/forUser",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer-token")
    },
    success: function (data2) {
      document.getElementById("user").innerHTML = data2 ;
  },
  error: function (data2) {
    document.getElementById("user").innerHTML = "you dont have authorization";
  }
});





*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
