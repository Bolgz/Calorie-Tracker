import "./Goals.css";
import SideBar from "../../Navigation/SideBar";
import React, { useState } from "react";
import GoalsForm from "./GoalsForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Goals() {
  const [canShowRecommendations, setCanShowRecommendations] = useState(false);
  const [dietRecommendations, setDietRecommendations] = useState([]);

  function activateDiet() {}

  //These are the diet recommendation cards generated when the 'get recommendations' form is submitted
  const dietRecommendationsCards = dietRecommendations.map((diet) => {
    return (
      <div className="recommendation-card" key={Math.random()}>
        <h3 className="recommendation-title">{diet.name}</h3>
        <p className="recommendations-sub">Calories(Kcal):</p>
        <p className="recommendations-value">{diet.calorie}</p>
        <br />
        <br />
        <p className="recommendations-sub">Carbs(grams):</p>
        <p className="recommendations-value">{diet.carbIntake}</p>
        <br />
        <br />
        <p className="recommendations-sub">Fats(grams):</p>
        <p className="recommendations-value">{diet.fatsIntake}</p>
        <br />
        <br />
        <p className="recommendations-sub">Proteins(grams):</p>
        <p className="recommendations-value">{diet.proteinsIntake}</p>
        <Button
          variant="primary"
          type="submit"
          className="recommendation-activate-button"
        >
          Activate Diet
        </Button>
      </div>
    );
  });

  //This is the custom diet component (small version)
  const customDiet = (
    <div className="recommendation-card">
      <Form onSubmit={activateDiet}>
        <h3 className="recommendation-title">Custom Diet</h3>
        <p className="recommendations-sub">Calories(Kcal):</p>
        <Form.Control
          required
          type="number"
          placeholder="0"
          className="custom-diet-input"
          onChange={(e) => 1 + 1}
          id="startingWeight"
        />
        <br />
        <br />
        <p className="recommendations-sub">Carbs(grams):</p>
        <Form.Control
          required
          type="number"
          placeholder="0"
          className="custom-diet-input"
          onChange={(e) => 1 + 1}
          id="startingWeight"
        />
        <br />
        <br />
        <p className="recommendations-sub">Fats(grams):</p>
        <Form.Control
          required
          type="number"
          placeholder="0"
          className="custom-diet-input"
          onChange={(e) => 1 + 1}
          id="startingWeight"
        />
        <br />
        <br />
        <p className="recommendations-sub">Proteins(grams):</p>
        <Form.Control
          required
          type="number"
          placeholder="0"
          className="custom-diet-input"
          onChange={(e) => 1 + 1}
          id="startingWeight"
        />
        <Button
          variant="primary"
          type="submit"
          className="custom-diet-activate-button"
        >
          Activate Diet
        </Button>
      </Form>
    </div>
  );

  //If form has been submitted, show recommendations
  if (canShowRecommendations) {
    return (
      <div className="goals-flex-box">
        <SideBar />

        <GoalsForm
          setCanShowRecommendations={setCanShowRecommendations}
          setDietRecommendations={setDietRecommendations}
        />

        <div className="recommendations-container">
          {dietRecommendationsCards}
          {/* This card below is to activate a custom diet plan */}
          {customDiet}
        </div>
      </div>
    );
    //If form has not been submitted, show 'large' custom diet form
  } else {
    return (
      <div className="goals-flex-box">
        <SideBar />

        <GoalsForm
          setCanShowRecommendations={setCanShowRecommendations}
          setDietRecommendations={setDietRecommendations}
        />
        <div className="no-recommendations-container">
          <h1 className="no-data-header">Create Custom Diet</h1>
          <div className="recommendation-card-large">
            <Form onSubmit={activateDiet}>
              <Form.Label className="recommendations-sub-large">
                Calories(Kcal):
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="0"
                className="custom-diet-input-large"
                onChange={(e) => 1 + 1}
                id="startingWeight"
              />
              <Form.Label className="recommendations-sub-large">
                Carbs(grams):
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="0"
                className="custom-diet-input-large"
                onChange={(e) => 1 + 1}
                id="startingWeight"
              />
              <Form.Label className="recommendations-sub-large">
                Fats(grams):
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="0"
                className="custom-diet-input-large"
                onChange={(e) => 1 + 1}
                id="startingWeight"
              />
              <Form.Label className="recommendations-sub-large">
                Proteins(grams):
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="0"
                className="custom-diet-input-large"
                onChange={(e) => 1 + 1}
                id="startingWeight"
              />
              <Button
                variant="primary"
                type="submit"
                className="custom-diet-activate-button-large"
              >
                Activate Diet
              </Button>
            </Form>
            <br />
            <br />
            <p className="recommendations-sub" style={{ color: "brown" }}>
              {" "}
              Please remember to consult a medical expert if you want to gain or
              lose a lot of weight.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Goals;
