import { AuthContext } from "./Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import ProgressSquare from "./ProgressSquare";
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

  function renderMovieWatchList(i) {
    const { name, current_season, current_episode, movie_info } = movies(i);
    return (
      <div>
        <h1>{name}</h1>
        {movie_info.map((item) => (
          <ProgressSquare seasonNo={item[0]} episodeCount={item[1]} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>this is home page</h1>
    </div>
  );
}
