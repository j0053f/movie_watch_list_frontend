import React, { useState } from "react";
const defaultAuthContext = {
  credentials: {},
  error: "",
  signin: () => {},
  signout: () => {},
};
export const AuthContext = React.createContext(defaultAuthContext);
export default function AuthProvider({ children }) {
  const [credentials, setCredentials] = useState({});
  const [authError, setAuthError] = useState("");

  function signin(_username, _password, callback) {
    fetch("/api/movielist/v1.1/signin", {
      headers: {
        Authorization: `Basic ${window.btoa(`${_username}:${_password}`)}`,
      },
    })
      .then((response) => response.json())
      .then(({ name, actual_status_code }) => {
        console.log("data is:", { name, actual_status_code });

        if (name === _username) {
          setCredentials({ username: _username, password: _password });
          callback();
        }
        setAuthError(actual_status_code);

        // TODO! Done.   if the username & password is correct setUsername() & setPassword()
        // TODO!       alse save in browsers local storage
        // TODO! Done. otherwise setError
      });
  }

  function signout() {
    setUsername("");
    setPassword("");
  }

  const value = { credentials, authError, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
