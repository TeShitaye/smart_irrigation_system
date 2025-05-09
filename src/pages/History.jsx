import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  FaHistory, FaFilter, FaDownload, FaExclamationTriangle, FaComment,
} from 'react-icons/fa';
import axios from 'axios';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filter, setFilter] = useState({ type: 'all', date: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = 'http://10.141.120.181:5000/history';

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        setHistory(response.data);
        setFilteredHistory(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch history. Check connection.');
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const applyFilter = () => {
    let result = [...history];
    if (filter.type !== 'all') {
      result = result.filter((item) => item.type === filter.type);
    }
    if (filter.date) {
      result = result.filter((item) => item.timestamp.startsWith(filter.date));
    }
    setFilteredHistory(result);
  };

  const exportToCSV = () => {
    const headers = 'Timestamp,Type,Soil Moisture (%),Soil Temp (°C),Tank Level (cm),Ambient Temp (°C),Humidity (%),Irrigation Mode,Irrigation State,River Pump,Farmland Pump,SMS Alert\n';
    const rows = filteredHistory.map((item) => [
      item.timestamp,
      item.type,
      item.soil_moisture || '-',
      item.soil_temp || '-',
      item.tank_level || '-',
      item.ambient_temp || '-',
      item.humidity || '-',
      item.irrigation_mode || '-',
      item.irrigation_state ? 'On' : 'Off',
      item.pump_river ? 'On' : 'Off',
      item.pump_farmland ? 'On' : 'Off',
      item.sms_alert || '-',
    ].join(',')).join('\n');
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'irrigation_history.csv';
    link.click();
  };

  const chartData = {
    labels: filteredHistory.map((item) => item.timestamp.split(' ')[1] || item.timestamp),
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: filteredHistory.map((item) => item.soil_moisture || 0),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Tank Level (cm)',
        data: filteredHistory.map((item) => item.tank_level || 0),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Humidity (%)',
        data: filteredHistory.map((item) => item.humidity || 0),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: { duration: 1500, easing: 'easeInOutQuad' },
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 } } },
      title: { display: true, text: 'Sensor Trends Over Time', font: { size: 16 } },
      tooltip: { enabled: true, mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Value' } },
      x: { title: { display: true, text: 'Time' } },
    },
  };

  const FilterCard = () => (
    <motion.div
      className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white border-opacity-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FaFilter className="text-blue-500 mr-2" /> Filters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-1">Type</label>
          <select
            className="w-full p-2 border rounded-lg bg-white bg-opacity-50"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="all">All</option>
            <option value="sensor">Sensors</option>
            <option value="control">Controls</option>
            <option value="sms">SMS Alerts</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg bg-white bg-opacity-50"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          />
        </div>
      </div>
      <motion.button
        onClick={applyFilter}
        className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Apply Filters
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-teal-100 py-10">
      <div className="container mx-auto px-4 mt-20 max-w-6xl">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 text-center mb-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FaHistory className="mr-3 text-blue-600" /> Historical Insights
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-100 bg-opacity-80 backdrop-blur-sm p-4 rounded-lg mb-6 flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        {loading && (
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}

        <FilterCard />

        <motion.div
          className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white border-opacity-30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Line data={chartData} options={chartOptions} />
        </motion.div>

        <motion.div
          className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white border-opacity-30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaComment className="text-blue-500 mr-2" /> SMS Alerts
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-100 bg-opacity-50">
                  <th className="p-2">Timestamp</th>
                  <th className="p-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory
                  .filter((item) => item.type === 'sms' && item.sms_alert)
                  .map((item, index) => (
                    <motion.tr
                      key={index}
                      className="border-b hover:bg-gray-50 hover:bg-opacity-30 group"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="p-2">{item.sms_timestamp || item.timestamp}</td>
                      <td className="p-2">{item.sms_alert}</td>
                      <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-1 -mt-8 ml-2">
                        {item.sms_alert}
                      </div>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white border-opacity-30 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">History Log</h3>
            <motion.button
              onClick={exportToCSV}
              className="py-2 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg flex items-center text-sm"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="mr-2" /> Export CSV
            </motion.button>
          </div>
          <table className="w-full text-left text-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-100 bg-opacity-50">
                <th className="p-2">Timestamp</th>
                <th className="p-2">Type</th>
                <th className="p-2">Soil Moisture (%)</th>
                <th className="p-2">Soil Temp (°C)</th>
                <th className="p-2">Tank Level (cm)</th>
                <th className="p-2">Ambient Temp (°C)</th>
                <th className="p-2">Humidity (%)</th>
                <th className="p-2">Mode</th>
                <th className="p-2">Irrigation</th>
                <th className="p-2">River Pump</th>
                <th className="p-2">Farmland Pump</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <motion.tr
                  key={index}
                  className="border-b hover:bg-gray-50 hover:bg-opacity-30 group"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="p-2">{item.timestamp}</td>
                  <td className="p-2">{item.type}</td>
                  <td className="p-2">{item.soil_moisture || '-'}</td>
                  <td className="p-2">{item.soil_temp || '-'}</td>
                  <td className="p-2">{item.tank_level || '-'}</td>
                  <td className="p-2">{item.ambient_temp || '-'}</td>
                  <td className="p-2">{item.humidity || '-'}</td>
                  <td className="p-2">{item.irrigation_mode || '-'}</td>
                  <td className="p-2">{item.irrigation_state ? 'On' : 'Off'}</td>
                  <td className="p-2">{item.pump_river ? 'On' : 'Off'}</td>
                  <td className="p-2">{item.pump_farmland ? 'On' : 'Off'}</td>
                  <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-1 -mt-8 ml-2">
                    {item.type}
                  </div>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

export default History;