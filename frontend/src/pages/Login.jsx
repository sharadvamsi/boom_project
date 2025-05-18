import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      const { userId, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userId));
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate('/register')}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
