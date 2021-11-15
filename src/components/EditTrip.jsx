import react, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

export default function EditTrip({ item, onDeepLink }) {
  const [routes, setRoutes] = useState([]);
  let { id } = useParams();
  console.log('id :>> ', id);
  useEffect(() => {
    if (!item) {
      onDeepLink(id);
      //get all routes for this trip
      axios
        .get(BACKEND_URL + `/trip/${item.id}/routes`)
        .then((result) => {
          console.log('result from edit Trip :>> ', result);
        })
        .catch((e) => {
          console.log('error in getting trip routes');
        });
    }
  }, []);
  console.log('item :>> ', item);
  //allow user to add more routes
  return <h1>{item.name}</h1>;
}
//TODO ref itemdetail!
