import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt, FaWater, FaLeaf, FaTemperatureHigh, FaLightbulb,
  FaCloudRain, FaPumpSoap, FaBatteryFull, FaToggleOn, FaSun, FaCloud,
} from 'react-icons/fa';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState({
    soil_moisture_1: 0,
    soil_moisture_2: 0,
    soil_moisture_3: 0,
    soil_moisture_4: 0,
    soil_ph: 7.0,
    soil_ec: 0,
    soil_temp: 0,
    tank_level: 0,
    ambient_temp: 0,
    humidity: 0,
    light_intensity: 0,
    rain_status: false,
    irrigation_mode: 'Auto',
    irrigation_state: false,
    pump_river: false,
    pump_farmland: false,
    valve_state: false,
    servo_position: 0,
    battery_level: 100,
    system_status: 'Online',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://<RASPBERRY_PI_IP>:5000/');
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
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaTachometerAlt className="inline-block mr-2 text-blue-600" /> Real-Time Dashboard
        </motion.h2>

        {/* System Status Overview */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mb-8 flex justify-between items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-lg font-semibold">
            System Status: <span className={data.system_status === 'Online' ? 'text-green-500' : 'text-red-500'}>{data.system_status}</span>
          </div>
          <div className="text-lg">
            Battery Level: <span className="font-bold">{data.battery_level}%</span> <FaBatteryFull className="inline-block ml-2 text-green-500" />
          </div>
        </motion.div>

        {/* Sensor Data Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Soil Sensors */}
          {[
            { title: 'Soil Moisture 1', value: data.soil_moisture_1, unit: '%', icon: <FaWater className="text-blue-500" /> },
            { title: 'Soil Moisture 2', value: data.soil_moisture_2, unit: '%', icon: <FaWater className="text-blue-500" /> },
            { title: 'Soil Moisture 3', value: data.soil_moisture_3, unit: '%', icon: <FaWater className="text-blue-500" /> },
            { title: 'Soil Moisture 4', value: data.soil_moisture_4, unit: '%', icon: <FaWater className="text-blue-500" /> },
            { title: 'Soil pH', value: data.soil_ph, unit: '', icon: <FaLeaf className="text-green-500" /> },
            { title: 'Soil EC', value: data.soil_ec, unit: 'µS/cm', icon: <FaLeaf className="text-green-500" /> },
            { title: 'Soil Temp', value: data.soil_temp, unit: '°C', icon: <FaTemperatureHigh className="text-red-500" /> },
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

          {/* Environmental Sensors */}
          {[
            { title: 'Tank Level', value: data.tank_level, unit: 'cm', icon: <FaWater className="text-blue-500" /> },
            { title: 'Ambient Temp', value: data.ambient_temp, unit: '°C', icon: <FaTemperatureHigh className="text-red-500" /> },
            { title: 'Humidity', value: data.humidity, unit: '%', icon: <FaCloud className="text-blue-400" /> },
            { title: 'Light Intensity', value: data.light_intensity, unit: 'lux', icon: <FaLightbulb className="text-yellow-500" /> },
            { title: 'Rain Status', value: data.rain_status ? 'Raining' : 'Dry', unit: '', icon: <FaCloudRain className="text-gray-500" /> },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 7) * 0.1 }}
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 text-center">{item.title}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2 text-center">
                {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}{' '}
                <span className="text-gray-500 text-base">{item.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Irrigation and Actuator Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Irrigation Mode', value: data.irrigation_mode, icon: <FaToggleOn className="text-blue-500" /> },
            { title: 'Irrigation State', value: data.irrigation_state ? 'On' : 'Off', icon: <FaWater className={data.irrigation_state ? 'text-green-500' : 'text-red-500'} /> },
            { title: 'Pump (River)', value: data.pump_river ? 'On' : 'Off', icon: <FaPumpSoap className={data.pump_river ? 'text-green-500' : 'text-red-500'} /> },
            { title: 'Pump (Farmland)', value: data.pump_farmland ? 'On' : 'Off', icon: <FaPumpSoap className={data.pump_farmland ? 'text-green-500' : 'text-red-500'} /> },
            { title: 'Valve State', value: data.valve_state ? 'Open' : 'Closed', icon: <FaWater className={data.valve_state ? 'text-green-500' : 'text-red-500'} /> },
            { title: 'Servo Position', value: data.servo_position, unit: '°', icon: <FaSun className="text-yellow-500" /> },
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
                {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}{' '}
                {item.unit && <span className="text-gray-500 text-base">{item.unit}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;