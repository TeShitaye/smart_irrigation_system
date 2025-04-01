import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Control from './pages/Control';
import History from './pages/History';
import AIRecommendations from './pages/AIRecommendations';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/control" element={<Control />} />
          <Route path="/history" element={<History />} />
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;