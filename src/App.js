import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import CreateTrip from './components/Create';
import Trips from './components/Trips';
import EditTrip from './components/EditTrip';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

export default function App() {
  const [selectedTripIndex, setSelectedTrip] = useState();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get(BACKEND_URL + '/trips')
      .then((result) => {
        console.log('results from trip index :>> ', result.data.trips);
        setTrips(result.data.trips);
      })
      .catch((e) => {
        console.log('error in getting trip index');
      });
  }, []);

  const onDeepLink = (itemIndex) => {
    setSelectedTrip(itemIndex);
  };
  const selectedTrip = trips[selectedTripIndex - 1];
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
          <Route path="/trips/:id">
            <EditTrip item={selectedTrip} onDeepLink={onDeepLink} />
          </Route>
          <Route path="/login" exact component={Login} />
          <Route path="/create">
            <CreateTrip
              setSelectedTrip={setSelectedTrip}
              trips={trips}
              setTrips={setTrips}
            />
          </Route>
          <Route path="/trips" exact component={Trips} />
        </Switch>
      </div>
    </Router>
  );
}
