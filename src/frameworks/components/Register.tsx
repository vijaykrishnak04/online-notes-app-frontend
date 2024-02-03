// src/frameworks/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful registration
import { register } from '../../features/users/userSlice';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(register(userInfo))
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      // You might want to handle different kinds of errors differently
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={userInfo.username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
