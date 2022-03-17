import { AuthContext } from "./Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import MovieList from "./MovieList";
export default function Home() {
  const [movies, setMovies] = useState({});
  const [moviesLog, setMoviesLog] = useState({});

  const { username, password } = useContext(AuthContext).credentials;

  useEffect(() => {
    console.log("useEffect movies");
    fetch("/api/movielist/v1.1/getmovies", {
      headers: {
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setMovies(data);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect movieslog");
    fetch("/api/movielist/v1.1/log", {
      headers: {
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMoviesLog(data);
      });
  }, []);

  return (
    <div>
      <h1>this is home page</h1>
      {!(movies.length && Object.keys(moviesLog).length) ? (
        <h1>page is loading</h1>
      ) : (
        <MovieList movies={movies} moviesLog={moviesLog} />
      )}
    </div>
  );
}
