import { motion } from 'framer-motion';
import { FaWater, FaLeaf, FaMobileAlt, FaRocket, FaBrain } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative">
        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"
          animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20"
          animate={{ y: [20, -20, 20], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Hero Section */}
        <div className="space-y-10 py-16">
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold text-gray-800 flex items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <FaBrain className="text-blue-600 mr-4 animate-pulse" />
            Smart Irrigation
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform farming with AI-driven precision. Conserve water, enhance crop yields, and cultivate sustainability with ease.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="inline-block mr-2" /> Explore Now
          </motion.a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 relative z-10">
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaWater className="text-blue-500 text-6xl mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800">Water Efficiency</h3>
            <p className="text-gray-600 mt-3 text-lg">Harness AI to optimize water usage with pinpoint accuracy.</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-green-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaLeaf className="text-green-500 text-6xl mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800">Crop Health</h3>
            <p className="text-gray-600 mt-3 text-lg">Get personalized crop insights based on your soil.</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white to-yellow-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaMobileAlt className="text-yellow-500 text-6xl mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800">Easy Control</h3>
            <p className="text-gray-600 mt-3 text-lg">Manage your system anytime, anywhere via web or mobile.</p>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          className="mt-20 bg-blue-100 p-8 rounded-xl shadow-md max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-lg text-gray-700">
            Powered by IoT, GSM, and advanced AI, our system adapts to your farm’s unique needs. Join the future of agriculture today!
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;