import "./Goals.css";
import SideBar from "../../Navigation/SideBar";
import React, { useState } from "react";
import GoalsForm from "./GoalsForm";
import Button from "react-bootstrap/Button";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

function Goals() {
  const [canShowRecommendations, setCanShowRecommendations] = useState(false);
  const [dietRecommendations, setDietRecommendations] = useState([]);
  const [chosenDiet, setChosenDiet] = useState("");

  function activateDiet(dietName) {
    dietRecommendations.forEach((diet) => {
      if (diet.name === dietName) {
        setChosenDiet(diet);
        console.log(diet);
        //Send selected diet to firebase
        const auth = getAuth();
        utilities.addActiveDiet(diet, auth.currentUser.uid);
      }
    });
  }

  //These are the diet recommendation cards generated when the 'get recommendations' form is submitted
  const dietRecommendationsCards = dietRecommendations.map((diet) => {
    return (
      <div className="recommendation-card" key={diet.name}>
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
          onClick={() => activateDiet(diet.name)}
          className="recommendation-activate-button"
        >
          Activate Diet
        </Button>
      </div>
    );
  });

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
          <h1 className="no-data-header">No Recommendations</h1>
        </div>
      </div>
    );
  }
}

export default Goals;
