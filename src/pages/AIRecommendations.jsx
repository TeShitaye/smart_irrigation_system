import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaWater, FaSeedling, FaExclamationTriangle, FaInfoCircle, FaTimes, FaTractor, FaArrowUp, FaArrowDown, FaThermometerHalf, FaTint, FaSyncAlt } from 'react-icons/fa';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';

function AIRecommendations() {
  const [data, setData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const apiUrl = 'http://10.141.120.181:5000/ai-recommendations';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        setPreviousData(data);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Unable to load AI recommendations. Check server.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setPreviousData(data);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to refresh data.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (action) => {
    try {
      await axios.post('http://10.141.120.181:5000/control', action);
      alert(`Applied ${action.irrigation_mode || 'action'} successfully!`);
      handleRefresh();
    } catch (err) {
      setError('Failed to apply action.');
    }
  };

  const openModal = (type, content) => {
    setModal({ type, content });
  };

  const fallbackData = {
    water_needed: 0.8,
    crop_suggestion: 'Maize',
    schedule: 'Irrigate in 2 hours',
    soil_type: 'Loam',
    soil_moisture: 30.2,
    soil_temp: 22.1,
    tank_level: 20.5,
    ambient_temp: 24.8,
    humidity: 58.3,
    pump_river: 0,
    pump_farmland: 0,
    irrigation_mode: 'Auto',
  };

  const displayData = data || fallbackData;

  const getTrend = (key) => {
    if (!previousData || !data) return null;
    const current = displayData[key];
    const previous = previousData[key];
    if (typeof current !== 'number') return null;
    if (current > previous) return <FaArrowUp className="text-green-500 ml-2" />;
    if (current < previous) return <FaArrowDown className="text-red-500 ml-2" />;
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 py-12">
      <div className="container mx-auto px-6 mt-16 max-w-[1600px] relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 flex items-center justify-center">
            <FaBrain className="text-blue-600 mr-3 animate-pulse" /> AI-Powered Insights
          </h2>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Optimize irrigation with real-time data from resistive soil moisture sensor and other sensors.
          </p>
        </motion.div>

        {!loading && (
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Today’s Recommendations</h3>
            <p className="text-gray-600">
              Irrigate <span className="font-bold text-blue-600">{displayData.water_needed.toFixed(1)} L/h</span> for{' '}
              <span className="font-bold text-green-600">{displayData.crop_suggestion}</span> on{' '}
              <span className="font-bold text-yellow-600">{displayData.soil_type}</span> soil.{' '}
              {displayData.tank_level < 15 && (
                <span className="text-red-600 font-semibold">Low tank level ({displayData.tank_level.toFixed(1)} cm) - refill now!</span>
              )}
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleApply({ irrigation_mode: 'Auto', pump_river: 0, pump_farmland: 0 })}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Apply Auto Plan
              </button>
              <button
                onClick={() => handleApply({ irrigation_mode: 'Manual', pump_river: 1, pump_farmland: 0 })}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Refill Tank
              </button>
              <button
                onClick={() => handleApply({ irrigation_mode: 'Manual', pump_river: 0, pump_farmland: 1 })}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Irrigate Farmland
              </button>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="bg-red-100 p-4 rounded-lg mb-6 flex items-center justify-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {loading ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FaSyncAlt className="text-blue-600 text-5xl animate-spin mx-auto" />
            <p className="text-gray-600 mt-4 text-lg">Fetching AI insights...</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Water Requirement', [
                    `Recommended: ${displayData.water_needed.toFixed(1)} L/h based on resistive soil moisture (${displayData.soil_moisture.toFixed(1)}%).`,
                    'Adjust irrigation duration accordingly.',
                  ])
                }
                data-tooltip-id="water-tooltip"
                data-tooltip-content="Water needed per hectare"
              >
                <FaWater className="text-blue-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Water Need</h3>
                <p className="text-2xl font-bold text-blue-600 text-center mt-2 flex items-center justify-center">
                  {displayData.water_needed.toFixed(1)} <span className="text-base text-gray-500 ml-1">L/h</span>
                  {getTrend('water_needed')}
                </p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Crop Recommendation', [
                    `${displayData.crop_suggestion} suits soil moisture (${displayData.soil_moisture.toFixed(1)}%) and temp (${displayData.soil_temp.toFixed(1)}°C).`,
                    'Optimal for current conditions.',
                  ])
                }
                data-tooltip-id="crop-tooltip"
                data-tooltip-content="Best crop for conditions"
              >
                <FaSeedling className="text-green-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Crop Choice</h3>
                <p className="text-2xl font-bold text-green-600 text-center mt-2">{displayData.crop_suggestion}</p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Soil Moisture', [
                    `Current: ${displayData.soil_moisture.toFixed(1)}% (resistive sensor).`,
                    displayData.soil_moisture < 25 ? 'Irrigate now.' : 'Moisture is optimal.',
                  ])
                }
                data-tooltip-id="moisture-tooltip"
                data-tooltip-content="Soil water content"
              >
                <FaTint className="text-green-600 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Soil Moisture</h3>
                <p className="text-2xl font-bold text-green-600 text-center mt-2 flex items-center justify-center">
                  {displayData.soil_moisture.toFixed(1)} <span className="text-base text-gray-500 ml-1">%</span>
                  {getTrend('soil_moisture')}
                </p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Soil Temperature', [
                    `Current: ${displayData.soil_temp.toFixed(1)}°C.`,
                    displayData.soil_temp > 30 ? 'Monitor for heat stress.' : 'Temperature is optimal.',
                  ])
                }
                data-tooltip-id="soil-temp-tooltip"
                data-tooltip-content="Soil temperature"
              >
                <FaThermometerHalf className="text-orange-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Soil Temp</h3>
                <p className="text-2xl font-bold text-orange-600 text-center mt-2 flex items-center justify-center">
                  {displayData.soil_temp.toFixed(1)} <span className="text-base text-gray-500 ml-1">°C</span>
                  {getTrend('soil_temp')}
                </p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Tank Level', [
                    `Current: ${displayData.tank_level.toFixed(1)} cm.`,
                    displayData.tank_level < 15 ? 'Refill tank now.' : 'Tank level is sufficient.',
                  ])
                }
                data-tooltip-id="tank-tooltip"
                data-tooltip-content="Water tank level"
              >
                <FaTint className="text-blue-600 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Tank Level</h3>
                <p className="text-2xl font-bold text-blue-600 text-center mt-2 flex items-center justify-center">
                  {displayData.tank_level.toFixed(1)} <span className="text-base text-gray-500 ml-1">cm</span>
                  {getTrend('tank_level')}
                </p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Ambient Temperature', [
                    `Current: ${displayData.ambient_temp.toFixed(1)}°C.`,
                    displayData.ambient_temp > 30 ? 'Reduce irrigation during heat.' : 'Temperature is suitable.',
                  ])
                }
                data-tooltip-id="ambient-temp-tooltip"
                data-tooltip-content="Air temperature"
              >
                <FaThermometerHalf className="text-red-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Air Temp</h3>
                <p className="text-2xl font-bold text-red-600 text-center mt-2 flex items-center justify-center">
                  {displayData.ambient_temp.toFixed(1)} <span className="text-base text-gray-500 ml-1">°C</span>
                  {getTrend('ambient_temp')}
                </p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Humidity', [
                    `Current: ${displayData.humidity.toFixed(1)}%.`,
                    displayData.humidity < 40 ? 'Increase irrigation.' : 'Humidity is optimal.',
                  ])
                }
                data-tooltip-id="humidity-tooltip"
                data-tooltip-content="Air humidity"
              >
                <FaTint className="text-teal-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Humidity</h3>
                <p className="text-2xl font-bold text-teal-600 text-center mt-2 flex items-center justify-center">
                  {displayData.humidity.toFixed(1)} <span className="text-base text-gray-500 ml-1">%</span>
                  {getTrend('humidity')}
                </p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('River Pump', [
                    `Status: ${displayData.pump_river ? 'ON' : 'OFF'}.`,
                    displayData.tank_level < 15 ? 'Turn ON to refill tank.' : 'Status is optimal.',
                  ])
                }
                data-tooltip-id="river-pump-tooltip"
                data-tooltip-content="River pump status"
              >
                <FaTractor className="text-indigo-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">River Pump</h3>
                <p className="text-2xl font-bold text-indigo-600 text-center mt-2">{displayData.pump_river ? 'ON' : 'OFF'}</p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-cyan-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() =>
                  openModal('Farmland Pump', [
                    `Status: ${displayData.pump_farmland ? 'ON' : 'OFF'}.`,
                    displayData.soil_moisture < 25 ? 'Turn ON to irrigate.' : 'Status is optimal.',
                  ])
                }
                data-tooltip-id="farmland-pump-tooltip"
                data-tooltip-content="Farmland pump status"
              >
                <FaTractor className="text-cyan-500 text-4xl mb-3 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">Farmland Pump</h3>
                <p className="text-2xl font-bold text-cyan-600 text-center mt-2">{displayData.pump_farmland ? 'ON' : 'OFF'}</p>
                <FaInfoCircle className="text-gray-400 mt-2 mx-auto" />
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sensor Data</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-gray-800">Parameter</th>
                    <th className="py-2 text-gray-800">Value</th>
                    <th className="py-2 text-gray-800">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Soil Moisture', value: `${displayData.soil_moisture.toFixed(1)}%`, key: 'soil_moisture' },
                    { name: 'Soil Temperature', value: `${displayData.soil_temp.toFixed(1)}°C`, key: 'soil_temp' },
                    { name: 'Tank Level', value: `${displayData.tank_level.toFixed(1)} cm`, key: 'tank_level' },
                    { name: 'Ambient Temperature', value: `${displayData.ambient_temp.toFixed(1)}°C`, key: 'ambient_temp' },
                    { name: 'Humidity', value: `${displayData.humidity.toFixed(1)}%`, key: 'humidity' },
                    { name: 'Irrigation Mode', value: displayData.irrigation_mode, key: null },
                    { name: 'River Pump', value: displayData.pump_river ? 'ON' : 'OFF', key: null },
                    { name: 'Farmland Pump', value: displayData.pump_farmland ? 'ON' : 'OFF', key: null },
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 text-gray-600">{item.name}</td>
                      <td className="py-2 text-gray-800">{item.value}</td>
                      <td className="py-2">{item.key ? getTrend(item.key) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <Tooltip id="water-tooltip" />
            <Tooltip id="crop-tooltip" />
            <Tooltip id="moisture-tooltip" />
            <Tooltip id="soil-temp-tooltip" />
            <Tooltip id="tank-tooltip" />
            <Tooltip id="ambient-temp-tooltip" />
            <Tooltip id="humidity-tooltip" />
            <Tooltip id="river-pump-tooltip" />
            <Tooltip id="farmland-pump-tooltip" />
          </>
        )}

        {!loading && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              onClick={handleRefresh}
              className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              <FaSyncAlt className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Insights
            </motion.button>
          </motion.div>
        )}

        {modal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{modal.type}</h3>
                <button onClick={() => setModal(null)} aria-label="Close modal">
                  <FaTimes className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <ul className="text-gray-600 list-disc pl-5 mb-4">
                {modal.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AIRecommendations;