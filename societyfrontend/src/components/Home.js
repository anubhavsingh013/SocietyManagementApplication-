import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setEmail, setAuthenticated } from '../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [passwordSetRequired, setpasswordSetRequired] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEnterClick = async () => {
    if (!validateEmail(emailInput)) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/check-email', { email: emailInput });
      
       if (response.data === "email and password exist") {
        dispatch(setEmail(emailInput));
        navigate('/login');
      }
      else if (response.data === "Email exists. You can set your password.") {
        setpasswordSetRequired(true);
      }  else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleSignupSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    } else if (password.length < 4) {
      alert('Password Length should be greater than 3 characters');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/complete-signup', { email: emailInput, password });
      dispatch(setEmail(emailInput));
        navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setEmailInput('');
  };

  const toggleEmailVisibility = () => {
    setEmailVisible(!emailVisible);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Society App</h2>
        {!passwordSetRequired ? (
          <form className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type={emailVisible ? 'text' : 'email'}
                id="email"
                className="pl-0.5 block w-full py-1 border border-gray-300 rounded-md"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <button type="button" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700" onClick={handleEnterClick}>Enter</button>
          </form>
        ) : (
          <form className="space-y-6">
             <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type={emailVisible ? 'text' : 'email'}
                id="email"
                className="pl-0.5 block w-full py-1 border border-gray-300 rounded-md"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              {/* <span
                className="absolute inset-y-0 right-0 mt-3 flex items-center pr-3 cursor-pointer"
                onClick={toggleEmailVisibility}
              >
                <FontAwesomeIcon icon={emailVisible ? faEyeSlash : faEye} />
              </span> */}
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
            <button type="button" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700" onClick={handleSignupSubmit}>Sign Up</button>
          </form>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p>Email not found. Please contact the owner or admin.</p>
            <button className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
 