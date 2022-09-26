import "./CalorieChart.css";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CalorieDoughnut from "./Doughnuts/CalorieDoughnut";
import MacroDoughnut from "./Doughnuts/MacroDoughnut";

ChartJS.register(ArcElement, Tooltip, Legend);

function CalorieChart() {
  const [selectedDate, setSelectedDate] = useState("");
  const [baseGoal, setBaseGoal] = useState(2000);
  const [food, setFood] = useState(100);
  const [exercise, setExercise] = useState(500);

  /**
   * Carbs and proteins contain 4 calories per grab, fats contain 9 calories per gram.
   * For 2000 calorie diet consisting of 40% carbs:
   * - 4 Calories per gram
   * - 40% of 2000 = 800 calories of carbs per day
   * - Total grams of carbs allowed per day = 800/4 = 200 grams
   */

  //Percentage of total calories that should be carbs
  const [baseCarbs, setBaseCarbs] = useState(0.4);
  //How many carbs in grams
  const [carbs, setCarbs] = useState(20);
  //Percentage of total calories that should be fats
  const [baseFats, setBaseFats] = useState(0.3);
  const [fats, setFats] = useState(60);
  //Percentage of total calories that should be proteins
  const [baseProteins, setBaseProteins] = useState(0.3);
  const [proteins, setProteins] = useState(100);

  function getTodaysDate() {
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    // eslint-disable-next-line
    const [year, month, day] = date.split("/");
    setSelectedDate(day + "/" + month + "/" + year);
  }

  useEffect(() => {
    getTodaysDate();
    // eslint-disable-next-line
  }, []);

  function handleDateSubmit(event) {
    return;
  }

  return (
    <div className="calorie-container">
      <h2 style={{ display: "inline" }}>Calories - </h2>
      <h3 style={{ display: "inline" }}>{selectedDate}</h3>
      <p>Remaining = Goal - Food + Exercise</p>

      <div className="date-selection">
        <Form onSubmit={handleDateSubmit} className="date-selection-form">
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="date"
              onChange={(e) => 1 * 1}
              id="calorieDate"
              className="date-selection-input"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="date-submit-button"
          >
            Go To Date
          </Button>
        </Form>
      </div>
      <div className="doughnut-container">
        <CalorieDoughnut food={food} exercise={exercise} baseGoal={baseGoal} />
        <MacroDoughnut
          carbs={carbs}
          fats={fats}
          proteins={proteins}
          baseCarbs={baseCarbs}
          baseFats={baseFats}
          baseProteins={baseProteins}
          baseGoal={baseGoal}
        />
      </div>
    </div>
  );
}

export default CalorieChart;
