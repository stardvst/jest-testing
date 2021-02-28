//import "./App.css";

import DataFetch from "./DataFetch";
import React from "react";
import axios from "axios";
import { hot } from "react-hot-loader";

export const dataReducer = (state, action) => {
  if (action.type === "SET_ERROR") {
    return { ...state, list: [], error: true };
  }

  if (action.type === "SET_LIST") {
    return { ...state, list: action.list, error: null };
  }

  throw new Error();
};

const initialData = {
  list: [],
  error: null,
};

const getUser = () => {
  return Promise.resolve({ id: 1, name: "Robin" });
};

const App = () => {
  const [counter, setCounter] = React.useState(0);
  const [data, dispatch] = React.useReducer(dataReducer, initialData);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=react")
      .then((response) => {
        dispatch({ type: "SET_LIST", list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: "SET_ERROR" });
      });

    (async () => {
      const user = await getUser();
      setUser(user);
    })();
  }, []);

  return (
    <div>
      <h1>{user ? `${user.name}s Counter` : ""}</h1>
      <Counter counter={counter} />

      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>

      <button type="button" onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>

      <h2>My Async Data</h2>

      {data.error && <div className="error">Error</div>}

      <ul>
        {data.list.map((item) => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const Counter = ({ counter, onChange = null }) => (
  <div>
    <p>{counter}</p>
    <input type="text" onChange={onChange} />
  </div>
);

export const sum = (a, b) => a + b;

export default hot(module)(App);
