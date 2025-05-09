import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPowerOff, FaPumpSoap, FaToggleOn, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

function Control() {
  const [controls, setControls] = useState({
    irrigation_mode: 'Auto',
    pump_river: false,
    pump_farmland: false,
  });
  const [error, setError] = useState(null);
  const apiUrl = 'http://<RASPBERRY_PI_IP>:5000/control'; // Replace with your Pi's IP

  // Fetch initial control states
  useEffect(() => {
    const fetchControls = async () => {
      try {
        const response = await axios.get(apiUrl);
        setControls({
          irrigation_mode: response.data.irrigation_mode,
          pump_river: !!response.data.pump_river,
          pump_farmland: !!response.data.pump_farmland,
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch control states. Check connection.');
      }
    };
    fetchControls();
  }, []);

  // Toggle pump control
  const toggleControl = async (key) => {
    const newControls = {
      ...controls,
      [key]: !controls[key],
      irrigation_mode: key !== 'irrigation_mode' ? 'Manual' : controls.irrigation_mode,
    };
    try {
      await axios.post(apiUrl, {
        irrigation_mode: newControls.irrigation_mode,
        pump_river: newControls.pump_river ? 1 : 0,
        pump_farmland: newControls.pump_farmland ? 1 : 0,
      });
      setControls(newControls);
      setError(null);
    } catch (err) {
      setError(`Error updating ${key}. Try again.`);
    }
  };

  // Toggle irrigation mode
  const toggleMode = async () => {
    const newMode = controls.irrigation_mode === 'Auto' ? 'Manual' : 'Auto';
    try {
      await axios.post(apiUrl, {
        irrigation_mode: newMode,
        pump_river: controls.pump_river ? 1 : 0,
        pump_farmland: controls.pump_farmland ? 1 : 0,
      });
      setControls((prev) => ({ ...prev, irrigation_mode: newMode }));
      setError(null);
    } catch (err) {
      setError('Error switching mode.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-gray-100 to-blue-50 py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaPowerOff className="inline-block mr-2 text-blue-600" /> Control Panel
        </motion.h2>

        {/* Note */}
        <motion.div
          className="bg-yellow-100 p-4 rounded-lg mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-700">
            Note: Using resistive soil moisture sensor. Calibrate for accurate readings (wet ~200, dry ~1000).
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            className="bg-red-100 p-4 rounded-lg mb-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Control Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pump River Control */}
          <motion.div
            className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaPumpSoap className="text-green-500 mr-2" /> River Pump
            </h3>
            <p className="text-gray-600 mb-4">
              Status: <span className={controls.pump_river ? 'text-green-500' : 'text-red-500'}>
                {controls.pump_river ? 'ON' : 'OFF'}
              </span>
            </p>
            <motion.button
              onClick={() => toggleControl('pump_river')}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                controls.pump_river ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {controls.pump_river ? 'Turn Off' : 'Turn On'}
            </motion.button>
          </motion.div>

          {/* Pump Farmland Control */}
          <motion.div
            className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaPumpSoap className="text-green-500 mr-2" /> Farmland Pump
            </h3>
            <p className="text-gray-600 mb-4">
              Status: <span className={controls.pump_farmland ? 'text-green-500' : 'text-red-500'}>
                {controls.pump_farmland ? 'ON' : 'OFF'}
              </span>
            </p>
            <motion.button
              onClick={() => toggleControl('pump_farmland')}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                controls.pump_farmland ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {controls.pump_farmland ? 'Turn Off' : 'Turn On'}
            </motion.button>
          </motion.div>

          {/* Irrigation Mode Toggle */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaToggleOn className="text-blue-500 mr-2" /> Irrigation Mode
            </h3>
            <p className="text-gray-600 mb-4">
              Mode: <span className="font-bold">{controls.irrigation_mode}</span>
            </p>
            <motion.button
              onClick={toggleMode}
              className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Switch to {controls.irrigation_mode === 'Auto' ? 'Manual' : 'Auto'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Control;