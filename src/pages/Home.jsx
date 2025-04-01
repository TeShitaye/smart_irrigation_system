import { motion } from 'framer-motion';
import { FaWater, FaLeaf, FaMobileAlt, FaRocket, FaBrain, FaChartLine, FaQuoteLeft, FaMicrochip } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative">
        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20"
          animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-green-200 dark:bg-green-900 rounded-full opacity-20"
          animate={{ y: [20, -20, 20], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Hero Section */}
        <div className="space-y-10 py-16">
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <FaBrain className="text-blue-600 dark:text-blue-400 mr-4 animate-pulse" />
            Smart Irrigation
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform farming with AI-driven precision. Conserve water, boost crop yields, and cultivate sustainability effortlessly.
          </motion.p>

          {/* Dual CTA Buttons */}
          <div className="flex justify-center space-x-6">
            <motion.a
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="inline-block mr-2" /> Explore Dashboard
            </motion.a>
            <motion.a
              href="/about"
              className="inline-block bg-gradient-to-r from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLeaf className="inline-block mr-2" /> Learn More
            </motion.a>
          </div>
        </div>

        {/* Real-Time Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <FaWater className="text-blue-500 dark:text-blue-400 text-4xl mx-auto mb-4" />
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">500L</p>
            <p className="text-gray-600 dark:text-gray-300">Water Saved</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <FaChartLine className="text-green-500 dark:text-green-400 text-4xl mx-auto mb-4" />
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">98%</p>
            <p className="text-gray-600 dark:text-gray-300">System Uptime</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <FaLeaf className="text-yellow-500 dark:text-yellow-400 text-4xl mx-auto mb-4" />
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">20%</p>
            <p className="text-gray-600 dark:text-gray-300">Yield Increase</p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 relative z-10">
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaWater className="text-blue-500 dark:text-blue-400 text-6xl mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Water Efficiency</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">Optimize water usage with AI precision based on soil and weather data.</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-green-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaLeaf className="text-green-500 dark:text-green-400 text-6xl mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Soil Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">Identify soil type and status for tailored crop recommendations.</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <FaMobileAlt className="text-yellow-500 dark:text-yellow-400 text-6xl mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Remote Control</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">Manage irrigation from anywhere via web or mobile.</p>
          </motion.div>
        </div>

        {/* Tech Stack Highlights */}
        <motion.div
          className="mt-20 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Powered By Cutting-Edge Tech</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <FaMicrochip className="text-blue-500 dark:text-blue-400 text-3xl" />
              <p className="text-gray-600 dark:text-gray-300">IoT Sensors</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaBrain className="text-green-500 dark:text-green-400 text-3xl" />
              <p className="text-gray-600 dark:text-gray-300">AI Analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMobileAlt className="text-yellow-500 dark:text-yellow-400 text-3xl" />
              <p className="text-gray-600 dark:text-gray-300">GSM Connectivity</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8">What Farmers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <FaQuoteLeft className="text-blue-500 dark:text-blue-400 text-2xl mb-4" />
              <p className="text-gray-600 dark:text-gray-300 italic">"This system saved 30% of my water usage while boosting my harvest!"</p>
              <p className="text-gray-800 dark:text-gray-100 mt-4 font-semibold">— John, Organic Farmer</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <FaQuoteLeft className="text-blue-500 dark:text-blue-400 text-2xl mb-4" />
              <p className="text-gray-600 dark:text-gray-300 italic">"The AI insights helped me choose the perfect crops for my soil."</p>
              <p className="text-gray-800 dark:text-gray-100 mt-4 font-semibold">— Maria, Smallholder</p>
            </div>
          </div>
        </motion.div>

        {/* Video/Image Placeholder */}
        <motion.div
          className="mt-20 bg-gray-200 dark:bg-gray-700 p-8 rounded-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="bg-gray-300 dark:bg-gray-600 h-64 flex items-center justify-center rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg">Video/Image Coming Soon: See the System in Action!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;