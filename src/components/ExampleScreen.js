import React from "react";
import { useParams } from "react-router-dom";
import logo from "../logo.svg";

export const ExampleScreen = ({ title = "Nothing" }) => {
  let { id, hash } = useParams();
  console.log(id, hash);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </header>
    </div>
  );
};
