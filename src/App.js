import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import * as utilities from "./Utilities/FireStoreUtilities.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import Account from "./Components/Pages/Account/Account";
import Goals from "./Components/Pages/Goals/Goals";
import Progress from "./Components/Pages/Progress/Progress";

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

  //Has the user previously activated a diet
  const [hasChosenDiet, setHasChosenDiet] = useState(false);

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

        const auth = getAuth();

        //Set up a document listener to see if user activates a diet
        // eslint-disable-next-line
        const unsub = onSnapshot(
          doc(getFirestore(), "users", auth.currentUser.uid),
          (doc) => {
            setHasChosenDiet(doc.data().hasActiveDiet);
          }
        );

        utilities.hasActiveDiet(user.uid).then((diet) => {
          if (diet) {
            setHasChosenDiet(true);
          }
        });
      } else {
        //User is not logged in
        setIsLoggedIn(false);
      }
    });
  }, []);

  //If user is logged & has a chosen diet render Home page and Navigation bar
  if (isLoggedIn && hasChosenDiet) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    );
  }
  //If user is logged & has not chosen diet limit application access to goals page
  if (isLoggedIn && !hasChosenDiet) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/**Redirect user to goals page if trying to access resitricted content */}
        <Route path="/" element={<Goals />} />
        <Route path="/account" element={<Goals />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/progress" element={<Goals />} />
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
          <Route path="/account" element={<Login />} />
          <Route path="/goals" element={<Login />} />
          <Route path="/progress" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
