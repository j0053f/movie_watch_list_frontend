import { credentialsContext } from "./App";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

export default function Home() {
  const { username, password } = useContext(credentialsContext).credentials;
  useEffect(() => {
    fetch("/api/movielist/v1.1/getmovies", {
      headers: {
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
  return (
    <nav>
      <Link to="/addmovie"> add movie</Link>
    </nav>
  );
}
