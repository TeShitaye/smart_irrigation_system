import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Control from './pages/Control';
import History from './pages/History';
import AIRecommendations from './pages/AIRecommendations';
import About from './pages/About';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-all duration-300">
        <Navbar />
        <main className="flex-grow pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/control" element={<Control />} />
            <Route path="/history" element={<History />} />
           /* <Route path="/ai-recommendations" element={<AIRecommendations />} /> */
            <Route path='/about' element={<About/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;