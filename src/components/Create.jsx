import react, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

const RouteList = ({ trips }) => {
  const tripElems = trips.map((trip) => {
    return (
      <li>
        <h1>{trip.name}</h1>
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
    //create new trip in db using name
    axios
      .post(BACKEND_URL + '/routes', { name })
      .then((result) => {
        console.log('result from creating trip :>> ', result);
      })
      .catch((e) => {
        console.log('error in creating trip');
      });

    setName('');
    history.push('/trips');
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

export default function CreateTrip() {
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

  return (
    <>
      <Create />
      <RouteList trips={trips} />
    </>
  );
}
