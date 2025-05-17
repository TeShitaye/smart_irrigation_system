import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaWater, FaSeedling, FaExclamationTriangle, FaInfoCircle, FaTimes, FaTractor, FaArrowUp, FaArrowDown, FaThermometerHalf, FaTint, FaSyncAlt, FaRobot, FaLeaf, FaChartLine, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';

function AIRecommendations() {
  const [data, setData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('all');
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

  // Sample recommendations data
  const recommendations = [
    {
      type: 'water',
      title: 'የውሃ አጠቃቀምን ይቀንሱ',
      subtitle: 'Fayyadama Bishaan Hir\'isaa',
      description: 'በሚቀጥለው 24 ሰዓት ውሃ አያስፈልግም። የአፈር እርጥበት በቂ ነው።',
      descriptionOm: 'Sa\'aatii 24 itti aanu bishaan barbaachisa dha. Qaroo lafaa gahaa dha.',
      icon: <FaWater className="w-6 h-6 text-blue-500" />,
      severity: 'low',
    },
    {
      type: 'crop',
      title: 'የሰብል ምርትን ያሳድጉ',
      subtitle: 'Qonna Guddifadhaa',
      description: 'የአሁኑ የአየር ሁኔታ ለስንዴ እድገት ተስማሚ ነው።',
      descriptionOm: 'Haala qilleensa amma qonna guddisuu fi guddina isaa gaarii dha.',
      icon: <FaLeaf className="w-6 h-6 text-green-500" />,
      severity: 'medium',
    },
    {
      type: 'system',
      title: 'የስርዓት ማስተካከያ',
      subtitle: 'Sirna Sirreessuu',
      description: 'የመስኖ ሰርዝን በ 30 ደቂቃ ይቀንሱ።',
      descriptionOm: 'Sirna roobaa daqiiqaa 30 tiif hir\'isaa.',
      icon: <FaChartLine className="w-6 h-6 text-purple-500" />,
      severity: 'high',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            የኤአይ ምክሮች
            <div className="text-2xl font-normal text-gray-600 mt-1">
              AI Taltii
            </div>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            በኤአይ በመጠቀም የተገኘ የሰብል እና የስርዓት ምክሮች
            <div className="text-sm text-gray-500 mt-1">
              AI fayyadamuun qonna fi sirna irratti hundaa\'e taltii
            </div>
          </p>
        </motion.div>

        {/* Crop Selection */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { value: 'all', label: 'ሁሉም ሰብሎች / Qonna Hunda' },
              { value: 'wheat', label: 'ስንዴ / Qamadii' },
              { value: 'barley', label: 'ስንዴ ገብስ / Gebsii' },
              { value: 'teff', label: 'ጤፍ / Xaafii' },
            ].map((crop) => (
              <button
                key={crop.value}
                onClick={() => setSelectedCrop(crop.value)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  selectedCrop === crop.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {crop.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {rec.icon}
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-800">{rec.title}</h3>
                    <p className="text-sm text-gray-500">{rec.subtitle}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  rec.severity === 'high' 
                    ? 'bg-red-100 text-red-800'
                    : rec.severity === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {rec.severity === 'high' ? 'ከፍተኛ / Ol\'aanaa' :
                   rec.severity === 'medium' ? 'መካከለኛ / Giddu Galee' :
                   'ዝቅተኛ / Gadi Fagoo'}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{rec.description}</p>
              <p className="text-sm text-gray-500">{rec.descriptionOm}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                የኤአይ ግንዛቤዎች
                <div className="text-lg font-normal text-gray-600 mt-1">
                  AI Hubannoo
                </div>
              </h2>
            </div>
            <FaRobot className="w-8 h-8 text-purple-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-3">
                <FaLightbulb className="w-6 h-6 text-purple-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">የሰብል እድገት</p>
                  <p className="text-sm text-gray-500">Guddina Qonna</p>
                </div>
              </div>
              <p className="text-gray-600">
                በአሁኑ ወቅት የሰብል እድገት በተስማሚ ሁኔታ ላይ ነው።
                <div className="text-sm text-gray-500 mt-1">
                  Amma guddina qonna haala gaarii irratti argama.
                </div>
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-3">
                <FaExclamationTriangle className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">የሚጠበቁ ችግሮች</p>
                  <p className="text-sm text-gray-500">Rakkoo Eegama</p>
                </div>
              </div>
              <p className="text-gray-600">
                በሚቀጥለው ሳምንት የውሃ እጥረት ሊከሰት ይችላል።
                <div className="text-sm text-gray-500 mt-1">
                  Torban itti aanu bishaan xiqqaachuu danda\'a.
                </div>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AIRecommendations;