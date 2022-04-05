import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import Input from "./components/Input";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./Auth/AuthProvider";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //signUp status
  const EMPTY = "EMPTY";
  const PENDING = "PENDING";
  const SUCCESS = "SUCCESS";
  const ERROR = "ERROR";

  const [signupStatus, setSignupStatus] = useState(EMPTY);
  const navigate = useNavigate();

  const { signin } = useContext(AuthContext);
  // isSubmitted
  useEffect(() => {
    if (signupStatus === PENDING) {
      fetch("/api/movielist/v1.1/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then(({ status }) => {
          if (status === "created") {
            signin(username, password, () => {
              setSignupStatus(SUCCESS);
              navigate("/");
            });
          } else {
            setSignupStatus(ERROR);
            console.log("ERROR", status);
          }
        });
    }
  }, [signupStatus]);

  function handleChange(event) {
    const target = event.target;
    target.name === "email" && setEmail(target.value);
    target.name === "username" && setUsername(target.value);
    target.name === "password" && setPassword(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(signupStatus);
    if (signupStatus === EMPTY || signupStatus === ERROR) {
      setSignupStatus(PENDING);
    } else if (signupStatus === SUCCESS) {
      console.log("your account is created");
    } else {
      console.log("please wait");
    }
  }
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="description">
          <div>Movie List</div>
          <div>Sign in</div>
        </div>
        <div className="inputs-container">
          <Input
            labelText="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          ></Input>

          <Input
            labelText="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          ></Input>

          <Input
            labelText="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          ></Input>
        </div>
        <input className="button " type="submit" value="submit" />
      </form>
    </div>
  );
}
