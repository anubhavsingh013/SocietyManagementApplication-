import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setAuthenticated, setEmail } from '../redux/authSlice';

const Signup = () => {
  const email = useSelector((state) => state.auth.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignupSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    else if(password.length<=4){
      alert('Password Length should be greater than 4 character')
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/complete-signup', { email, password });
      dispatch(setAuthenticated(true));
      dispatch(setEmail(email));
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Update password</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="pl-0.5 block w-full py-1 border border-gray-300 rounded-md"
              value={email}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="pl-0.5 block w-full py-1 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="pl-0.5 block w-full py-1 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="button" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700" onClick={handleSignupSubmit}>Update</button>
        </form>
        <Link to="/login" className='underline'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
