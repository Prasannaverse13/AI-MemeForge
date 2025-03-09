import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Trends } from './pages/Trends';
import { Create } from './pages/Create';
import { Portfolio } from './pages/Portfolio';
import { Settings } from './pages/Settings';
import { Guide } from './pages/Guide';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/create" element={<Create />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;