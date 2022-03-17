/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth/AuthProvider";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { credentials, authError, signin, signout } = useContext(AuthContext);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/home";
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>

        <label>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
      {render_error(authError)}
    </div>
  );
}
