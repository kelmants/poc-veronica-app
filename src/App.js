import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/one-page-wonder.min.css";
import React from "react";
import * as firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import NoMatch from "./NoMatch/NoMatch";
import { firebaseConfig } from "./firebaseConfig";
import { Sofia } from "./templates/Sofia";
import { DeciderTemplate } from "./DediderTemplate";
import { LoginPages } from "./pages/login/LoginPages";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPages />
        </Route>
        <Route exact path="/">
          <Sofia />
        </Route>
        <Route path="/:hash">
          <DeciderTemplate />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
