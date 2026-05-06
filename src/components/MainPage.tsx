import React from 'react';
import '../App.css';

interface MainPageProps {
  onNavigateToControl: () => void;
  onNavigateToTransport: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onNavigateToControl, onNavigateToTransport }) => {
  return (
    <div className="main-page">
      <div className="top-left-buttons-vertical">
        <button className="nav-btn-vertical" onClick={onNavigateToControl}>
          <img src="/src/assets/Union.png" alt="icon" className="btn-icon" />
          <span>БЛОК КОНТРОЛЯ ТЕМПЕРАТУРЫ ЗЕРНА</span>
        </button>
        <button className="nav-btn-vertical" onClick={onNavigateToTransport}>
          <img src="/src/assets/Union (1).png" alt="icon" className="btn-icon" />
          <span>БЛОК УПРАВЛЕНИЯ ТРАНСПОРТИРОВКОЙ ЗЕРНА</span>
        </button>
      </div>

      <div className="center-logo-simple">
        <img src="/src/assets/Union (2).png" alt="Center Logo" className="center-image" />
      </div>
    </div>
  );
};

export default MainPage;