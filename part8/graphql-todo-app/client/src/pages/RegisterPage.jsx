import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../queries';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { error }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ variables: { username, password } });
      alert('Registration successful! You can now log in.');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default RegisterPage;
