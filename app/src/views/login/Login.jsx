import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import api from "services/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) => {
    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
    localStorage.setItem("Authorization", auth);
    localStorage.setItem("Username", username);
    try {
        await api.get("basicAuth");
        // redirect to admin and get user to get role and show menu option for the role
    } catch {
        console.log('fail');
        localStorage.clear();
        // notify invalid credentials
    }
}

  return (
    <div className="Login">
      <form>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button onClick={(event) => handleSubmit(event)} block bsSize="large" disabled={!validateForm()}>
          Login
        </Button>
      </form>
    </div>
  );
}