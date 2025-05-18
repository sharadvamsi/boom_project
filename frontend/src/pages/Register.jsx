import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register', { email, password });
      navigate('/login');
    } catch (err) {
     toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Register</h2>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
