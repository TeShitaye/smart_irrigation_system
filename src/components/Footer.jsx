import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-6 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="container mx-auto text-center">
        <p className="text-lg">© 2025 Smart Irrigation System. All rights reserved.</p>
        <p className="text-sm mt-2 opacity-75">Built with ❤️ for sustainable farming</p>
      </div>
    </motion.footer>
  );
}

export default Footer;