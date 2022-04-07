import "./QueryMovies.css";
import Input from "./Input";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Auth/AuthProvider";

export default function QueryMovies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { username, password } = useContext(AuthContext).credentials;
  const [movies, setMovies] = useState({});
  //loading data status
  const EMPTY = "EMPTY";
  const PENDING = "PENDING";
  const SUCCESS = "SUCCESS";

  const [dataLoadingStatus, setDataLoadingStatus] = useState(EMPTY);
  const movie_name = searchParams.get("movie_name") || "";

  if (movie_name.length >= 3 && dataLoadingStatus === EMPTY) {
    setDataLoadingStatus(PENDING);
  } else if (movie_name.length < 3 && dataLoadingStatus !== EMPTY) {
    setDataLoadingStatus(EMPTY);
  }

  const handleChange = (event) => {
    const movie_name = event.target.value;
    if (movie_name) {
      setSearchParams({ movie_name });
    } else {
      setSearchParams({});
    }
  };
  useEffect(() => {
    console.log("useEffect executed:", dataLoadingStatus);
    if (dataLoadingStatus === PENDING) {
      fetch("/api/movielist/v1.1/movies", {
        method: "POST",
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ movie_name: movie_name }),
      })
        .then((data) => data.json())
        .then((movies) => {
          setMovies(movies);
          setDataLoadingStatus(EMPTY);
          console.log(movies);
        });
    }
  }, [dataLoadingStatus]);

  function render_movies() {
    return (
      <div>
        {Object.keys(movies).map((movie_name) => {
          return (
            <div
              className="movie"
              onClick={() => console.log(movies[movie_name])}
            >
              <div className="movie__name center">{movie_name}</div>

              {render_movie_details(
                movies[movie_name]["season_episode_details"]
              )}
              <button class="button">
                add to
                <br />
                watch list
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  function render_movie_details(details) {
    return (
      <div className="movie-details-wrapper">
        {Object.keys(details).map((season) => {
          return (
            <div className="details">
              <Input
                labelText={season}
                type="number"
                className="details__episode center"
                value={details[season]}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="query-movies-wrapper">
      <div className="query-movies-wrapper__input center">
        <Input
          labelText="movie name"
          value={searchParams.get("movie_name") || ""}
          onChange={handleChange}
        />
      </div>
      <div>{render_movies()}</div>
    </div>
  );
}
