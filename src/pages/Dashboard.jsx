import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt, FaWater, FaTemperatureHigh, FaCloud, FaPumpSoap, FaToggleOn,
} from 'react-icons/fa';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState({
    soil_moisture: 0,
    soil_temp: 0,
    tank_level: 0,
    ambient_temp: 0,
    humidity: 0,
    irrigation_mode: 'Auto',
    irrigation_state: false,
    pump_river: false,
    pump_farmland: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.141.120.181:5000/sensors');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 mt-20 max-w-7xl">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaTachometerAlt className="inline-block mr-2 text-blue-600" /> Real-Time Dashboard
        </motion.h2>

        {/* Sensor Data Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Soil Moisture', value: data.soil_moisture, unit: '%', icon: <FaWater className="text-blue-500" /> },
            { title: 'Soil Temp', value: data.soil_temp, unit: '°C', icon: <FaTemperatureHigh className="text-red-500" /> },
            { title: 'Tank Level', value: data.tank_level, unit: 'cm', icon: <FaWater className="text-blue-500" /> },
            { title: 'Ambient Temp', value: data.ambient_temp, unit: '°C', icon: <FaTemperatureHigh className="text-red-500" /> },
            { title: 'Humidity', value: data.humidity, unit: '%', icon: <FaCloud className="text-blue-400" /> },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 text-center">{item.title}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2 text-center">
                {item.value.toFixed(1)} <span className="text-gray-500 text-base">{item.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Irrigation and Actuator Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[
            { title: 'Irrigation Mode', value: data.irrigation_mode, icon: <FaToggleOn className="text-blue-500" /> },
            { title: 'Irrigation State', value: data.irrigation_state ? 'On' : 'Off', icon: <FaWater className={data.irrigation_state ? 'text-green-500' : 'text-red-500'} /> },
            { title: 'Pump (River)', value: data.pump_river ? 'On' : 'Off', icon: <FaPumpSoap className={data.pump_river ? 'text-green-500' : 'text-red-500'} /> },
            { title: 'Pump (Farmland)', value: data.pump_farmland ? 'On' : 'Off', icon: <FaPumpSoap className={data.pump_farmland ? 'text-green-500' : 'text-red-500'} /> },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 text-center">{item.title}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2 text-center">
                {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;