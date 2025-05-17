import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWater, 
  FaPowerOff, 
  FaClock, 
  FaCalendarAlt, 
  FaLeaf,
  FaSun,
  FaCloud,
  FaWind,
  FaBolt,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegLightbulb,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import axios from 'axios';
import { API_ENDPOINTS, ANIMATION_CONFIG } from '../config';

function Control() {
  const [controls, setControls] = useState({
    irrigation_mode: 'Manual',
    pump_river: false,
    pump_farmland: false,
  });
  const [error, setError] = useState(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [isIrrigationActive, setIsIrrigationActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [selectedTime, setSelectedTime] = useState('06:00');

  // Fetch initial control states
  useEffect(() => {
    const fetchControls = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CONTROL);
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
      await axios.post(API_ENDPOINTS.CONTROL, {
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
      await axios.post(API_ENDPOINTS.CONTROL, {
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
            የስርዓት ቁጥጥር
            <div className="text-3xl font-normal text-emerald-600 mt-2">
              To'achuu Sistimaa
            </div>
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            የመስኖ ስርዓቱን በእጅ ያቆጡ እና ያስተናግዱ።
            <div className="text-lg text-emerald-600 mt-1">
              Sirna roobaa harka to'achaa fi sirreessa.
            </div>
          </p>
        </motion.div>

        {/* Manual Control Section */}
        <motion.div
          {...ANIMATION_CONFIG}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* System Control Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              የስርዓት ቁጥጥር
              <div className="text-lg font-normal text-emerald-600">
                To'achuu Sistimaa
              </div>
            </h2>
            
            {/* Manual Control */}
            <div className="mb-8">
              <div className="space-y-6">
                {/* River Pump Control */}
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-800">
                      የወንዝ ፓምፕ
                      <div className="text-sm font-normal text-emerald-600">
                        Paampii Laga
                      </div>
                    </h4>
                  </div>
                  <button
                    onClick={() => toggleControl('pump_river')}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                      controls.pump_river ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                        controls.pump_river ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Farmland Pump Control */}
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-800">
                      የእርሻ ፓምፕ
                      <div className="text-sm font-normal text-emerald-600">
                        Paampii Qonna
                      </div>
                    </h4>
                  </div>
                  <button
                    onClick={() => toggleControl('pump_farmland')}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                      controls.pump_farmland ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                        controls.pump_farmland ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Duration Selection */}
                <div className="p-4 bg-blue-50 rounded-xl">
                  <label className="block text-lg font-semibold text-blue-800 mb-2">
                    የመስኖ ቆይታ
                    <div className="text-sm font-normal text-blue-600">
                      Yeroo Roobaa
                    </div>
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="5">5 ደቂቃ / 5 Daqiiqaa</option>
                    <option value="10">10 ደቂቃ / 10 Daqiiqaa</option>
                    <option value="15">15 ደቂቃ / 15 Daqiiqaa</option>
                    <option value="30">30 ደቂቃ / 30 Daqiiqaa</option>
                    <option value="60">1 ሰዓት / 1 Sa'aa</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Management Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              የመስኖ ዕቅድ
              <div className="text-lg font-normal text-emerald-600">
                Karoora Roobaa
              </div>
            </h2>

            {/* Time Selection */}
            <div className="mb-8">
              <div className="p-4 bg-purple-50 rounded-xl mb-6">
                <label className="block text-lg font-semibold text-purple-800 mb-2">
                  የመስኖ ሰዓት
                  <div className="text-sm font-normal text-purple-600">
                    Yeroo Roobaa
                  </div>
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                />
              </div>

              {/* Add Schedule Button */}
              <button
                onClick={() => {
                  // Implement adding a new schedule
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaPlus className="w-5 h-5" />
                ዕቅድ አክል
                <div className="text-sm font-normal text-purple-100">
                  Karoora Dabalchi
                </div>
              </button>
            </div>

            {/* Current Schedules */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                የአሁኑ ዕቅዶች
                <div className="text-sm font-normal text-gray-600">
                  Karoora Amma
                </div>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <FaRegClock className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">06:00 - 06:30</p>
                      <p className="text-sm text-gray-500">Roobaa Ganamaa</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // Implement removing a schedule
                    }}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Status Section */}
        <motion.div
          {...ANIMATION_CONFIG}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              icon: <FaWater className="w-8 h-8 text-blue-500" />,
              title: "የውሃ አጠቃቀም",
              subtitle: "Fayyadama Bishaan",
              value: "85%",
              bgColor: "bg-blue-50",
              textColor: "text-blue-700"
            },
            {
              icon: <FaRegClock className="w-8 h-8 text-purple-500" />,
              title: "ቀጣይ መስኖ",
              subtitle: "Roobaa Itti Aanaa",
              value: "06:00",
              bgColor: "bg-purple-50",
              textColor: "text-purple-700"
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
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Control;