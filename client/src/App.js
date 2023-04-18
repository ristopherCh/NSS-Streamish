import React, { useState, useEffect } from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { onLoginStatusChange, me } from "./modules/authManager";
import { Spinner } from "reactstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  if (isLoggedIn == null) {
    return <Spinner className="app-spinner dark" />
  }

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </Router>
    </div>
  );
}

export default App;


//Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnNzLXN0cmVhbWlzaC04MjgyOCIsImF1ZCI6Im5zcy1zdHJlYW1pc2gtODI4MjgiLCJhdXRoX3RpbWUiOjE2ODE4NDE1NDQsInVzZXJfaWQiOiJ4NW1KQ0NnMWJqYkRraDh6YXdJRjJFSHN6ZlkyIiwic3ViIjoieDVtSkNDZzFiamJEa2g4emF3SUYyRUhzemZZMiIsImlhdCI6MTY4MTg0NzA1MSwiZXhwIjoxNjgxODUwNjUxLCJlbWFpbCI6Im93bEBvd2wuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm93bEBvd2wuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.H1q5gZL0SARBfVWRGtUmvzolGkf2BNAj91ShyLlhIQXh_iu6kflVpG_jVyB7YPnD1u-hdc2l1q4Eon-ZE4jRbvqNH5woTwvZQdSZBhXKOCZYcunPQ_FEjBDzIj1r0oDRiJ9jSJYOxlcgiJBo2XlGazqyIKcVZjSjFPqwQzFhWTbUgG3Cpl7aEnkd7GIdFzUS2amjHAXjH6EYErqcVwhY-8wRO8byENc3MbrqK1Ccp4Cf-c9MqDWlSXg86KsvJAef40LgcNO6I6GASFv_mH1Yaq80WRDrVoO0-MS5ynqrMnb2LPEwTcRntdL3SyJyHbY8Xqz26y9Lch-kMVVYntIrGw