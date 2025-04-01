import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function HistoryChart() {
  const chartData = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20'],
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: [40, 38, 35, 32, 30],
        borderColor: '#3b82f6',
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Historical Data</h3>
      <Line data={chartData} />
    </div>
  );
}

export default HistoryChart;