import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setEmail } from '../redux/authSlice';

const Login = () => {
    const email = useSelector((state) => state.auth.email);
    
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginClick = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            const data = response.data;
            const arr=data.split("+");
            const role=arr[0];
            const pass=arr[1];
            
            if(pass!==password){
                alert("Password is incorrect");
                return;
            }

            dispatch(setAuthenticated({ isAuthenticated: true, email, role }));
            
            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'owner') {
                navigate('/owner-dashboard');
            } else if (role === 'tenant') {
                navigate('/tenant-dashboard');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">Login</h2>
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
                    <button type="button" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700" onClick={handleLoginClick}>Login</button>
                </form>
                <Link to="/signup" className='underline'>
                    Forgot Password
                </Link>
            </div>
        </div>
    );
};

export default Login;
