import { motion } from 'framer-motion';
import { FaBrain, FaSeedling, FaCloudSun, FaWater, FaChartLine, FaRocket } from 'react-icons/fa';

function AIRecommendations() {
  const sampleData = {
    water_needed: 5.75,
    crop_recommendation: 'Wheat',
    weather_prediction: 'Sunny, 28°C',
    confidence_score: 92,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Animated Header */}
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-gray-800 text-center mb-12 flex items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FaBrain className="text-blue-600 mr-3 animate-pulse" /> AI Recommendations
        </motion.h2>

        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-30"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* Water Requirement */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaWater className="text-blue-500 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-gray-800">Water Requirement</h3>
            <p className="text-3xl font-bold text-blue-600 mt-3">
              {sampleData.water_needed.toFixed(2)} <span className="text-lg text-gray-500">L/h</span>
            </p>
          </motion.div>

          {/* Crop Recommendation */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-green-500 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaSeedling className="text-green-500 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-gray-800">Crop Recommendation</h3>
            <p className="text-3xl font-bold text-green-600 mt-3">{sampleData.crop_recommendation}</p>
          </motion.div>

          {/* Weather Prediction */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-500 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaCloudSun className="text-yellow-500 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-gray-800">Weather Prediction</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-3">{sampleData.weather_prediction}</p>
          </motion.div>

          {/* Confidence Score */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaChartLine className="text-purple-500 text-5xl mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-gray-800">Confidence Score</h3>
            <p className="text-3xl font-bold text-purple-600 mt-3">
              {sampleData.confidence_score} <span className="text-lg text-gray-500">%</span>
            </p>
          </motion.div>
        </div>

        {/* Call-to-Action Section */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-blue-500 to-blue-700 p-8 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h4 className="text-2xl font-bold mb-4 flex items-center justify-center">
            <FaRocket className="mr-2" /> Ready for the Future?
          </h4>
          <p className="text-lg">
            Stay tuned for real-time AI insights powered by your irrigation system!
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AIRecommendations;