import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.nav
      className="bg-blue-600 text-white py-4 shadow-md fixed w-full top-0 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Smart Irrigation</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-gray-200 transition-colors duration-200'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-gray-200 transition-colors duration-200'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/control"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-gray-200 transition-colors duration-200'
            }
          >
            Control
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-gray-200 transition-colors duration-200'
            }
          >
            History
          </NavLink>
          <NavLink
            to="/ai-recommendations"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-gray-200 transition-colors duration-200'
            }
          >
            AI Recommendation
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;