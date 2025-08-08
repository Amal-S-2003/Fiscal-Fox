import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../contextAPI/AuthContext";
import toast, { Toaster } from "react-hot-toast";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!");
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-full transition ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;
  const navLinks = (
    <>
      <NavLink to="/" className={navClass}>Home</NavLink>
      <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
      <NavLink to="/transactions" className={navClass}>Transactions</NavLink>
      <NavLink to="/add" className={navClass}>Add</NavLink>
    </>
  );


  return (
    <>
      <nav className="bg-white  px-10 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-[150px] sm:w-[180px]" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4 ">
          {user && <div className="flex gap-3">{navLinks}</div>}
          <div className="relative dropdown">
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50"
              >
                {user.name}
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Login
              </Link>
            )}

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-red-500 shadow-md rounded">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="sm:hidden">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-7 h-7 text-blue-600" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-blue-700">Menu</h2>
          <button onClick={() => setMobileOpen(false)}>
            <X className="w-6 h-6 text-blue-600" />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-3">
          {user && navLinks}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default Navbar;
