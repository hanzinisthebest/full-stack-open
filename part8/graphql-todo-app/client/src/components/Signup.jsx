import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../queries';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useMutation(REGISTER_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ variables: { username, password } });
      alert('Signup successful!');
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
