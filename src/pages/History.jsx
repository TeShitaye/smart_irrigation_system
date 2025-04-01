import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { FaHistory } from 'react-icons/fa';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

function History() {
  const chartData = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20'],
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: [40, 38, 35, 32, 30],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FaHistory className="inline-block mr-2 text-blue-600" /> Historical Data
      </motion.h2>
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Line data={chartData} options={options} />
      </motion.div>
    </div>
  );
}

export default History;