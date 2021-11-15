import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Create from './components/Create';
import Trips from './components/Trips';
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/create">Create Trip</Link>
            </li>
            <li>
              <Link to="/Trips">Trips</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/create" exact component={Create} />
          <Route path="/trips" exact component={Trips} />
        </Switch>
      </div>
    </Router>
  );
}
