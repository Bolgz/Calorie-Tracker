import "./GoalsForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";

function GoalsForm(props) {
  const [startingWeight, setStartingWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [goalWeight, setGoalWeight] = useState();
  const [gender, setGender] = useState();

  function calculateRecommendations() {
    //Calculate calorie intake for maintenace, light and heavy weight loss (using BMR)
    if (gender === "Female") {
      const femaleMaintain =
        655.1 + 9.563 * startingWeight + 1.85 * height - 4.676 * age;
      const femaleLightLoss = femaleMaintain - 200;
      const femaleHeavyLoss = femaleMaintain - 450;

      //Create weight loss 'objects' that calculate macro intake
      const maintainObject = {
        name: "Maintain Weight",
        calorie: Math.round(femaleMaintain),
        carbIntake: Math.round((femaleMaintain * 0.4) / 4),
        fatsIntake: Math.round((femaleMaintain * 0.3) / 9),
        proteinsIntake: Math.round((femaleMaintain * 0.3) / 4),
      };

      const lightLossObject = {
        name: "Light Weight Loss",
        calorie: Math.round(femaleLightLoss),
        carbIntake: Math.round((femaleLightLoss * 0.4) / 4),
        fatsIntake: Math.round((femaleLightLoss * 0.3) / 9),
        proteinsIntake: Math.round((femaleLightLoss * 0.3) / 4),
      };

      const heavyLossObject = {
        name: "Heavy Weight Loss",
        calorie: Math.round(femaleHeavyLoss),
        carbIntake: Math.round((femaleHeavyLoss * 0.4) / 4),
        fatsIntake: Math.round((femaleHeavyLoss * 0.3) / 9),
        proteinsIntake: Math.round((femaleHeavyLoss * 0.3) / 4),
      };
      props.setDietRecommendations([
        maintainObject,
        lightLossObject,
        heavyLossObject,
      ]);
    } else {
      const maleMaintain =
        66.5 + 12.75 * startingWeight + 5.003 * height - 6.75 * age;
      const maleLightLoss = maleMaintain - 275;
      const maleHeavyLoss = maleMaintain - 500;

      //Create weight loss 'objects' that calculate macro intake
      const maintainObject = {
        name: "Maintain Weight",
        calorie: Math.round(maleMaintain),
        carbIntake: Math.round((maleMaintain * 0.4) / 4),
        fatsIntake: Math.round((maleMaintain * 0.3) / 9),
        proteinsIntake: Math.round((maleMaintain * 0.3) / 4),
      };

      const lightLossObject = {
        name: "Light Weight Loss",
        calorie: Math.round(maleLightLoss),
        carbIntake: Math.round((maleLightLoss * 0.4) / 4),
        fatsIntake: Math.round((maleLightLoss * 0.3) / 9),
        proteinsIntake: Math.round((maleLightLoss * 0.3) / 4),
      };

      const heavyLossObject = {
        name: "Heavy Weight Loss",
        calorie: Math.round(maleHeavyLoss),
        carbIntake: Math.round((maleHeavyLoss * 0.4) / 4),
        fatsIntake: Math.round((maleHeavyLoss * 0.3) / 9),
        proteinsIntake: Math.round((maleHeavyLoss * 0.3) / 4),
      };
      props.setDietRecommendations([
        maintainObject,
        lightLossObject,
        heavyLossObject,
      ]);
    }
  }

  function setGoals(event) {
    event.preventDefault();

    props.setCanShowRecommendations(true);

    //Send starting and goal weight to firebase

    calculateRecommendations();
  }

  return (
    <div className="goal-entry-container">
      <h1>Get Recommendations</h1>
      <Form onSubmit={setGoals}>
        <Form.Group className="goal-form-field">
          <Form.Label>Starting Weight (Kg)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter your starting weight"
            onChange={(e) => setStartingWeight(e.target.value)}
            id="startingWeight"
          />
        </Form.Group>

        <Form.Group className="goal-form-field">
          <Form.Label>Height (cm)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter your height (cm)"
            onChange={(e) => setHeight(e.target.value)}
            id="heightFeet"
          />
        </Form.Group>

        <Form.Group className="goal-form-field">
          <Form.Label>Age</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)}
            id="heightFeet"
          />
        </Form.Group>

        <Form.Group className="goal-form-field">
          <Form.Label>Goal Weight</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter you goal weight"
            onChange={(e) => setGoalWeight(e.target.value)}
            id="goalWeight"
          />
        </Form.Group>

        <Form.Group className="goal-form-field">
          <Form.Label>Gender</Form.Label>
          <div key={`inline-radio`} className="mb-3">
            <Form.Check
              inline
              label="Male"
              name="group1"
              type={"radio"}
              id={`Male`}
              onChange={(e) =>
                setGender(
                  ReactDOM.findDOMNode(document.getElementById("Male")).id
                )
              }
            />
            <Form.Check
              inline
              label="Female"
              name="group1"
              type={"radio"}
              id={`Female`}
              onChange={(e) =>
                setGender(
                  ReactDOM.findDOMNode(document.getElementById("Female")).id
                )
              }
            />
            <Form.Check
              inline
              label="Other"
              name="group1"
              type={"radio"}
              id={`Other`}
              onChange={(e) =>
                setGender(
                  ReactDOM.findDOMNode(document.getElementById("Other")).id
                )
              }
            />
          </div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="goal-form-submit-button"
        >
          Get Diet Recommendations
        </Button>
      </Form>
    </div>
  );
}

export default GoalsForm;
