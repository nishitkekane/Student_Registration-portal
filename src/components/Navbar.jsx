import React from 'react'
import { navLinks } from '../constants/index'
import { ToggleTheme } from './Extra/ToggleTheme'
import { Button } from './ui/button'
import { Outlet, Link, useNavigate } from 'react-router-dom'

// TODO: Add nav for phone.
const Navbar = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <>
      <div className="flex justify-between items-center text-center w-full px-3 rounded-md py-4 shadow-lg bg-green-300 shadow-green-600 dark:shadow-purple-800 dark:bg-purple-500 max-lg:hidden">
        {/* Logo. */}
        <div className="text-lg font-bold">VJTI Portal</div>

        {/* Nav Links. */}
        <ul className="flex justify-between">
          {navLinks.map((item, index) => {
            return (
              <li key={index} className="mx-6">
                {/* Nav Links! */}
                <Link to={item.route}>
                  <Button
                    variant="ghost"
                    className="px-3 py-2 text-lg hover:border-2 hover:bg-white hover:border-green-500 hover:text-green-800 dark:hover:border-purple-800 dark:hover:text-pruple-300"
                  >
                    {item.name}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Theme Change Button And Login! */}
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

      {/* Displaying the child! */}
      <Outlet />
    </>
  )
}

export default Navbar
