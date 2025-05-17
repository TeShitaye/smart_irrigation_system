import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaHeart, 
  FaLeaf, 
  FaWater, 
  FaCloudRain, 
  FaSeedling, 
  FaTree,
  FaRegClock,
  FaRegCalendarAlt
} from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 text-white py-12 mt-auto shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: About Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <FaWater className="w-8 h-8 text-emerald-300 mr-3" />
              <h3 className="text-2xl font-bold font-['Poppins']">
                ብልህ መስኖ
                <div className="text-lg font-normal text-emerald-200">
                  Roobaa Garaa
                </div>
              </h3>
            </div>
            <p className="text-sm text-emerald-100 mt-2">
              Sustainable irrigation for modern farming
              <div className="text-xs text-emerald-200 mt-1">
                Roobaa tasuma malee qonnaa yeroo ammaa
              </div>
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 flex items-center justify-center">
              <FaRegClock className="w-5 h-5 mr-2 text-emerald-300" />
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <a href="/dashboard" className="text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center justify-center">
                <FaWater className="w-4 h-4 mr-2" />
                Dashboard
              </a>
              <a href="/about" className="text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center justify-center">
                <FaRegCalendarAlt className="w-4 h-4 mr-2" />
                About
              </a>
              <a href="/contact" className="text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center justify-center">
                <FaEnvelope className="w-4 h-4 mr-2" />
                Contact
              </a>
              <a
                href="https://github.com/TeShitaye/smart_irrigation_system"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center justify-center"
              >
                <FaGithub className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-end">
              <FaCloudRain className="w-5 h-5 mr-2 text-emerald-300" />
              Connect With Us
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <motion.a
                href="https://github.com/TeShitaye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white bg-emerald-900/50 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/your-twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white bg-emerald-900/50 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a
                href="mailto:your-email@example.com"
                className="text-emerald-200 hover:text-white bg-emerald-900/50 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaEnvelope size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider with Decorative Elements */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-emerald-700/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-emerald-900/50 rounded-full">
              <FaSeedling className="w-6 h-6 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm text-emerald-200 mb-2">
            © {currentYear} Smart Irrigation System. All rights reserved.
          </p>
          <p className="text-xs text-emerald-300/80 flex items-center justify-center">
            <FaHeart className="text-red-400 mx-1 animate-pulse" />
            Built for sustainable farming
            <FaTree className="text-emerald-400 ml-1" />
            <span className="mx-2">|</span>
            JIT, FECE final Thesis
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;