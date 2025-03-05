import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const API_BASE_URL = 'https://canteenxpress-server.onrender.com'; // Backend URL

const Register = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    classroomAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNextStep = (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.classroomAddress) {
      setError('Please enter your classroom address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send registration data to backend
      await axios.post(`${API_BASE_URL}/users/register`, userData); // Ensure correct backend endpoint

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600">
            Sign in
          </Link>
        </p>

        {/* Step Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step === 1 ? 'bg-gray-300' : 'bg-orange-500'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleNextStep}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={userData.confirmPassword}
                  onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-600">
              Next
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Classroom Address</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Enter your classroom building, floor, and room number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={userData.classroomAddress}
                  onChange={(e) => setUserData({ ...userData, classroomAddress: e.target.value })}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="button" onClick={handlePrevStep} className="flex-1 py-2 px-4 border rounded-md">
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
