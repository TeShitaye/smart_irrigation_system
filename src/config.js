// API Configuration
export const API_BASE_URL = 'http://10.141.120.181:5000';  // Replace with your Raspberry Pi's IP

export const API_ENDPOINTS = {
  SENSORS: `${API_BASE_URL}/sensors`,
  CONTROL: `${API_BASE_URL}/control`,
  HISTORY: `${API_BASE_URL}/history`,
  SCHEDULE: `${API_BASE_URL}/schedule`,
};

// Chart Configuration
export const CHART_COLORS = {
  moisture: {
    border: 'rgb(16, 185, 129)',
    background: 'rgba(16, 185, 129, 0.1)'
  },
  temperature: {
    border: 'rgb(239, 68, 68)',
    background: 'rgba(239, 68, 68, 0.1)'
  },
  humidity: {
    border: 'rgb(59, 130, 246)',
    background: 'rgba(59, 130, 246, 0.1)'
  },
  solar: {
    border: 'rgb(234, 179, 8)',
    background: 'rgba(234, 179, 8, 0.1)'
  }
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

// Status Configuration
export const STATUS_CONFIG = {
  NORMAL: {
    color: 'text-green-500',
    icon: 'FaCheckCircle'
  },
  WARNING: {
    color: 'text-yellow-500',
    icon: 'FaExclamationTriangle'
  },
  CRITICAL: {
    color: 'text-red-500',
    icon: 'FaTimesCircle'
  }
}; 