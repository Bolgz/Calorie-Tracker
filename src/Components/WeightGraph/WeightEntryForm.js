import "./WeightEntryForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as ReactDOM from "react-dom";
import React, { useState } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

function WeightEntryForm(props) {
  const [weightDate, setWeightDate] = useState("");
  const [weightValue, setWeightValue] = useState("");

  async function addWeightEntry(event) {
    event.preventDefault();

    const auth = getAuth();
    utilities.getUserDataFromUserId(auth.currentUser.uid).then((user) => {
      utilities.addWeightEntry(weightDate, weightValue, auth.currentUser.uid);
    });

    props.addWeightEntry(weightValue, weightDate);

    //Resets message box input on submit
    ReactDOM.findDOMNode(document.getElementById("weightDate")).value = "";
    ReactDOM.findDOMNode(document.getElementById("weightValue")).value = "";
  }

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    setWeightDate(day + "-" + month + "-" + year);
  }

  return (
    <div>
      <Form className="weight-entry-form" onSubmit={addWeightEntry}>
        <Form.Group className="mb-3">
          <h4 className="weight-form-title">Add Weight Entry</h4>
          <Form.Control
            required
            type="date"
            placeholder="Enter Date"
            onChange={(e) => formatDate(e.target.value)}
            id="weightDate"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            required
            type="number"
            placeholder="Weight (Kg)"
            onChange={(e) => setWeightValue(e.target.value)}
            id="weightValue"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Weight
        </Button>
      </Form>
    </div>
  );
}

export default WeightEntryForm;
