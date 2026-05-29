import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider, useApp } from './context/AppContext'
import './index.css'

// Dynamic Route Controller based on simple state routing
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import PricingPage from './pages/PricingPage'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import CommandPalette from './components/CommandPalette'

const MainApp = () => {
  const { currentUser } = useApp();
  const [currentRoute, setCurrentRoute] = useState('landing'); // landing, auth, pricing, dashboard, admin
  const [authMode, setAuthMode] = useState('login'); // login, signup
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle custom mouse movement for background glowing grids
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simple Router sync
  useEffect(() => {
    if (!currentUser) {
      if (currentRoute !== 'landing' && currentRoute !== 'auth') {
        setCurrentRoute('landing');
      }
    } else {
      if (currentUser.plan === 'none') {
        setCurrentRoute('pricing');
      } else if (currentRoute === 'landing' || currentRoute === 'auth') {
        setCurrentRoute('dashboard');
      }
    }
  }, [currentUser]);

  // Command palette navigation handler
  const handleNavigate = (route) => {
    setCurrentRoute(route);
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentRoute} onSetAuthMode={setAuthMode} />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentRoute} initialMode={authMode} />;
      case 'pricing':
        return <PricingPage onNavigate={setCurrentRoute} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentRoute} />;
      case 'admin':
        return <AdminDashboard onNavigate={setCurrentRoute} />;
      default:
        return <LandingPage onNavigate={setCurrentRoute} onSetAuthMode={setAuthMode} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Interactive Anti Gravity Background Grid */}
      <div className="fixed inset-0 grid-mesh pointer-events-none -z-40" />

      {/* Dynamic Cursor Glowing Orb */}
      <div 
        className="cursor-glow hidden md:block" 
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Secret Command Palette */}
      <CommandPalette onNavigate={handleNavigate} />

      {renderRoute()}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <MainApp />
    </AppProvider>
  </React.StrictMode>,
)
