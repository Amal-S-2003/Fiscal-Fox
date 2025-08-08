import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className=" min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 bg-gray-50 text-gray-700">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
