import react, { useState } from 'react';
import { useHistory } from 'react-router';
import { createLoginCookie } from '../utils/cookies';
export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createLoginCookie(username);
    setUserName('');
    setPassword('');
    history.push('/trips');
  };

  console.log('in login');
  return (
    <>
      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
      ></input>
      <label>password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button onClick={handleSubmit}> Submit</button>
    </>
  );
}
