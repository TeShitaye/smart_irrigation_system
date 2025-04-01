function SensorCard({ title, value, unit }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">
        {value.toFixed(2)} <span className="text-gray-500 text-lg">{unit}</span>
      </p>
    </div>
  );
}

export default SensorCard;