import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  FaWallet,
  FaChartLine,
  FaLock,
  FaCheckCircle,
} from 'react-icons/fa';

function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pb-16">
        <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Left Section */}
          <div className="w-full lg:w-1/2">           

            {/* Headline */} 
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Manage Your <span className="italic text-blue-600">Money</span> Smartly
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-md mb-6 leading-relaxed">
              Take control of your finances with <strong>Fiscal-Fox</strong>. Easily track your <strong>income</strong> and <strong>expenses</strong>, view past transactions, and analyze your financial habits through helpful stats and charts.
            </p>

            {/* Register Button */}
            <div className="mb-6 flex gap-4">
              <Link to="/register">
                <button className="bg-blue-400  font-semibold px-10 py-2 rounded-full shadow hover:bg-blue-500 transition duration-300 text-white">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="border-2 border-blue-400 text-black font-semibold px-10 py-2 rounded-full shadow hover:bg-blue-100 transition duration-300">
                  Login
                </button>
              </Link>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-800 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">
                  <FaWallet className="text-lg" />
                </span>
                <div>
                  <p className="font-bold">Track Income & Expenses</p>
                  <p className="text-gray-600">Log all transactions and stay in control.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">
                  <FaChartLine className="text-lg" />
                </span>
                <div>
                  <p className="font-bold">Analyze with Charts</p>
                  <p className="text-gray-600">Visualize your spending with graphs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">
                  <FaLock className="text-lg" />
                </span>
                <div>
                  <p className="font-bold">Secure & Private</p>
                  <p className="text-gray-600">Your data is never shared.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">
                  <FaCheckCircle className="text-lg" />
                </span>
                <div>
                  <p className="font-bold">Simple & Efficient</p>
                  <p className="text-gray-600">Minimal interface. Powerful results.</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <p className="text-sm mt-8 italic text-gray-500">
              "Wealth is the ability to fully experience life." – Henry David Thoreau
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="/family.jpg"
              alt="Family saving money together"
              className="w-full rounded-xl shadow-2xl transition duration-500 transform hover:scale-105"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
