import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

const Screen = () => {
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
          Learn React
        </a>
      </header>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                init
              </a>
            </header>
          </div>
        </Route>
        <Route path="/:id/:hash">
          <Screen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
