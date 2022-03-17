import "./MovieList.css";
export default function MovieList({ movies, moviesLog }) {
  console.log("moviesList - moviesLog:", moviesLog);
  return (
    <div className="movies-container">
      <Movie
        movie_i={2}
        movies={movies}
        key={movies[0].movie_id}
        moviesLog={moviesLog}
      />
    </div>
  );
}
function Movie({ movie_i, movies, moviesLog }) {
  return (
    <div className="seasons-container">
      <h1>{movies[movie_i].name}</h1>

      {movies[movie_i].movie_info.map((item) => (
        <Season
          movie_i={movie_i}
          season_i={item[0]}
          movies={movies}
          key={+(String(movies[movie_i].movie_id) + String(item[0]))}
          moviesLog={moviesLog}
        />
      ))}
    </div>
  );
}

function Season({ movie_i, season_i, movies, moviesLog }) {
  return (
    <div className="episodes-container">
      {Array(movies[movie_i].movie_info[season_i][1])
        .fill(0)
        .map((i, index) => i + index)
        .map((item) => (
          <Episode
            movie_i={movie_i}
            season_i={season_i}
            episode_i={item}
            key={
              +(
                String(movies[movie_i].movie_id) +
                String(season_i) +
                String(item)
              )
            }
            movies={movies}
            moviesLog={moviesLog}
          />
        ))}
    </div>
  );
}

function Episode({ movie_i, season_i, episode_i, movies, moviesLog }) {
  function handleClick() {
    console.log(moviesLog[movies[movie_i].movie_id]);
  }

  const movie_id = movies[movie_i].movie_id;
  // console.log(movie_id);
  // console.log(moviesLog);
  const movie_log = moviesLog[movie_id];
  // console.log(movie_log);
  const watch_time_string = movie_log.filter(
    ({ episode, season, watch_time }) =>
      episode === episode_i && season === season_i
  )[0]?.watch_time;

  const watch_time = new Date(watch_time_string);
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
        {Boolean(watch_time?.getDay()) && watch_time?.getDay()}
        {month[watch_time?.getMonth()]}
      </div>
      <div>{episode_i + 1}</div>
    </div>
  );
}
