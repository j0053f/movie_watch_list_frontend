/* eslint-disable react/jsx-filename-extension */
import "./SignIn.css";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth/AuthProvider";

import Input from "./components/Input";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { credentials, authError, signin, signout } = useContext(AuthContext);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  function handleChange(event) {
    const { target } = event;

    if (target.name === "username") setUsername(target.value);
    if (target.name === "password") setPassword(target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }
  useEffect(() => {
    if (isSubmitted) {
      signin(username, password, () => {
        navigate(from, { replace: true });
      });
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (authError === 401) {
      setIsSubmitted(false);
    }
  }, [authError]);

  function render_error(authError) {
    if (authError) {
      return <div>username or password is wrong!</div>;
    }
    return;
  }
  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="description">
          <div>Movie List</div>
          <div>Sign in</div>
        </div>
        <Input
          labelText="username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />

        <Input
          labelText="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <input className="button button--medium" type="submit" value="Enter" />
      </form>
      {render_error(authError)}
    </div>
  );
}
