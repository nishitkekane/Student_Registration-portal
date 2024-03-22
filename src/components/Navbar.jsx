import React, { useState } from "react";
import { navLinks } from "../constants/index";
import { ToggleTheme } from "./Extra/ToggleTheme";
import { Button } from "./ui/button";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-10 bg-gray-200 dark:bg-gray-800 p-2 rounded-full"
        onClick={() => setShowNav(!showNav)}
      >
        {showNav ? "Close" : "Menu"}
      </button>

      {/* Navigation Menu */}
      {showNav && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 z-20">
          <div className="absolute top-0 bottom-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
            {/* Nav Links */}
            <ul className="py-8">
              {navLinks.map((item, index) => (
                <li key={index} className="my-4">
                  <Link to={item.route} onClick={() => setShowNav(false)}>
                    <Button
                      variant="ghost"
                      className="px-3 py-2 text-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Theme Change Button And Login/Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-col gap-3 items-center">
                {token ? (
                  <Button
                    variant="link"
                    className="text-lg"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button variant="link" className="text-lg">
                      Login
                    </Button>
                  </Link>
                )}

                <ToggleTheme />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="hidden lg:flex justify-between items-center text-center w-full px-3 rounded-md py-4 shadow-lg bg-green-300 shadow-green-600 dark:shadow-purple-800 dark:bg-purple-500">
        {/* Logo */}
        <div className="text-lg font-bold">
          <img
            src={Logo}
            className="h-8 drop-shadow-none inline"
            alt="Logo"
          ></img>
          VJTI Portal
        </div>

        {/* Nav Links */}
        <ul className="flex justify-between">
          {navLinks.map((item, index) => (
            <li key={index} className="mx-6">
              <Link to={item.route}>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-lg hover:border-2 hover:bg-white hover:border-green-500 hover:text-green-800 dark:hover:border-purple-800 dark:hover:text-pruple-300"
                >
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Change Button */}
        <div className="ml-6 flex gap-3 items-center">
          {token ? (
            <Button variant="link" className="text-lg" onClick={logoutHandler}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="link" className="text-lg">
                Login
              </Button>
            </Link>
          )}
          <ToggleTheme />
        </div>
      </div>

      {/* Displaying the child */}
      <Outlet />
    </>
  );
};

export default Navbar;
