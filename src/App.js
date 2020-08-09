import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import NoMatch from "./NoMatch/NoMatch";
import { ExampleScreen } from "./components/ExampleScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ExampleScreen title="Initial" />
        </Route>
        <Route path="/:id/:hash">
          <ExampleScreen title="With param" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
