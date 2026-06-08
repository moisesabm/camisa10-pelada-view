import React from 'react';
import { IoCalendarOutline, IoLocationOutline, IoChevronForward } from 'react-icons/io5';

export default function SessionCard({ confirmados = 16, total = 20, onProgressClick }) {
  const percentage = Math.round((confirmados / total) * 100);
  
  // Parâmetros do SVG do Anel Circular de Progresso
  const radius = 21;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="c10-glass-card">
      <div className="c10-session-grid">
        <div className="c10-session-details">
          {/* Linha 1: Data */}
          <div className="c10-session-row">
            <div className="c10-session-icon-wrapper">
              <IoCalendarOutline />
            </div>
            <div className="c10-session-text-wrapper">
              <div className="c10-session-info-secondary">Próxima sessão</div>
              <div className="c10-session-info-primary c10-highlight-green">
                Hoje • 20:00
              </div>
            </div>
          </div>

          {/* Linha 2: Local */}
          <div className="c10-session-row">
            <div className="c10-session-icon-wrapper">
              <IoLocationOutline />
            </div>
            <div className="c10-session-text-wrapper">
              <div className="c10-session-info-primary c10-session-location-name">
                Quadra Society Central
              </div>
              <div className="c10-session-info-secondary">
                Society • Iluminação
              </div>
            </div>
          </div>
        </div>



        {/* Progress Ring, Textos e Seta Lado a Lado */}
        <div className="c10-progress-section" onClick={onProgressClick}>
          {/* Círculo SVG de Progresso Vazio */}
          <div className="c10-progress-ring-wrapper">
            <svg width="54" height="54" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="27"
                cy="27"
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="27"
                cy="27"
                r={radius}
                fill="transparent"
                stroke="var(--color-neon-lime)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 3px var(--color-neon-lime-glow))',
                  transition: 'stroke-dashoffset 0.8s ease-in-out',
                }}
              />
            </svg>
          </div>

          {/* Bloco de Textos Lateral */}
          <div className="c10-progress-info-stack">
            <span className="c10-progress-top-lbl">Confirmados</span>
            <span className="c10-progress-middle-val">
              {confirmados}<span className="c10-progress-total-val">/{total}</span>
            </span>
            <span className="c10-progress-bottom-lbl">{percentage}% confirmados</span>
          </div>

          {/* Seta para Detalhes */}
          <div className="c10-arrow-right">
            <IoChevronForward />
          </div>
        </div>
      </div>
    </div>
  );
}
