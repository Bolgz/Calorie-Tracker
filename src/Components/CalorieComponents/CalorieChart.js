import "./CalorieChart.css";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Form from "react-bootstrap/Form";
import CalorieDoughnut from "./Doughnuts/CalorieDoughnut";
import MacroDoughnut from "./Doughnuts/MacroDoughnut";
import CalorieEntryForm from "./Forms/CalorieEntryForm";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";
import CalorieEntryList from "./CalorieEntryList";
import * as ReactDOM from "react-dom";
import ExerciseEntryForm from "./Forms/ExerciseEntryForm";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * @return Doughnuts, entry forms and entries list
 */
function CalorieChart() {
  //Currently selected date
  const [selectedDate, setSelectedDate] = useState("");
  //Calorie daily goal
  const [baseGoal, setBaseGoal] = useState(2000);
  //Calories consumed on selected day
  const [calories, setCalories] = useState(0);

  /**
   * How to calculate macro allowance:
   * Carbs and proteins contain 4 calories per grab, fats contain 9 calories per gram.
   * For 2000 calorie diet consisting of 40% carbs:
   * - 4 Calories per gram
   * - 40% of 2000 = 800 calories of carbs per day
   * - Total grams of carbs allowed per day = 800/4 = 200 grams
   */

  //Percentage of total calories that should be carbs
  const [baseCarbs, setBaseCarbs] = useState(0.4);
  //Percentage of total calories that should be fats
  const [baseFats, setBaseFats] = useState(0.3);
  //Percentage of total calories that should be proteins
  const [baseProteins, setBaseProteins] = useState(0.3);

  //Calorie entry object (list of objects)
  const [entryObject, setEntryObject] = useState([]);

  /**
   * @param entry The entry to be added to firebase and entry object
   */
  function addEntry(entry) {
    //Add entry to local list of object
    let copyObject = [...entryObject];
    copyObject.push(entry);
    setEntryObject(copyObject);

    //Add entry in firestore
    const auth = getAuth();
    utilities.addCalorieEntry(entry, auth.currentUser.uid);
  }

  /**
   * Get today's date
   */
  function getTodaysDate() {
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    const [year, month, day] = date.split("/");
    setSelectedDate(day + "/" + month + "/" + year);
  }

  /**
   * Called on inital page load. Retrieve entries from firebase & populate entry object
   */
  useEffect(() => {
    getTodaysDate();
    const auth = getAuth();
    utilities
      .getCalorieEntryList(auth.currentUser.uid)
      .then((entries) => populateCalorieEntryObject(entries));

    // eslint-disable-next-line
  }, []);

  /**
   * Adds each entry from entries to entryObject
   * @param entries Entries to be added to entryObject
   */
  function populateCalorieEntryObject(entries) {
    let entryList = [];
    entries.forEach((entry) => entryList.push(entry));
    setEntryObject(entryList);
  }

  /**
   * Removes entry from firebase & entryObject
   * @param entryToRemove Entry to be removed from firebase & entryObject
   */
  function removeCalorieEntry(entryToRemove) {
    //Remove entry from calorie entry object (locally)
    let copyEntries = entryObject.filter(
      (entry) =>
        !(
          entry._selectedDate === entryToRemove._selectedDate &&
          entry._proteinAmount === entryToRemove._proteinAmount &&
          entry._nameOfFood === entryToRemove._nameOfFood &&
          entry._fatAmount === entryToRemove._fatAmount &&
          entry._carbsAmount === entryToRemove._carbsAmount &&
          entry._caloriesAmount === entryToRemove._caloriesAmount
        )
    );
    setEntryObject(copyEntries);

    //Remove entry from firestore
    const auth = getAuth();
    utilities.removeCalorieEntry(entryToRemove, auth.currentUser.uid);
  }

  /**
   * Changes the currently selected date
   * @param event The event retrieved on form submission
   */
  function handleDateSubmit(event) {
    event.preventDefault();
    const selectedFormDate = ReactDOM.findDOMNode(
      document.getElementById("calorieDate")
    ).value;
    const [year, month, day] = selectedFormDate.split("-");
    setSelectedDate(day + "/" + month + "/" + year);
  }

  return (
    <div>
      <div className="calorie-container">
        <h2 style={{ display: "inline" }}>Calories - </h2>
        <h3 style={{ display: "inline" }}>{selectedDate}</h3>
        <p>Remaining = Goal - Food + Exercise</p>

        <div className="date-selection">
          <Form className="date-selection-form">
            <Form.Group className="mb-3">
              <Form.Label className="date-selection-input-lable">
                <h6>Select Date</h6>
              </Form.Label>
              <Form.Control
                required
                type="date"
                id="calorieDate"
                className="date-selection-input"
                onChange={handleDateSubmit}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="doughnut-container">
          <CalorieDoughnut
            calories={calories}
            baseGoal={baseGoal}
            entries={entryObject}
            selectedDate={selectedDate}
          />
          <MacroDoughnut
            baseCarbs={baseCarbs}
            baseFats={baseFats}
            baseProteins={baseProteins}
            baseGoal={baseGoal}
            entries={entryObject}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      <CalorieEntryForm selectedDate={selectedDate} addEntry={addEntry} />
      <ExerciseEntryForm selectedDate={selectedDate} addEntry={addEntry} />
      <CalorieEntryList
        selectedDate={selectedDate}
        entries={entryObject}
        removeEntry={removeCalorieEntry}
      />
    </div>
  );
}

export default CalorieChart;
