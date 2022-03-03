// import logo from "./logo.svg";
// import './App.css';
import { useEffect, useState } from "react";
function App() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const _username = "yousef";
    const _password = "password_hash";

    fetch("/api/movielist/v1.1/yousef", {
      headers: {
        Authorization: "Basic " + window.btoa(`${_username}:${_password}`),
      },
    })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>{username ? `hello ${username}` : <LoginForm />}</h1>
      <p></p>
    </div>
  );
}

export default App;
