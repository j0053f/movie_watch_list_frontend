import "./App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import React, { useState } from "react";

import { Route, Routes, Link } from "react-router-dom";
import FormAddMovie from "./FormAddMovie";
import About from "./About";
import AuthProvider from "./Auth/AuthProvider";
import AuthRequired from "./Auth/AuthRequired";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="movielist/about" element={<About />} />
            <Route
              path="home"
              element={
                <AuthRequired>
                  <Home />
                </AuthRequired>
              }
            />
            <Route
              path="addmovie"
              element={
                <AuthRequired>
                  <FormAddMovie />
                </AuthRequired>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
