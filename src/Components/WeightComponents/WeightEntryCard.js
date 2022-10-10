import "./WeightEntryCard.css";
import { CloseButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

/**
 * @param props Props passed down by WeightEntries.js
 * @returns A single weight entry
 */
function WeightEntryCard(props) {
  //Target weight
  const [targetWeight, setTargetWeight] = useState();

  useEffect(() => {
    const auth = getAuth();
    utilities
      .getGoalWeight(auth.currentUser.uid)
      .then((goalWeight) => setTargetWeight(goalWeight));
    // eslint-disable-next-line
  }, []);

  return (
    <tr key={Math.random()}>
      <td>{props.weightEntry[0]}</td>
      <td>{props.weightEntry[1]} Kg</td>
      <td>{targetWeight} Kg</td>
      <td>
        {props.weightEntry[1] - targetWeight} Kg
        {
          <CloseButton
            onClick={() =>
              props.remove(props.weightEntry[0], props.weightEntry[1])
            }
            className="weight_entry_remove"
          />
        }
      </td>
    </tr>
  );
}

export default WeightEntryCard;
