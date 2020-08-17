import React, { useState } from "react";
import { createBrowserHistory } from "history";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import api from "services/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredential, setInvalidCredential] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function setAuth(auth) {
    localStorage.setItem("Authorization", auth);
  }

  function setUser(role, username, cod) {
    localStorage.setItem("Role", role);
    localStorage.setItem("Username", username);
    localStorage.setItem("Cod", cod);
  }

  function goToHome() {
    createBrowserHistory().push("/home");
    window.location.reload(false);
  }

  const handleSubmit = async (event) => {
      try {
        var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
        setAuth(auth);
        await api.get("basicAuth");
        const { data } = await api.get(`/usuarios/byName/${username}`);
        const { name, id } = data;
        const role = data.roles[0].role;
        setUser(role, name, id);
        goToHome();
    } catch {
        localStorage.clear();
        setInvalidCredential(true);
    }
}

  return (
    <div className="Login">
      <form>
        <FormGroup controlId="username" bsSize="large">
          {invalidCredential ? <p className="invalid-credential">Invalid Credential</p> : ""}
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