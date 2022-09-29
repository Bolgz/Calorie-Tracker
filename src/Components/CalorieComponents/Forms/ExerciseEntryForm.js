import "./ExerciseEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";

/**
 * @param props Props passed down from the CalorieChart.js component
 * @return The form for entering exercises
 */
function ExerciseEntryForm(props) {
  //Currently selected date
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  //Form fields
  const [nameOfExercise, setNameOfExercise] = useState();
  const [caloriesAmount, setCaloriesAmount] = useState();

  /**
   * Adds exercise entry to entryObject in CalorieChart.js
   * @param event Form submission event
   */
  function handleExerciseEntry(event) {
    event.preventDefault();
    //Create new exercise entryObject
    const entryObject = {
      _selectedDate: selectedDate,
      _nameOfExercise: nameOfExercise,
      _caloriesAmount: caloriesAmount,
    };

    //Adds food entry to entryObject in CalorieChart.js
    props.addExerciseEntry(entryObject);

    //Reset form fields
    ReactDOM.findDOMNode(document.getElementById("exerciseName")).value = "";
    ReactDOM.findDOMNode(
      document.getElementById("calorieAmountExercise")
    ).value = "";
  }

  return (
    <div className="exercise-entry">
      <Form
        onSubmit={handleExerciseEntry}
        className="exercise-entry-form"
        autoComplete="off"
      >
        <h3 className="exercise-entry-form-field">Add Exercise Entry</h3>
        <Form.Group className="mb-3">
          <Form.Control
            required
            type="text"
            onChange={(e) => {
              setNameOfExercise(e.target.value);
              setSelectedDate(props.selectedDate);
            }}
            placeholder={"Name of Exercise"}
            id="exerciseName"
            className="exercise-entry-form-field"
          />
          <Form.Control
            required
            type="number"
            onChange={(e) => setCaloriesAmount(e.target.value)}
            placeholder={"Amount of Calories"}
            id="calorieAmountExercise"
            className="exercise-entry-form-field"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="exercise-entry-form-field"
        >
          Add Entry
        </Button>
      </Form>
    </div>
  );
}

export default ExerciseEntryForm;
