import { AuthContext } from "./Auth/AuthProvider";
import { useContext, useState, useEffect } from "react";

export default function Episode({
  season_i,
  episode_i,
  movie,
  movieLog,
  handleWatched,
}) {
  const { username, password } = useContext(AuthContext).credentials;
  const EMPTY = "UPDATE_FIELD_VALUE";
  const PENDING = "PENDING";
  const SUCCESS = "SUCCESS";
  const ERROR = "ERROR";

  // const movie_id = movie.movie_id;

  const watch_time_string = movieLog.filter(
    ({ episode, season, watch_time }) =>
      episode === episode_i && season === season_i
  )[0]?.watch_time;

  const [status, setStatus] = useState(Boolean(watch_time_string));

  function handleClick() {
    console.log(movie.movie_id, season_i, episode_i);
    if (!status) {
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

  return (
    <div className="episode" onClick={handleClick}>
      <div>
        {Boolean(watch_time?.getDate()) && watch_time?.getDate()}
        {month[watch_time?.getMonth()]}
      </div>
      <div>{episode_i + 1}</div>
    </div>
  );
}
