import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { Link } from "react-router-dom";

export default function FormAddMovie() {
  const { username, password } = useContext(AuthContext).credentials;

  const [movieName, setMovieName] = useState("");
  const [seasonEpisodeCount, setSeasonEpisodeCount] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    const { target } = event;
    target.name === "movieName" && setMovieName(target.value);
    if (target.name === "numSeason") {
      setSeasonEpisodeCount(new Array(+target.value).fill(0));
    }
  }

  function handleSeasonEpisodeCount(seasonNo) {
    const arr = seasonEpisodeCount.slice();
    return function handleEpisodeCount(episodeCount) {
      arr[seasonNo] = episodeCount;
      setSeasonEpisodeCount(arr);
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(seasonEpisodeCount);
    setIsSubmitted(true);
  }

  useEffect(() => {
    if (isSubmitted) {
      fetch("/api/movielist/v1.1/addmovie", {
        method: "POST",
        headers: {
          Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          details: seasonEpisodeCount,
          name: movieName,
        }),
      }).then((response) => console.log(response));
      setIsSubmitted(false);
    }
  });

  return (
    <div>
      <h1>hello {username}</h1>
      <Link to="/home"> {"<-"}</Link>
      <form onSubmit={handleSubmit}>
        <label>
          movie name:
          <input
            type="text"
            name="movieName"
            value={movieName}
            onChange={handleChange}
          />
        </label>
        <label>
          number of season:
          <input
            type="number"
            name="numSeason"
            value={seasonEpisodeCount.length}
            onChange={handleChange}
          />
        </label>
        <div>
          {seasonEpisodeCount.map((element, index) => (
            <Episode
              key={index}
              index={index}
              _value={element}
              handleEpisodeCount={handleSeasonEpisodeCount(index)}
            />
          ))}
        </div>

        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

function Episode({ index, _value, handleEpisodeCount }) {
  function handleChange(event) {
    const { target } = event;
    if (target.name === "numEpisode") handleEpisodeCount(+target.value);
  }
  return (
    <div>
      <label>
        {index + 1}:
        <input
          type="number"
          name="numEpisode"
          value={_value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
