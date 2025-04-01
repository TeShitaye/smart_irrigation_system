import { useState } from 'react';
import axios from 'axios';

function ControlPanel() {
  const [irrigation, setIrrigation] = useState(false);

  const toggleIrrigation = async () => {
    try {
      await axios.post('http://<RASPBERRY_PI_IP>:5000/control', {
        irrigation: !irrigation,
      });
      setIrrigation(!irrigation);
    } catch (error) {
      console.error('Error controlling irrigation:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Manual Control</h3>
      <button
        onClick={toggleIrrigation}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          irrigation ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {irrigation ? 'Stop Irrigation' : 'Start Irrigation'}
      </button>
    </div>
  );
}

export default ControlPanel;