import { AuthContext } from "./Auth/AuthProvider";
import { useContext, useEffect, useReducer } from "react";
import MovieList from "./MovieList";
// action types
const initial_fetch = "initial_fetch";
const update_status = "update_status";
const watched = "watched";
// initial state values
const EMPTY = "UPDATE_FIELD_VALUE";
const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

const INITIAL_STATE = {
  watchlist: {},
  watchlist_log: {},
  status: EMPTY,
};
function movieReducer(state, action) {
  switch (action.type) {
    case initial_fetch:
      return {
        watchlist: action.payload.watchlist,
        watchlist_log: action.payload.watchlist_log,
        status: action.payload.status,
      };
    case update_status:
      return { ...state, status: action.payload.status };
    case watched:
      const a = {
        [action.payload.movie_id]: [
          ...state.watchlist_log[action.payload.movie_id],
          {
            episode: action.payload.episode,
            season: action.payload.season,
            watch_time: action.payload.watch_time,
          },
        ],
      };
      return {
        watchlist: state.watchlist,
        watchlist_log: { ...state.watchlist_log, ...a },
        status: state.status,
      };
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(movieReducer, INITIAL_STATE);

  const { username, password } = useContext(AuthContext).credentials;

  function handleWatched(movie_id, season, episode, watch_time) {
    dispatch({
      type: watched,
      payload: {
        movie_id,
        season,
        episode,
        watch_time,
      },
    });
  }
  useEffect(() => {
    dispatch({ type: update_status, payload: { status: PENDING } });

    fetch("/api/movielist/v1.1/movieslog", {
      headers: {
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: initial_fetch,
          payload: {
            watchlist: data.watchlist,
            watchlist_log: data.watchlist_log,
            status: SUCCESS,
          },
        });
      });
  }, []);

  return (
    <div>
      <h1>this is home page</h1>
      {state.status === SUCCESS ? (
        <MovieList state={state} handleWatched={handleWatched} />
      ) : (
        <h1>is loading ... </h1>
      )}
    </div>
  );
}
