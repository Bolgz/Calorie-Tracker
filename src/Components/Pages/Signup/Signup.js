import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

/**
 * @returns The user signup page
 */
function Signup() {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for if an signup error occurs
  const [signupError, setSignupError] = useState("");

  /**
   * Handles account creation with firebase
   */
  function createUserAccount() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Switches to home screen upon account creation
        window.location.pathname = "/Calorie-Tracker";
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignupError(errorMessage);
      });
  }

  /**
   * Gets the appropriate error message for the signup error
   * @return The signup error message
   */
  function getSignupErrorMessage() {
    if (signupError === "Firebase: Error (auth/email-already-in-use).") {
      return <p className="error-message-signup">Email already in use</p>;
    } else if (signupError === "Firebase: Error (auth/invalid-email).") {
      return <p className="error-message-signup">Invalid email</p>;
    } else if (
      signupError ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return <p className="error-message-signup">Password is too weak</p>;
    } else if (signupError === "Firebase: Error (auth/missing-password).") {
      return <p className="error-message-signup">Password is missing</p>;
    } else if (signupError === "Firebase: Error (auth/missing-email).") {
      return <p className="error-message-signup">Email is missing</p>;
    } else if (signupError === "Username is too short") {
      return <p className="error-message-signup">Username is too short</p>;
    } else if (signupError === "Username is already taken") {
      return <p className="error-message-signup">Username is already taken</p>;
    }
  }

  return (
    <div className="main-content">
      <Form className="signup-form">
        <h2 className="form-title">Create a Calorie Tracker Account</h2>

        <Form.Group className="signup-email-field" controlId="formBasicEmail">
          <Form.Label className="form-subtitle">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="signup-password-field"
          controlId="formBasicPassword"
        >
          <Form.Label className="form-subtitle">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">Make it strong!</Form.Text>
        </Form.Group>

        <div className="submit-button">
          <Button onClick={createUserAccount} variant="primary">
            Submit
          </Button>
        </div>

        {getSignupErrorMessage()}

        <Link to="/login" className="login-link">
          Click here to login
        </Link>
      </Form>
    </div>
  );
}

export default Signup;
