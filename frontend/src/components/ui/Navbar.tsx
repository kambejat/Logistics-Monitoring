import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";
import useAuth from "../context/useAuth";
import useDarkSide from "./useDarkSide";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface SidebarProps {
  toggleSidebar: () => void;
  handleTabChange: (tabNumber: number) => void;
}

const Navbar: React.FC<SidebarProps> = ({ toggleSidebar, handleTabChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const authContext = useContext(AuthContext);
  const [user] = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!authContext) {
    return null; // or return a fallback UI
  }

  const { logoutUser } = authContext;

  const handleLogout = () => {
    logoutUser();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleDarkModeToggle = () => {
    setTheme(colorTheme);
    setDarkSide(!darkSide);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full shadow-sm bg-white border-gray-200" dark:bg-gray-800`}
      >
        <div className="px-2 py-2 lg:px-1 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <span className="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Logistics Monitoring
              </span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleDarkModeToggle()}
                className="p-2  focus:outline-none "
              >
                {darkSide ? (                 
                  <LightModeIcon className="w-6 h-6  dark:text-white" />
                ) : (
                  <DarkModeIcon />
                )}
              </button>
              <div className="flex items-center ms-3 relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                  onClick={handleDropdownToggle}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.image_url}
                    alt="user photo"
                  />
                </button>
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-48 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 border border-gray-200 z-50 transform transition duration-300 ease-in-out ${
                    isDropdownOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user.first_name} {user.last_name}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user.username}
                    </p>
                  </div>
                  <div className="py-1">
                    <a
                      onClick={() => handleTabChange(1)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                    <a
                      onClick={() => handleTabChange(7)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>

                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
