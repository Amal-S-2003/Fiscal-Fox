import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContext";
import { toast } from "react-hot-toast";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    const success = register(name, email, password);
    if (!success) {
      toast.error("User already exists.");
    } else {
      toast.success("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4 pt-4 pb-8">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg  overflow-hidden w-full max-w-5xl">
        {/* Left side: Image + Slogan */}
        <div className="hidden md:flex flex-col items-center rounded-r-4xl justify-center w-1/2 bg-blue-50 px-6 py-8 text-center">
          <img
            src="/girl.png"
            alt="Girl image"
            className="w-full max-w-xs mt-6 animate-fadeInSlow"
          />
          <img src="/logo.png" alt="Logo" className="w-40 mb-4" />
          <p className="text-gray-600 italic text-lg">
            "The Personal Money Tracker"
          </p>
        </div>

        {/* Right side: Form  */}
        <div className="w-full md:w-1/2 p-8 animate-fadeIn align-middle flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

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
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
