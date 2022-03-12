import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import React, { useState } from "react";

import { Route, Routes, Link } from "react-router-dom";
import FormAddMovie from "./FormAddMovie";

const u = {
  credentials: {},
  setCredentials: () => {},
};
export const credentialsContext = React.createContext(u);
function App() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  return (
    <div>
      <nav>
        <Link to="/home">Home</Link>|{"  "}
        <Link to="/signin">Sign in</Link>|{"  "}
        <Link to="/signup">Create an account</Link>
      </nav>
      <credentialsContext.Provider value={{ credentials, setCredentials }}>
        <Routes>
          <Route path="/">
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="home" element={<Home />} />
            <Route path="addmovie" element={<FormAddMovie />} />
          </Route>
        </Routes>
      </credentialsContext.Provider>
    </div>
  );
}

export default App;
