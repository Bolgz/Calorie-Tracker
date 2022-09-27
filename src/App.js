import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as utilities from "./Utilities/FireStoreUtilities.js";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/Navigation/NavigationBar";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

/**
 * Firebase configuration (needs to go in .env file)
 */
const firebaseConfig = {
  apiKey: "AIzaSyCOjebQFkKFmO6H0YPVgOrLEvbg84ructA",
  authDomain: "calorie-tracker-f7573.firebaseapp.com",
  projectId: "calorie-tracker-f7573",
  storageBucket: "calorie-tracker-f7573.appspot.com",
  messagingSenderId: "741522340367",
  appId: "1:741522340367:web:3bfd43003df8e0b7e5817a",
  measurementId: "G-110GVQCCLL",
};

//Initialise firebase application
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

/**
 * @return Appropriate page depending on login status (uses react router)
 */
function App() {
  //Is the user currently logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Using useEffect to check if the user is logged in
  useEffect(() => {
    //Checks if current user is logged in
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Checks if user is in Firestore database
        utilities.getUser(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid, user.displayName);
          }
        });

        //User is logged in
        setIsLoggedIn(true);
      } else {
        //User is not logged in
        setIsLoggedIn(false);
      }
    });
  }, []);

  //If user is logged in render Home page and Navigation bar
  if (isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavigationBar /> <Home />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
    //User is not logged in, only allow access to login and signup pages
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/**Redirect user to login page if trying to access resitricted content */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
