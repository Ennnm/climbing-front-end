import react, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';
const CreateRoute = ({ addRoute, tripId }) => {
  const [name, setName] = useState('');
  const [difficulty, setDiff] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BACKEND_URL + `/routes`, { name, difficulty, tripId })
      .then((result) => {
        console.log('reuslt from creating new route:>> ', result.data);
        addRoute(result.data);
      })
      .catch((e) => {
        console.log('error in submitting route', e);
      });
  };
  return (
    <>
      <label>Route:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <label>difficulty:</label>
      <input
        type="number"
        onChange={(e) => setDiff(e.target.value)}
        value={difficulty}
      ></input>
      <button onClick={handleSubmit}> Submit</button>
    </>
  );
};
const RouteList = ({ items }) => {
  const routeElems = items.map((route, i) => {
    const key = `route_${i.toString()}`;
    return (
      <div key={key}>
        <h3>{route.name}</h3>
        <h5>Difficulty: {route.difficulty}</h5>
      </div>
    );
  });

  return <>{routeElems}</>;
};

export default function EditTrip({ item, onDeepLink }) {
  const [routes, setRoutes] = useState([]);
  let { id } = useParams();
  console.log('id :>> ', id);
  useEffect(() => {
    if (!item) {
      console.log('runing in if');
      onDeepLink(id);
      //get all routes for this trip
    }
    axios
      .get(BACKEND_URL + `/trips/${item.id}/routes`)
      .then((result) => {
        console.log('result from edit Trip :>> ', result);
        setRoutes(result.data);
      })
      .catch((e) => {
        console.log('error in getting trip routes', e);
      });
  }, []);

  const addRoute = (route) => {
    setRoutes([...routes, route]);
  };

  console.log('item :>> ', item);
  //allow user to add more routes
  return (
    <>
      <h1>{item.name}</h1>
      <CreateRoute addRoute={addRoute} tripId={id} />
      <RouteList items={routes} />
    </>
  );
}
//TODO ref itemdetail!
//INCONSITENCEY OF DB SERVER WHY? CRASH ONCE CRASH 4EVA?
