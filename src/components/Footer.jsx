import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 pt-8 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo & App Info */}
        <div className="flex flex-col">
          <img src="/logo.png" alt="logo" className="w-52" />
          <p className="text-sm text-gray-600 max-w-xs">
            Manage your finances with ease. Track your income, expenses, and
            build financial confidence every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-700 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-700 transition">
                Register
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-700 transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/*  Message */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Why FiscalFox?
          </h3>
          <p className="text-sm text-gray-600 max-w-sm">
            Because money management should be simple, visual, and smart — no
            more guesswork in your monthly spending.
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t-1  border-grey-50 p-6  text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-blue-700">Fiscal-Fox</span>. All
        rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
