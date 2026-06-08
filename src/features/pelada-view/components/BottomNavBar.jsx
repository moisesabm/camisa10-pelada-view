import React from 'react';
import { 
  IoHomeOutline, 
  IoHome,
  IoPaperPlaneOutline, 
  IoPaperPlane,
  IoPersonOutline, 
  IoPerson 
} from 'react-icons/io5';

// Ícone SVG customizado para a quadra/arena de futebol
const ArenaIcon = ({ active }) => (
  <svg 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ opacity: active ? 1 : 0.6 }}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" style={{ opacity: 0.2 }} />
  </svg>
);

export default function BottomNavBar({ activeTab = 'arena', onTabChange, onCenterClick }) {
  return (
    <nav className="c10-bottom-nav">
      {/* 1. Início */}
      <div 
        className={`c10-nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
        onClick={() => onTabChange('inicio')}
      >
        {activeTab === 'inicio' ? <IoHome className="c10-nav-icon" /> : <IoHomeOutline className="c10-nav-icon" />}
        <span>Início</span>
      </div>

      {/* 2. Arena */}
      <div 
        className={`c10-nav-item ${activeTab === 'arena' ? 'active' : ''}`}
        onClick={() => onTabChange('arena')}
      >
        <ArenaIcon active={activeTab === 'arena'} />
        <span>Arena</span>
      </div>

      {/* 3. Botão Central Pulsante "10" */}
      <div className="c10-nav-center-glow" onClick={onCenterClick}>
        <div className="c10-center-ball-btn">
          <span>10</span>
        </div>
      </div>

      {/* 4. Feed */}
      <div 
        className={`c10-nav-item ${activeTab === 'feed' ? 'active' : ''}`}
        onClick={() => onTabChange('feed')}
      >
        {activeTab === 'feed' ? <IoPaperPlane className="c10-nav-icon" /> : <IoPaperPlaneOutline className="c10-nav-icon" />}
        <span>Feed</span>
      </div>

      {/* 5. Perfil */}
      <div 
        className={`c10-nav-item ${activeTab === 'perfil' ? 'active' : ''}`}
        onClick={() => onTabChange('perfil')}
      >
        {activeTab === 'perfil' ? <IoPerson className="c10-nav-icon" /> : <IoPersonOutline className="c10-nav-icon" />}
        <span>Perfil</span>
      </div>
    </nav>
  );
}
