import { IoPeopleOutline, IoCalendarOutline } from 'react-icons/io5';

export default function PeladaHeader({ totalJogadores = 20, totalSessoes = 57 }) {
  return (
    <div className="c10-header-banner">
      {/* Introdução da Pelada */}
      <div className="c10-pelada-intro" style={{ marginTop: 'auto' }}>
        <div className="c10-pelada-logo-container">
          {/* SVG customizado da rede de futebol neon */}
          <svg 
            className="c10-neon-shield" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
            <circle cx="12" cy="12" r="3" fill="none" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="c10-pelada-info-text">
          <h1 className="c10-pelada-title">Pelada de Teste</h1>
          <div className="c10-pelada-subtitle">
            Turma do Camisa10
            <span style={{ letterSpacing: '2px', marginLeft: '4px', fontSize: '10px' }}>•••</span>
          </div>
          <div className="c10-pelada-meta">
            <div className="c10-meta-item">
              <IoPeopleOutline className="c10-meta-icon" />
              <span>{totalJogadores} jogadores</span>
            </div>
            <div className="c10-meta-divider" />
            <div className="c10-meta-item">
              <IoCalendarOutline className="c10-meta-icon" />
              <span>{totalSessoes} sessões</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
