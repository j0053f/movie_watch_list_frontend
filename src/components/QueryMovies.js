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
  const NOTFIND = "NOTFIND";
  const FIND = "FIND";

  const [dataLoadingStatus, setDataLoadingStatus] = useState(EMPTY);
  const movie_name = searchParams.get("movie_name") || "";

  const handleChange = (event) => {
    const movie_name = event.target.value;
    if (movie_name) {
      setDataLoadingStatus(PENDING);
      setSearchParams({ movie_name });
    } else {
      setDataLoadingStatus(EMPTY);
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
          console.log("then(movies)", movies);
          setMovies(movies);
          if (Object.keys(movies).length === 0) {
            setDataLoadingStatus(NOTFIND);
          } else {
            setDataLoadingStatus(FIND);
          }

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
              <button className="button">
                add to
                <br />
                watchlist
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
                disabled
              />
            </div>
          );
        })}
      </div>
    );
  }

  const [numberOfSeasons, setNumberOfSeasons] = useState(0);
  function render_movie() {
    function handleChange(event) {
      setNumberOfSeasons(+event.target.value);
    }
    return (
      <div className="movie">
        <Input
          labelText="#seasons"
          type="number"
          value={numberOfSeasons}
          onChange={handleChange}
        />
        {Array(numberOfSeasons)
          .fill(0)
          .map((_, index) => 0 + index)
          .map((season) => (
            <div className="details">
              <Input labelText={season + 1} type="number" />
            </div>
          ))}
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
      <div>
        {dataLoadingStatus === NOTFIND && (
          <div style={{ color: "red" }}>
            not find, please complete movie name and required information
            <div>{render_movie()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
