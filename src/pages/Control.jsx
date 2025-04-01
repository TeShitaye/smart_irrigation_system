import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPowerOff, FaWater } from 'react-icons/fa';
import axios from 'axios';

function Control() {
  const [irrigation, setIrrigation] = useState(false);

  const toggleIrrigation = async () => {
    try {
      await axios.post('http://<RASPBERRY_PI_IP>:5000/control', {
        irrigation: !irrigation,
      });
      setIrrigation(!irrigation);
    } catch (error) {
      console.error('Error controlling irrigation:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FaPowerOff className="inline-block mr-2 text-blue-600" /> Control Panel
      </motion.h2>
      <motion.div
        className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center space-y-6">
          <p className="text-lg font-semibold text-gray-700">
            Irrigation Status: 
            <span className={irrigation ? 'text-green-500' : 'text-red-500'}>
              {irrigation ? ' ON' : ' OFF'}
            </span>
          </p>
          <motion.button
            onClick={toggleIrrigation}
            className={`flex items-center justify-center w-full py-3 px-6 rounded-lg text-white font-medium ${
              irrigation ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWater className="mr-2" />
            {irrigation ? 'Stop Irrigation' : 'Start Irrigation'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Control;