import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/one-page-wonder.min.css';
import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import NoMatch from './NoMatch/NoMatch';
import { firebaseConfig } from './firebaseConfig';
import { Sofia } from './templates/Sofia';
import { DeciderTemplate } from './DeciderTemplate';
import { LoginPages } from './pages/login/LoginPages';
import { Dashboard } from './pages/Dashboard/Dashboard';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// if (window.location.hostname === 'localhost') {
//   firebase.firestore().settings({
//     host: 'localhost:8080',
//     ssl: false,
//   });
// }

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPages />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
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
