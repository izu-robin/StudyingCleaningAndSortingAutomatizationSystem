import React, { useState } from 'react';
import MainPage from './components/MainPage';
import ControlPage from './components/ControlPage';
import TransportControlPage from './components/TransportControlPage';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'control' | 'transport'>('main');

  return (
    <div className="app">
      {currentPage === 'main' && (
        <MainPage 
          onNavigateToControl={() => setCurrentPage('control')}
          onNavigateToTransport={() => setCurrentPage('transport')}
        />
      )}
      {currentPage === 'control' && (
        <ControlPage onBack={() => setCurrentPage('main')} />
      )}
      {currentPage === 'transport' && (
        <TransportControlPage onBack={() => setCurrentPage('main')} />
      )}
    </div>
  );
};

export default App;