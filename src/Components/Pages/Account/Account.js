import "./Account.css";
import SideBar from "../../Navigation/SideBar";
import * as utilities from "../../../Utilities/FireStoreUtilities.js";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Account() {
  //Holds active diet
  const [activeDiet, setActiveDiet] = useState({
    name: "Maintain Weight",
    calorie: 2000,
    carbIntake: 150,
    fatsIntake: 150,
    proteinsIntake: 150,
  });
  //Holds all food entries
  const [foodEntries, setFoodEntries] = useState([]);
  //Holds all weight entries
  const [weightEntries, setWeightEntries] = useState([]);
  //Holds all exercise entries
  const [exerciseEntries, setExerciseEntries] = useState([]);
  //Holds user email
  const [email, setEmail] = useState();
  //Holds user password
  const [password, setPassword] = useState();

  useEffect(() => {
    const auth = getAuth();
    //Get active diet from firebase
    utilities.getActiveDiet(auth.currentUser.uid).then((activeDiet) => {
      setActiveDiet(activeDiet);
    });
    //Get food entries from firebase
    utilities
      .getCalorieEntryList(auth.currentUser.uid)
      .then((calorieEntryList) => {
        setFoodEntries(calorieEntryList);
      });
    //Get food entries from firebase
    utilities
      .getWeightEntryList(auth.currentUser.uid)
      .then((weightEntryList) => {
        setWeightEntries(weightEntryList);
      });
    //Get exercise entries from firebase
    utilities
      .getExerciseEntryList(auth.currentUser.uid)
      .then((exerciseEntryList) => {
        setExerciseEntries(exerciseEntryList);
      });
  }, []);

  function createUserDataText() {
    let text = "";
    text += "FOOD ENTRIES:\n";
    foodEntries.forEach((foodEntry) => {
      text += "name: " + foodEntry._nameOfFood + "\n";
      text += "date: " + foodEntry._selectedDate + "\n";
      text += "calories: " + foodEntry._caloriesAmount + "\n";
      text += "Carbs: " + foodEntry._carbsAmount + "\n";
      text += "fats: " + foodEntry._fatAmount + "\n";
      text += "protein: " + foodEntry._proteinAmount + "\n\n";
    });

    text += "WEIGHT ENTRIES:\n";
    weightEntries.forEach((weightEntry) => {
      text += "date: " + weightEntry.date + "\n";
      text += "weight: " + weightEntry.weight + "kg\n\n";
    });

    text += "EXERCISE ENTRIES:\n";
    exerciseEntries.forEach((exerciseEntry) => {
      text += "name: " + exerciseEntry._nameOfExercise + "\n";
      text += "date: " + exerciseEntry._selectedDate + "\n";
      text += "calories burned: " + exerciseEntry._caloriesAmount + "kg\n\n";
    });

    downloadTxtFile(text);
  }

  function downloadTxtFile(userDataText) {
    const element = document.createElement("a");
    const file = new Blob([userDataText], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "userData.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  function deleteUser(event) {
    event.preventDefault();
    const auth = getAuth();
    utilities.deleteUser(auth.currentUser.uid, email, password);
  }

  return (
    <div className="account-flex-box">
      <SideBar />
      <div className="firestore-retrievables">
        <h1 className="account-page-title">Account Management</h1>
        <div className="account-page-container">
          <div className="active-diet-section">
            <h3>Active Diet</h3>
            <Table
              striped
              bordered
              hover
              size="sm"
              className="active-diet-table"
            >
              <thead>
                <tr>
                  <th>Diet Goal</th>
                  <th>Calories</th>
                  <th>Carbohydrates</th>
                  <th>Fats</th>
                  <th>Proteins</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{activeDiet.name}</td>
                  <td>{activeDiet.calorie} Kcal</td>
                  <td>{activeDiet.carbIntake}g</td>
                  <td>{activeDiet.fatsIntake}g</td>
                  <td>{activeDiet.proteinsIntake}g</td>
                </tr>
              </tbody>
            </Table>
            <p>
              You can change your active diet in the{" "}
              <Link to="/goals">Goals</Link> page.
            </p>
          </div>
        </div>
        <br />
        <div className="account-page-container">
          <h3>Request User Data</h3>
          <p>
            This will generate a downloadable file containing all your user
            data.
          </p>
          <Button
            variant="primary"
            onClick={createUserDataText}
            className="download-user-data-button"
          >
            Download Data
          </Button>
        </div>
        <br />
        <div className="account-page-container">
          <h3>Delete Account</h3>
          <p>
            This will delete your calorie-tracker account and all associated
            data. Please enter your credentials to delete your account.
          </p>
          <Form onSubmit={deleteUser}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Enter your email"}
              id="email"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter your password"}
              id="password"
            />
            <br />
            <Button
              variant="primary"
              type="submit"
              className="download-user-data-button"
            >
              Delete Account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Account;
