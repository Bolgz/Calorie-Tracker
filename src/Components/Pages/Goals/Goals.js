import "./Goals.css";
import SideBar from "../../Navigation/SideBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

function Goals() {
  const [startingWeight, setStartingWeight] = useState();
  const [goalWeight, setGoalWeight] = useState();
  const [canShowRecommendations, setCanShowRecommendations] = useState(true);

  function calculateRecommendations() {}

  function setGoals(event) {
    event.preventDefault();

    setCanShowRecommendations(true);

    //Send starting and goal weight to firebase

    calculateRecommendations();
  }

  return (
    <div className="goals-flex-box">
      <SideBar />

      <div className="goal-entry-container">
        <h1>Set Goals</h1>
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
            <Form.Label>Height (ft)(in)</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Height (ft)"
              id="heightFeet"
            />
          </Form.Group>

          <Form.Group className="goal-form-field">
            <Form.Control
              required
              type="number"
              placeholder="Height (in)"
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
            <Form.Label>How active are you?</Form.Label>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Not Very Active"
                name="group1"
                type={"radio"}
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Active"
                name="group1"
                type={"radio"}
                id={`inline-radio-2`}
              />
              <Form.Check
                inline
                label="Very Active"
                name="group1"
                type={"radio"}
                id={`inline-radio-2`}
              />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="goal-form-submit-button"
          >
            Set weight loss goals
          </Button>
        </Form>
      </div>
      <div className="recommendations-container">
        {canShowRecommendations ? (
          <div>
            <h1 className="recommendations-header">Weight Profile</h1>
            <p className="recommendations-sub">Starting Weight (Kg):</p>
            <p className="recommendations-value">{startingWeight}Kg</p>
            <br />
            <br />
            <p className="recommendations-sub">Goal Weight (Kg):</p>
            <p className="recommendations-value">{goalWeight}Kg</p>
            <br />
            <br />
            <h1 className="recommendations-header">Recommendations</h1>
            <p>Daily Calorie Intake: </p>
            <p>Daily Carbohydrates Intake: </p>
            <p>Daily Fats Intake: </p>
            <p>Daily Proteins Intake: </p>
          </div>
        ) : (
          <div>
            <h1 className="recommendations-header" style={{ color: "brown" }}>
              No Data
            </h1>
            <p>
              Please set your goals on the left side of the page. Until then, we
              cannot give you any macro or calorie defecit recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;
