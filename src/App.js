import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import React, { useState } from "react";

import { Route, Routes, Link } from "react-router-dom";
import FormAddMovie from "./FormAddMovie";

import AuthProvider from "./Auth/AuthProvider";
import AuthRequired from "./Auth/AuthRequired";

function App() {
  return (
    <div>
      <AuthProvider>
        <nav>
          <Link to="/home">Home</Link>|{"  "}
          <Link to="/signin">Sign in</Link>|{"  "}
          <Link to="/signup">Create an account</Link>
        </nav>

        <Routes>
          <Route path="/">
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="home"
              element={
                <AuthRequired>
                  <Home />
                </AuthRequired>
              }
            />
            <Route path="addmovie" element={<FormAddMovie />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
