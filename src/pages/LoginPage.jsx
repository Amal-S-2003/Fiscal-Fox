import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contextAPI/AuthContext';
import { toast } from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } =useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
const email = formData.email.trim();
  const password = formData.password.trim();

    if (!email || !password) {
      toast.error('Email and password are required.');
      return;
    }

    const success = login(email, password);
    if (!success) {
      toast.error('Invalid credentials.');
    } else {
      toast.success('Login successful!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4 pt-4 pb-8">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        
        {/* Left side: Form */}
       

        <div className="w-full md:w-1/2 p-8 animate-fadeIn flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition font-medium"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
        {/* Right side:  Image + Logo + Slogan */}
         <div className="hidden md:flex flex-col items-center justify-center rounded-l-4xl w-1/2 bg-blue-50 px-6 py-8 text-center">
          <img
            src="/boy.png"
            alt="Boy image"
            className="w-full max-w-xs mt-6 animate-fadeInSlow"
          />
          <img src="/logo.png" alt="Logo" className="w-40 mb-4" />
          <p className="text-gray-600 italic text-lg">"The Personal Money Tracker"</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
