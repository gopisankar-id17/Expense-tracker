import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
      setSuccess('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
      if (onSignUp) onSignUp();
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
