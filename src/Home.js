import { AuthContext } from "./Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState({});

  const { username, password } = useContext(AuthContext).credentials;

  useEffect(() => {
    console.log("home useEffect");
    fetch("/api/movielist/v1.1/getmovies", {
      headers: {
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        console.log("movie watch list is", data);
        window.data = data;
        setMovies(data);
      });
  }, []);

  return (
    <div>
      <h1>this is home page</h1>
    </div>
  );
}
