import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt, FaWater, FaTemperatureHigh, FaCloud, FaPumpSoap, FaToggleOn, FaTint, FaSun, FaLeaf,
  FaPowerOff, FaClock, FaExclamationTriangle, FaCheckCircle, FaTimesCircle,
  FaWind, FaBolt, FaRegClock, FaRegCalendarAlt, FaRegLightbulb, FaChartLine, FaChartBar, FaChartPie
} from 'react-icons/fa';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { API_ENDPOINTS, CHART_COLORS, ANIMATION_CONFIG, STATUS_CONFIG } from '../config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
    system_status: 'Normal',
    water_usage: 0,
    power_status: true,
    battery_level: 0,
    alerts: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.SENSORS);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sample data for the charts
  const chartData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'እርጥበት / Qaroo',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: CHART_COLORS.moisture.border,
        backgroundColor: CHART_COLORS.moisture.background,
        tension: 0.4,
        fill: true
      },
    ],
  };

  const temperatureChartData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'ሙቀት / Ho\'a',
        data: [22, 25, 28, 27, 24, 23],
        borderColor: CHART_COLORS.temperature.border,
        backgroundColor: CHART_COLORS.temperature.background,
        tension: 0.4,
        fill: true
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Poppins',
            size: 14
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            family: 'Poppins'
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            family: 'Poppins'
          }
        }
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'text-green-600';
      case 'Warning': return 'text-yellow-600';
      case 'Critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Normal': return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      case 'Warning': return <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />;
      case 'Critical': return <FaTimesCircle className="w-6 h-6 text-red-500" />;
      default: return <FaTachometerAlt className="w-6 h-6 text-gray-500" />;
    }
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
          {...ANIMATION_CONFIG}
          className="mb-12 mt-16 text-center"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            የአሁኑ ሁኔታ
            <div className="text-3xl font-normal text-emerald-600 mt-2">
              Haala Amma
            </div>
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            የስርዓቱ አሁንን ሁኔታ እና የሰብል እድገትን ይከታተሉ።
            <div className="text-lg text-emerald-600 mt-1">
              Haala sistimaa fi guddina qonnaa yeroo yeroo ilaaluu.
            </div>
          </p>
        </motion.div>

        {/* System Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {[
            {
              icon: <FaPowerOff className="w-8 h-8 text-emerald-500" />,
              title: "የስርዓት ሁኔታ",
              subtitle: "Haala Sistimaa",
              value: data.system_status,
              status: data.system_status === "Normal" ? "success" : "error",
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-700"
            },
            {
              icon: <FaBolt className="w-8 h-8 text-yellow-500" />,
              title: "የኃይል ሁኔታ",
              subtitle: "Haala Humna",
              value: data.power_status ? "ንቁ" : "ተዘግቷል",
              status: data.power_status ? "success" : "error",
              bgColor: "bg-yellow-50",
              textColor: "text-yellow-700"
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
                  <p className="text-2xl font-bold mt-2">
                    {stat.value}
                    {stat.status && (
                      <span className={`ml-2 text-sm ${stat.status === "success" ? "text-green-500" : "text-red-500"}`}>
                        {stat.status === "success" ? <FaCheckCircle className="inline" /> : <FaTimesCircle className="inline" />}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: <FaTint className="w-8 h-8 text-blue-500" />,
              title: "የአፈር እርጥበት",
              subtitle: "Qaroo Lafaa",
              value: `${data.soil_moisture}%`,
              bgColor: "bg-blue-50",
              textColor: "text-blue-700"
            },
            {
              icon: <FaTemperatureHigh className="w-8 h-8 text-red-500" />,
              title: "የአየር ሙቀት",
              subtitle: "Ho'a Qilleensa",
              value: `${data.ambient_temp}°C`,
              bgColor: "bg-red-50",
              textColor: "text-red-700"
            },
            {
              icon: <FaWind className="w-8 h-8 text-emerald-500" />,
              title: "እርጥበት",
              subtitle: "Qaroo",
              value: `${data.humidity}%`,
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

        {/* Additional Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {[
            {
              icon: <FaChartLine className="w-8 h-8 text-purple-500" />,
              title: "የውሃ አጠቃቀም",
              subtitle: "Fayyadama Bishaan",
              value: `${data.water_usage}L`,
              bgColor: "bg-purple-50",
              textColor: "text-purple-700"
            },
            {
              icon: <FaRegLightbulb className="w-8 h-8 text-emerald-500" />,
              title: "የመስኖ ሁኔታ",
              subtitle: "Haala Roobaa",
              value: data.irrigation_mode,
              bgColor: "bg-emerald-50",
              textColor: "text-emerald-700"
            }
          ].map((data, index) => (
            <motion.div
              key={index}
              className={`${data.bgColor} backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-${data.textColor.split('-')[1]}-100 hover:shadow-2xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  {data.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${data.textColor}`}>
                    {data.title}
                    <div className="text-sm font-normal text-gray-600">
                      {data.subtitle}
                    </div>
                  </h3>
                  <p className="text-2xl font-bold mt-2">{data.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              የአፈር እርጥበት ታሪክ
              <div className="text-lg font-normal text-emerald-600">
                Seenaa Qaroo Lafaa
              </div>
            </h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              የአየር ሙቀት ታሪክ
              <div className="text-lg font-normal text-emerald-600">
                Seenaa Ho\'a Qilleensa
              </div>
            </h3>
            <div className="h-[300px]">
              <Line data={temperatureChartData} options={chartOptions} />
            </div>
          </div>
        </motion.div>

        {/* Alerts Section */}
        {data.alerts && data.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-red-50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaExclamationTriangle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-red-700">
                ማስጠንቀቂያዎች
                <div className="text-lg font-normal text-red-600">
                  Akeekkachiisota
                </div>
              </h3>
            </div>
            <div className="space-y-4">
              {data.alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                  <FaExclamationTriangle className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-red-700 font-medium">{alert.message}</p>
                    <p className="text-red-600 text-sm mt-1">{alert.messageOm}</p>
                    <p className="text-red-600 text-sm mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;