import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/users/userSlice';
import { resetState } from '../../features/notes/noteSlice';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
    navigate('/');
  };

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <nav className="bg-gray-100 dark:bg-gray-800 bg-opacity-95 shadow-lg fixed w-full z-30 top-0 start-0 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/notes" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Easy Notes</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleLogout}>Log Out</button>
          </div>
          <div className="flex items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/notes" className="block py-2 px-3 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
              </li>
              {/* Add other navigation links here */}
            </ul>
            <button onClick={toggleTheme} className="rounded p-2 transition duration-300 ease-in-out focus:outline-none">
              {theme === 'light' ? <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" /> : <SunIcon className="h-6 w-6 text-gray-200 dark:text-yellow-500" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
