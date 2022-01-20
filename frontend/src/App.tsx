import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`
    );

    fetch(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
