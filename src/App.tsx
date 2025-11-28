import { useState } from 'react';
import Home from './pages/Home';
import Create from './pages/Create';

function App() {
    // Simple state-based routing for this prototype
    const [currentPage, setCurrentPage] = useState<'home' | 'create'>('home');

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-white selection:bg-primary selection:text-black">
            {currentPage === 'home' && <Home onStart={() => setCurrentPage('create')} />}
            {currentPage === 'create' && <Create onBack={() => setCurrentPage('home')} />}
        </div>
    );
}

export default App;
