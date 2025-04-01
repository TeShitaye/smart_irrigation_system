import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaEnvelope, FaHeart, FaLeaf } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamic year

  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white py-8 mt-auto shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left: Copyright & Tagline */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">
              © {currentYear} Smart Irrigation System. All rights reserved.
            </p>
            <p className="text-sm mt-2 opacity-75 flex items-center justify-center md:justify-start">
              Built with <FaHeart className="text-red-500 mx-1 animate-pulse" /> for sustainable farming
              <FaLeaf className="text-green-400 ml-1" />
            </p>
          </div>

          {/* Right: Social Links & Navigation */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <a href="/about" className="text-sm hover:text-blue-400 transition-colors duration-300">
                About
              </a>
              <a href="/contact" className="text-sm hover:text-blue-400 transition-colors duration-300">
                Contact
              </a>
              <a
                href="https://github.com/TeShitaye/smart_irrigation_system"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-blue-400 transition-colors duration-300"
              >
                GitHub Repo
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <motion.a
                href="https://github.com/TeShitaye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com/your-twitter" // Replace with your Twitter
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="mailto:your-email@example.com" // Replace with your email
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-700 opacity-50" />

        {/* Bottom Text */}
        <div className="mt-4 text-center">
          <p className="text-xs opacity-60">
            Powered by xAI & Open-Source Community
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;