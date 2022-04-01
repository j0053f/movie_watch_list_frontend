import { AuthContext } from "./Auth/AuthProvider";
import { useContext, useState, useEffect } from "react";

import "./Episode.css";
export default function Episode({
  season_i,
  episode_i,
  movie,
  movieLog,
  handleWatched,
}) {
  const { username, password } = useContext(AuthContext).credentials;

  const EMPTY = "UPDATE_FIELD_VALUE";
  const WATCHED = "WATCHED";
  const PENDING = "PENDING";
  const SUCCESS = "SUCCESS";
  const ERROR = "ERROR";

  // const movie_id = movie.movie_id;

  const watch_time_string = movieLog.filter(
    ({ episode, season, watch_time }) =>
      episode === episode_i && season === season_i
  )[0]?.watch_time;

  const initial_state = Boolean(watch_time_string) ? WATCHED : EMPTY;
  const [status, setStatus] = useState(initial_state);

  function handleClick() {
    console.log(movie.movie_id, season_i, episode_i);
    console.log(status);
    if (status === EMPTY) {
      setStatus(PENDING);
    }
  }

  useEffect(() => {
    if (status === PENDING) {
      fetch("/api/movielist/v1.1/movieslog", {
        method: "POST",
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          movie_id: movie.movie_id,
          watched_season: season_i,
          watched_episode: episode_i,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          handleWatched(movie.movie_id, season_i, episode_i, data.watch_time);
          setStatus(WATCHED);
        });
    }
  }, [status]);
  const watch_time = new Date(watch_time_string);
  watch_time && console.log(watch_time);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // function styleWatched(classes) {
  //   let date_classes = classes;
  //   if (status === WATCHED) {
  //     console.log(status);
  //     date_classes.replace("hidden", "");
  //     console.log(date_classes);
  //   }
  //   return date_classes;
  // }

  return (
    <div className="aspect-ratio">
      <button
        className={status === WATCHED ? "episode watched" : "episode"}
        onClick={handleClick}
      >
        <div className="date">
          {Boolean(watch_time?.getDate()) && watch_time?.getDate()}
          {month[watch_time?.getMonth()]}
        </div>
        <div className="number">{episode_i + 1}</div>

        {/* <div
          className={status === WATCHED ? "l2r-line" : "l2r-line hidden"}
        ></div>
        <div
          className={status === WATCHED ? "r2l-line" : "r2l-line hidden"}
        ></div> */}
      </button>
    </div>
  );
}
