import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../features/users/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

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
      await dispatch(register(userInfo));
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-24">
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <p className='m-4 text-center font-semibold text-gray-900 dark:text-white'>
        Already have an account - <Link to="/" className='text-blue-500'>Login</Link>
      </p>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default Register;
