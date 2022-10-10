import "./Goals.css";
import SideBar from "../../Navigation/SideBar";
import React, { useState, useEffect } from "react";
import GoalsForm from "./GoalsForm";
import Button from "react-bootstrap/Button";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

function Goals() {
  const [canShowRecommendations, setCanShowRecommendations] = useState(false);
  const [dietRecommendations, setDietRecommendations] = useState([]);
  const [hasChosenDiet, setHasChosenDiet] = useState(false);

  function activateDiet(dietName) {
    dietRecommendations.forEach((diet) => {
      if (diet.name === dietName) {
        //Send selected diet to firebase
        const auth = getAuth();
        utilities.addActiveDiet(diet, auth.currentUser.uid);
        setHasChosenDiet(true);
      }
    });
  }

  useEffect(() => {
    const auth = getAuth();
    utilities.hasActiveDiet(auth.currentUser.uid).then((diet) => {
      if (diet) {
        setHasChosenDiet(true);
      }
    });
    // eslint-disable-next-line
  }, []);

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
  }
  //If the user has previously selected a diet, show them weight loss warning
  if (hasChosenDiet) {
    return (
      <div className="goals-flex-box">
        <SideBar />

        <GoalsForm
          setCanShowRecommendations={setCanShowRecommendations}
          setDietRecommendations={setDietRecommendations}
        />
        <div className="no-recommendations-container">
          <h1 className="no-data-header">Weight Loss Warning</h1>
          <div className="no-data-warning-container">
            <p className="no-data-warning-text">
              If you are wanting to gain or lose large amounts of weight please
              consult a doctor
            </p>
            <br />
            <p className="no-data-warning-text">
              The recommendations given on this page are to be used as
              guidelines. These may not be accurate given your build, metabolic
              rate, activity level etc.
            </p>
          </div>
        </div>
      </div>
    );
    //If user has never selected a diet, tell them they need to in order to access the full application
  } else {
    return (
      <div className="goals-flex-box">
        <SideBar />

        <GoalsForm
          setCanShowRecommendations={setCanShowRecommendations}
          setDietRecommendations={setDietRecommendations}
        />
        <div className="no-recommendations-container">
          <div className="application-access-text-conatiner">
            <p className="application-access-text">
              Please fill out the form on the left hand side of the page and
              activate a diet in order to get access to the full application
            </p>
          </div>

          <div className="no-data-warning-container">
            <p className="no-data-warning-text">
              If you are wanting to gain or lose large amounts of weight please
              consult a doctor
            </p>
            <p className="no-data-warning-text">
              The recommendations given on this page are to be used as
              guidelines. These may not be accurate given your build, metabolic
              rate, activity level etc.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Goals;
