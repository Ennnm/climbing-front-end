import react, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

const TripsList = ({ trips, setSelectedTrip }) => {
  const tripElems = trips.map((trip, i) => {
    const link = `/trips/${trip.id}`;
    return (
      <li key={`trip_${i.toString()}`}>
        <Link
          to={link}
          onClick={(e) => {
            setSelectedTrip(trip.id);
          }}
        >
          {trip.name}
        </Link>
      </li>
    );
  });

  return <ul>{tripElems}</ul>;
};

const Create = () => {
  const [name, setName] = useState('');

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    console.log('name :>> ', name);
    //create new trip in db using name
    axios
      .post(BACKEND_URL + '/trips', { name }, (req, res) => {
        console.log('req.body :>> ', req.body);
      })
      .then((result) => {
        console.log('result from creating trip :>> ', result.data);
        const tripId = result.data.id;
        setName('');
        history.push(`/trips/${tripId}`);
      })
      .catch((e) => {
        console.log('error in creating trip');
      });

    //push history trip id
  };

  return (
    <>
      <label>Trip name</label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button onClick={handleClick}>Submit</button>
    </>
  );
};

export default function CreateTrip({ setSelectedTrip, trips }) {
  // const [trips, setTrips] = useState([]);

  return (
    <>
      <Create />
      <TripsList trips={trips} setSelectedTrip={setSelectedTrip} />
    </>
  );
}
