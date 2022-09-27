import "./CalorieEntryForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";

function CalorieEntryForm(props) {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);
  const [nameOfFood, setNameOfFood] = useState();
  const [caloriesAmount, setCaloriesAmount] = useState();
  const [carbsAmount, setCarbsAmount] = useState();
  const [fatAmount, setFatAmount] = useState();
  const [proteinAmount, setProteinAmount] = useState();

  function handleCalorieEntry(event) {
    event.preventDefault();
    const entryObject = {
      _selectedDate: selectedDate,
      _nameOfFood: nameOfFood,
      _caloriesAmount: caloriesAmount,
      _carbsAmount: carbsAmount,
      _fatAmount: fatAmount,
      _proteinAmount: proteinAmount,
    };

    props.addEntry(entryObject);

    ReactDOM.findDOMNode(document.getElementById("foodName")).value = "";
    ReactDOM.findDOMNode(document.getElementById("calorieAmount")).value = "";
    ReactDOM.findDOMNode(document.getElementById("carbsAmount")).value = "";
    ReactDOM.findDOMNode(document.getElementById("fatAmount")).value = "";
    ReactDOM.findDOMNode(document.getElementById("proteinAmount")).value = "";
  }

  return (
    <div className="calorie-entry">
      <Form onSubmit={handleCalorieEntry} className="calorie-entry-form">
        <h3 className="calorie-entry-form-field">
          Add Food Entry - {props.selectedDate}
        </h3>
        <Form.Group className="mb-3">
          <Form.Control
            required
            type="text"
            onChange={(e) => {
              setNameOfFood(e.target.value);
              setSelectedDate(props.selectedDate);
            }}
            placeholder={"Name of Food"}
            id="foodName"
            className="calorie-entry-form-field"
          />
          <Form.Control
            required
            type="number"
            onChange={(e) => setCaloriesAmount(e.target.value)}
            placeholder={"Amount of Calories"}
            id="calorieAmount"
            className="calorie-entry-form-field"
          />
          <Form.Control
            type="number"
            onChange={(e) => setCarbsAmount(e.target.value)}
            placeholder={"Amount of Carbs (grams)"}
            id="carbsAmount"
            className="calorie-entry-form-field"
          />
          <Form.Control
            type="number"
            onChange={(e) => setFatAmount(e.target.value)}
            placeholder={"Amount of Fat (grams)"}
            id="fatAmount"
            className="calorie-entry-form-field"
          />
          <Form.Control
            type="number"
            onChange={(e) => setProteinAmount(e.target.value)}
            placeholder={"Amount of Protein (grams)"}
            id="proteinAmount"
            className="calorie-entry-form-field"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="calorie-entry-form-field"
        >
          Add Entry
        </Button>
      </Form>
    </div>
  );
}

export default CalorieEntryForm;
