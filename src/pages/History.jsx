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
  FaHistory, FaFilter, FaDownload, FaExclamationTriangle, FaComment, FaCalendarAlt, FaWater, FaTemperatureHigh, FaChartLine,
  FaSun,
  FaCloud,
  FaWind,
  FaBolt,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegLightbulb,
  FaChartBar,
  FaChartPie,
  FaLeaf,
  FaTint
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
  const [selectedPeriod, setSelectedPeriod] = useState('week');

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

  // Sample data for the charts
  const moistureData = {
    labels: ['ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ'],
    datasets: [
      {
        label: 'የአፈር እርጥበት / Qaroo Lafa',
        data: [65, 59, 80, 81, 56, 55, 70],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  };

  const temperatureData = {
    labels: ['ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ'],
    datasets: [
      {
        label: 'የአየር ሙቀት / Ho\'a Qilleensa',
        data: [25, 28, 26, 30, 27, 29, 28],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen font-['Poppins'] bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 mt-16 text-center"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            የታሪክ መረጃ
            <div className="text-3xl font-normal text-emerald-600 mt-2">
              Odeeffannoo Seenaa
            </div>
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            የቀደመው የመስኖ ስርዓት እና የአየር ሁኔታ መረጃዎችን ይከታተሉ።
            <div className="text-lg text-emerald-600 mt-1">
              Seenaa sirna roobaa fi qilleensa ilaaluu.
            </div>
          </p>
        </motion.div>

        {/* Period Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {[
            { value: 'week', label: 'የሳምንቱ', sublabel: 'Torbee' },
            { value: 'month', label: 'የወሩ', sublabel: 'Ji\'oota' },
            { value: 'year', label: 'የዓመቱ', sublabel: 'Waggaa' }
          ].map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedPeriod === period.value
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-md'
              }`}
            >
              {period.label}
              <div className={`text-sm font-normal ${selectedPeriod === period.value ? 'text-emerald-100' : 'text-emerald-500'}`}>
                {period.sublabel}
              </div>
            </button>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Soil Moisture Chart */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              የአፈር እርጥበት ታሪክ
              <div className="text-lg font-normal text-emerald-600">
                Seenaa Qaroo Lafaa
              </div>
            </h3>
            <div className="h-[300px]">
              <Line data={moistureData} options={chartOptions} />
            </div>
          </div>

          {/* Temperature Chart */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              የአየር ሙቀት ታሪክ
              <div className="text-lg font-normal text-emerald-600">
                Seenaa Ho\'a Qilleensa
              </div>
            </h3>
            <div className="h-[300px]">
              <Line data={temperatureData} options={chartOptions} />
            </div>
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: <FaTint className="w-8 h-8 text-blue-500" />,
              title: "አማካይ የአፈር እርጥበት",
              subtitle: "Qaroo Lafaa Giddugaleessa",
              value: "65%",
              bgColor: "bg-blue-50",
              textColor: "text-blue-700"
            },
            {
              icon: <FaTemperatureHigh className="w-8 h-8 text-red-500" />,
              title: "አማካይ የአየር ሙቀት",
              subtitle: "Ho\'a Qilleensa Giddugaleessa",
              value: "25°C",
              bgColor: "bg-red-50",
              textColor: "text-red-700"
            },
            {
              icon: <FaWater className="w-8 h-8 text-emerald-500" />,
              title: "አጠቃላይ የውሃ አጠቃቀም",
              subtitle: "Fayyadama Bishaan Waliigalaa",
              value: "1,200L",
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-700"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.bgColor} backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-${stat.textColor.split('-')[1]}-100 hover:shadow-2xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  {stat.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${stat.textColor}`}>
                    {stat.title}
                    <div className="text-sm font-normal text-gray-600">
                      {stat.subtitle}
                    </div>
                  </h3>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100"
        >
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                መረጃዎችን ያውሩ
                <div className="text-lg font-normal text-emerald-600">
                  Odeeffannoo Maxxansi
                </div>
              </h3>
              <p className="text-gray-600 mt-2">
                የታሪክ መረጃዎችን በ CSV ፎርማት ያውሩ።
                <div className="text-sm text-gray-500">
                  Odeeffannoo seenaa CSV fakkiiitti maxxansi.
                </div>
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaDownload className="w-5 h-5" />
              ያውሩ
              <div className="text-sm font-normal text-emerald-100">
                Maxxansi
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default History;