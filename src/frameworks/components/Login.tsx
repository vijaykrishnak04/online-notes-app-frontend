// src/frameworks/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/users/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
       const actionResult = await dispatch(login(credentials));
      // If the actionResult is any, you might need to assert the type of the payload
      const token = (actionResult.payload as { token: string }).token; // Replace with the actual expected structure
      localStorage.setItem('userToken', token);
      navigate('/'); // Redirect to homepage or dashboard after successful login
    } catch (err) {
      // You might want to handle different kinds of errors differently
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={credentials.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      </label>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
