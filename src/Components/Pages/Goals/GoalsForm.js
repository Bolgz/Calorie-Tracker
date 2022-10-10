import "./GoalsForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

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
        655.1 + 9.563 * startingWeight + 1.85 * height - 4.676 * age + 400;
      const femaleLightLoss = femaleMaintain - 150;
      const femaleHeavyLoss = femaleMaintain - 300;
      const femaleGain = femaleMaintain + 200;

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

      const gainObject = {
        name: "Gain Weight",
        calorie: Math.round(femaleGain),
        carbIntake: Math.round((femaleGain * 0.4) / 4),
        fatsIntake: Math.round((femaleGain * 0.3) / 9),
        proteinsIntake: Math.round((femaleGain * 0.3) / 4),
      };

      props.setDietRecommendations([
        maintainObject,
        lightLossObject,
        heavyLossObject,
        gainObject,
      ]);
    } else {
      const maleMaintain =
        66.5 + 12.75 * startingWeight + 5.003 * height - 6.75 * age + 500;
      const maleLightLoss = maleMaintain - 200;
      const maleHeavyLoss = maleMaintain - 350;
      const maleGain = maleMaintain + 350;

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

      const gainObject = {
        name: "Gain Weight",
        calorie: Math.round(maleGain),
        carbIntake: Math.round((maleGain * 0.4) / 4),
        fatsIntake: Math.round((maleGain * 0.3) / 9),
        proteinsIntake: Math.round((maleGain * 0.3) / 4),
      };

      props.setDietRecommendations([
        maintainObject,
        lightLossObject,
        heavyLossObject,
        gainObject,
      ]);
    }
  }

  function setGoals(event) {
    event.preventDefault();

    props.setCanShowRecommendations(true);

    //Send goal weight to firebase
    const auth = getAuth();
    utilities.addGoalWeight(goalWeight, auth.currentUser.uid);

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
            min={45}
            max={140}
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
            min={122}
            max={275}
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
            min={18}
            max={75}
            type="number"
            placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)}
            id="heightFeet"
          />
        </Form.Group>

        <Form.Group className="goal-form-field">
          <Form.Label>Goal Weight (Kg)</Form.Label>
          <Form.Control
            required
            min={50}
            max={115}
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
