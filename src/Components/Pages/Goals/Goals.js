import "./Goals.css";
import SideBar from "../../Navigation/SideBar";
import React, { useState, useEffect } from "react";
import GoalsForm from "./GoalsForm";
import * as utilities from "../../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";
import RecommendationCard from "./RecommendationCard";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import Draggable from "./DragAndDrop/Draggable";
import Droppable from "./DragAndDrop/Droppable";
import Button from "react-bootstrap/Button";

function Goals() {
  const [canShowRecommendations, setCanShowRecommendations] = useState(false);
  const [dietRecommendations, setDietRecommendations] = useState([]);
  const [hasChosenDiet, setHasChosenDiet] = useState(false);
  //The current card being dragged
  const [activeCard, setActiveCard] = useState(null);
  //Parents for each draggable component
  const [maintainParent, setMaintainParent] = useState(null);
  const [lightParent, setLightParent] = useState(null);
  const [heavyParent, setHeavyParent] = useState(null);
  const [gainParent, setGainParent] = useState(null);
  //Draggable components
  let maintainDraggable;
  let lightDraggable;
  let heavyDraggable;
  let gainDraggable;

  //Collision detection algorithm
  const { algorithm } = {
    algorithm: pointerWithin,
  };

  //Turning generated diet plans into draggable components
  if (dietRecommendations.length > 0) {
    maintainDraggable = (
      <Draggable id="maintainDraggable">
        <RecommendationCard
          diet={dietRecommendations[0]}
          activateDiet={activateDiet}
          key={dietRecommendations[0].name}
        />
      </Draggable>
    );
    lightDraggable = (
      <Draggable id="lightDraggable">
        <RecommendationCard
          diet={dietRecommendations[1]}
          activateDiet={activateDiet}
          key={dietRecommendations[1].name}
        />
      </Draggable>
    );
    heavyDraggable = (
      <Draggable id="heavyDraggable">
        <RecommendationCard
          diet={dietRecommendations[2]}
          activateDiet={activateDiet}
          key={dietRecommendations[2].name}
        />
      </Draggable>
    );
    gainDraggable = (
      <Draggable id="gainDraggable">
        <RecommendationCard
          diet={dietRecommendations[3]}
          activateDiet={activateDiet}
          key={dietRecommendations[3].name}
        />
      </Draggable>
    );
  }

  //Makes sure only one draggable can be in droppable container at a time
  function handleDragEnd({ over }) {
    switch (activeCard) {
      case "maintainDraggable":
        if (over) {
          setMaintainParent(over.id);
          setLightParent(null);
          setHeavyParent(null);
          setGainParent(null);
        } else {
          setMaintainParent(null);
        }
        break;
      case "lightDraggable":
        if (over) {
          setLightParent(over.id);
          setMaintainParent(null);
          setHeavyParent(null);
          setGainParent(null);
        } else {
          setLightParent(null);
        }
        break;
      case "heavyDraggable":
        if (over) {
          setHeavyParent(over.id);
          setLightParent(null);
          setMaintainParent(null);
          setGainParent(null);
        } else {
          setHeavyParent(null);
        }
        break;
      case "gainDraggable":
        if (over) {
          setGainParent(over.id);
          setLightParent(null);
          setHeavyParent(null);
          setMaintainParent(null);
        } else {
          setGainParent(null);
        }
        break;
      default:
        break;
    }
  }

  //Set's the card currently being dragged
  function handleDragStart(event) {
    setActiveCard(event.active.id);
  }

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

  //If form has been submitted, show recommendations
  if (canShowRecommendations) {
    return (
      <div className="goals-main-container">
        <div className="goals-flex-box">
          <SideBar />

          <GoalsForm
            setCanShowRecommendations={setCanShowRecommendations}
            setDietRecommendations={setDietRecommendations}
          />

          <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            collisionDetection={algorithm}
          >
            <div className="context-flex-box">
              <div className="recommendations-container">
                {!maintainParent ? maintainDraggable : null}
                {!lightParent ? lightDraggable : null}
                {!heavyParent ? heavyDraggable : null}
                {!gainParent ? gainDraggable : null}
              </div>
              <Droppable id="droppable">
                {maintainParent === null &&
                lightParent === null &&
                heavyParent === null &&
                gainParent === null ? (
                  <p className="droppable-title">
                    Drag and drop a diet into this box to activate it!
                  </p>
                ) : (
                  ""
                )}
                {maintainParent === "droppable" ? maintainDraggable : ""}
                {lightParent === "droppable" ? lightDraggable : ""}
                {heavyParent === "droppable" ? heavyDraggable : ""}
                {gainParent === "droppable" ? gainDraggable : ""}
                {maintainParent !== null ||
                lightParent !== null ||
                heavyParent !== null ||
                gainParent !== null ? (
                  <Button
                    variant="primary"
                    type="submit"
                    className="diet-activate-button"
                  >
                    Activate Diet
                  </Button>
                ) : (
                  ""
                )}
              </Droppable>
            </div>
          </DndContext>
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
          <h2 className="no-data-header">Weight Loss Warning</h2>
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
          <h2 className="no-data-header">No Recommendations</h2>
          <div className="application-access-text-conatiner">
            <p className="application-access-text">
              Please fill out the form on the left hand side of the page and
              activate a diet in order to get access to the full application.
            </p>
          </div>

          <div className="no-data-warning-container">
            <p className="no-data-warning-text">
              If you are wanting to gain or lose large amounts of weight please
              consult a doctor.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Goals;
