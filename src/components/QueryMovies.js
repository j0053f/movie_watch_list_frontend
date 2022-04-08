import "./QueryMovies.css";
import Input from "./Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Auth/AuthProvider";

export default function QueryMovies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { username, password } = useContext(AuthContext).credentials;
  const [movies, setMovies] = useState({});
  const [movieId, setMovieId] = useState("");
  //loading data status
  const EMPTY = "EMPTY";
  const PENDING = "PENDING";
  const NOTFIND = "NOTFIND";
  const FIND = "FIND";

  const SUBMITtoserver = "SUBMITTOSERVER";
  const SUBMITEDtoserver = "SUBMITEDtoserver";

  const SUBMITtoserver2 = "SUBMITTOSERVER2";
  const SUBMITEDtoserver2 = "SUBMITEDtoserver2";

  const [dataLoadingStatus, setDataLoadingStatus] = useState(EMPTY);
  const movie_name = searchParams.get("movie_name") || "";

  const navigate = useNavigate();
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
    if (dataLoadingStatus === SUBMITtoserver) {
      fetch("/api/movielist/v1.1/addmovie", {
        method: "POST",
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          details: seasonEpisode,
          name: movie_name,
        }),
      }).then((response) => {
        console.log(response);
        setDataLoadingStatus(SUBMITEDtoserver);
        navigate("/");
      });
    }
  }, [dataLoadingStatus]);

  useEffect(() => {
    if (dataLoadingStatus === SUBMITtoserver2) {
      fetch("/api/movielist/v1.1/addmovie", {
        method: "POST",
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          movie_id: movieId,
        }),
      }).then((response) => {
        console.log(response);
        setDataLoadingStatus(SUBMITEDtoserver2);
        navigate("/");
      });
    }
  }, [dataLoadingStatus]);
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
        });
    }
  }, [dataLoadingStatus]);

  function render_movies() {
    return (
      <div className="movies__wrapper">
        {Object.keys(movies).map((movie_name) => {
          return (
            <div className="movie">
              <div className="movie__name center">{movie_name}</div>

              {render_movie_details(
                movies[movie_name]["season_episode_details"]
              )}
              <button
                className="button button--medium"
                onClick={() => {
                  setMovieId(movies[movie_name].movie_id);
                  console.log(movies[movie_name].movie_id);
                  setDataLoadingStatus(SUBMITtoserver2);
                }}
              >
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

  const [seasonEpisode, setSeasonEpisode] = useState(Array(0));
  function render_movie() {
    function handleChange(event) {
      if (event.target.name === "name") {
        setSeasonEpisode(Array(+event.target.value).fill(0));
      }
    }
    function handleEpisodeChange(event, season) {
      const copySeasonEpisode = seasonEpisode.slice();
      copySeasonEpisode[season] = +event.target.value;
      setSeasonEpisode(copySeasonEpisode);
    }
    return (
      <div style={{ margin: "0 auto", width: "min-content" }}>
        <div style={{ color: "red", marginBottom: "1em" }}>
          not find, please complete movie name and required information
        </div>
        <div>
          <Input
            name="name"
            labelText="#seasons"
            type="number"
            value={Object.keys(seasonEpisode).length}
            onChange={handleChange}
          />
          <div className="movie-details-wrapper">
            {seasonEpisode.map((_, season) => (
              <div className="details">
                <Input
                  name="episode"
                  labelText={season + 1}
                  type="number"
                  value={seasonEpisode[season]}
                  onChange={(e) => handleEpisodeChange(e, season)}
                />
              </div>
            ))}
          </div>
          <button
            className="button button--medium"
            onClick={() => {
              console.log(seasonEpisode);
              setDataLoadingStatus(SUBMITtoserver);
            }}
          >
            add to
            <br />
            watchlist
          </button>
        </div>
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
      <div>{dataLoadingStatus === NOTFIND && <div>{render_movie()}</div>}</div>
    </div>
  );
}
