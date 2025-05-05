import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/auth";
import { CircleUserRound, Heart, LogOut, UserPen } from "lucide-react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // for mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // for profile dropdown

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Menu open: show X, closed: show Hamburger */}
                {menuOpen ? (
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo and desktop menu */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                        isActive ? 'bg-gray-900 text-white' : ''
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/about"}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                        isActive ? 'bg-gray-900 text-white' : ''
                      }`
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to={"/contact"}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                        isActive ? 'bg-gray-900 text-white' : ''
                      }`
                    }
                  >
                    Contact Us
                  </NavLink>
                  {auth?.user?.role === 1 ? (
                    <>
                      <NavLink
                        to={"/dashboard/admin"}
                        className={({ isActive }) =>
                          `rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                            isActive ? 'bg-gray-900 text-white' : ''
                          }`
                        }
                      >
                        Admin
                      </NavLink>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {/* Notification and Profile */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2.5">
              <button
                type="button"
                className="relative rounded-full p-1 hover:text-gray-600"
              >
                <span className="sr-only">View notifications</span>
                <Link to={'/dashboard/user/favorites'}><Heart className="w-5 h-5" /></Link>
              </button>

              {!auth?.user ? (
                <Link
                  to={"/login"}
                  className="rounded-md px-3 py-2 text-sm text-gray-300"
                >
                  <button className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-white">
                    Login
                  </button>
                </Link>
              ) : (
                <>
                  {/* Profile dropdown */}
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        onClick={toggleProfile}
                        className="relative flex rounded-full hover:text-gray-600 text-sm focus:outline-none "
                        id="user-menu-button"
                        aria-expanded={profileOpen}
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <CircleUserRound className="hover:" />
                        {/* <img
                          className="size-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Profile"
                        /> */}
                      </button>
                    </div>

                    {/* Profile dropdown menu */}
                    {profileOpen && (
                      <ClickAwayListener
                        onClickAway={() => setProfileOpen(false)}
                      >
                        <div
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                        >
                          <button className="text-left w-full px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-800 hover:text-white">
                            <Link
                              to={"/dashboard/user/profile"}
                              className="flex gap-2 items-center"
                              role="menuitem"
                            >
                              <UserPen className="w-5 h-5" /> Your Profile
                            </Link>
                          </button>
                          <button
                            className="flex gap-2 w-full items-center px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-800 hover:text-white"
                            role="menuitem"
                            onClick={() => {
                              setProfileOpen(false);
                              handleLogout();
                            }}
                          >
                            <LogOut className="w-5 h-5" /> Logout
                          </button>
                        </div>
                      </ClickAwayListener>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu links */}
        {menuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-900 text-white' : ''
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-900 text-white' : ''
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-900 text-white' : ''
                  }`
                }
              >
                Contact Us
              </NavLink>
              {auth?.user?.role === 1 ? (
                    <>
                      <NavLink
                        to={"/dashboard/admin"}
                        className={({ isActive }) =>
                          `block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white ${
                            isActive ? 'bg-gray-900 text-white' : ''
                          }`
                        }
                      >
                        Admin
                      </NavLink>
                    </>
                  ) : (
                    ""
                  )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
