import { motion } from 'framer-motion';
import { FaBrain, FaWater, FaLeaf, FaGithub, FaRocket } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-50  py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800  text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FaBrain className="inline-block mr-2 text-blue-600  animate-pulse" />
          About Smart Irrigation
        </motion.h2>

        {/* Introduction Section */}
        <motion.div
          className="bg-white  p-8 rounded-xl shadow-lg mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800  mb-4">Our Mission</h3>
          <p className="text-lg text-gray-600  leading-relaxed">
            The Smart Irrigation System is an AI-enhanced solution designed to revolutionize farming. By integrating IoT, GSM, and advanced machine learning, we aim to optimize water usage, improve crop health, and promote sustainable agriculture. Our goal is to empower farmers with technology that’s accessible, efficient, and eco-friendly.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50  p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaWater className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 ">Precision Irrigation</h3>
            <p className="text-gray-600  mt-2">
              Uses real-time sensor data and AI predictions to deliver the exact amount of water your crops need.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-white to-green-50  p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaLeaf className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 ">Crop Optimization</h3>
            <p className="text-gray-600  mt-2">
              Analyzes soil type and environmental conditions to recommend the best crops and care strategies.
            </p>
          </motion.div>
        </div>

        {/* Team/Creator Section */}
        <motion.div
          className="bg-white  p-8 rounded-xl shadow-lg mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800  mb-4">Who We Are</h3>
          <p className="text-lg text-gray-600  leading-relaxed">
            Created by <span className="font-bold">TeShitaye</span>, a passionate developer and innovator at the intersection of technology and agriculture. This project is a prototype built with support from xAI and the open-source community, aimed at tackling real-world farming challenges.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <motion.a
              href="https://github.com/TeShitaye/smart_irrigation_system"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600  hover:text-blue-500 "
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaGithub size={28} />
            </motion.a>
            {/* Add more social links if desired */}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-lg text-gray-600  mb-4">
            Want to learn more or contribute?
          </p>
          <motion.a
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700  text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="inline-block mr-2" /> Explore Dashboard
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default About;