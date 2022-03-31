import "./MovieList.css";
import Episode from "./Episode";

export default function MovieList({ state, handleWatched }) {
  const { watchlist, watchlist_log } = state;
  console.log(state);
  const movies = Object.keys(watchlist).map((movie_id) => ({
    ...watchlist[movie_id],
    movie_id,
  }));

  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.movie_id}
          movieLog={watchlist_log[movie.movie_id]}
          handleWatched={handleWatched}
        />
      ))}
    </div>
  );
}
function Movie({ movie, movieLog, handleWatched }) {
  return (
    <>
      <div className="seasons-container">
        <div class="movie-sidebar">
          <h1>{movie.name}</h1>
        </div>

        {movie.season_episode_details.map((item) => (
          <Season
            season_i={item[0]}
            movie={movie}
            key={+(String(movie.movie_id) + String(item[0]))}
            movieLog={movieLog}
            handleWatched={handleWatched}
          />
        ))}
      </div>
    </>
  );
}

function Season({ season_i, movie, movieLog, handleWatched }) {
  return (
    <div className="episodes-container">
      {Array(movie.season_episode_details[season_i][1])
        .fill(0)
        .map((i, index) => i + index)
        .map((item) => (
          <Episode
            season_i={season_i}
            episode_i={item}
            key={+(String(movie.movie_id) + String(season_i) + String(item))}
            movie={movie}
            movieLog={movieLog}
            handleWatched={handleWatched}
          />
        ))}
    </div>
  );
}
