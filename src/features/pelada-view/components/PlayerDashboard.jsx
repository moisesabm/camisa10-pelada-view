import React from 'react';
import { 
  IoPersonOutline, 
  IoCheckmarkCircleOutline, 
  IoTimeOutline, 
  IoCloseCircleOutline,
  IoHandLeftOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';
import avatarCarlos from '../../../assets/avatar-carlos.png';
import avatarRafael from '../../../assets/avatar-rafael.png';

export default function PlayerDashboard({
  total = 20,
  confirmados = 16,
  pendentes = 3,
  recusados = 1,
  goleiros = [
    { id: 1, name: 'Carlos Silva', avatar: avatarCarlos, status: 'Confirmado' },
    { id: 2, name: 'Rafael Santos', avatar: avatarRafael, status: 'Confirmado' }
  ]
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Grid de Métricas de Status */}
      <div className="c10-status-grid">
        {/* Total */}
        <div className="c10-status-mini-card">
          <div className="c10-status-row-top">
            <IoPersonOutline className="c10-status-icon c10-color-total" />
            <span className="c10-status-count">{total}</span>
          </div>
          <span className="c10-status-label">Total</span>
        </div>

        {/* Confirmados */}
        <div className="c10-status-mini-card">
          <div className="c10-status-row-top">
            <IoCheckmarkCircleOutline className="c10-status-icon c10-color-confirmed" />
            <span className="c10-status-count">{confirmados}</span>
          </div>
          <span className="c10-status-label">Confirmados</span>
        </div>

        {/* Pendentes */}
        <div className="c10-status-mini-card">
          <div className="c10-status-row-top">
            <IoTimeOutline className="c10-status-icon c10-color-pending" />
            <span className="c10-status-count">{pendentes}</span>
          </div>
          <span className="c10-status-label">Pendentes</span>
        </div>

        {/* Recusou */}
        <div className="c10-status-mini-card">
          <div className="c10-status-row-top">
            <IoCloseCircleOutline className="c10-status-icon c10-color-rejected" />
            <span className="c10-status-count">{recusados}</span>
          </div>
          <span className="c10-status-label">Recusou</span>
        </div>
      </div>

      {/* Seção Goleiros Confirmados */}
      <div className="c10-goalkeepers-section">
        <div className="c10-goalkeeper-title-row">
          <IoHandLeftOutline className="c10-gk-icon-hand" />
          <span>Goleiros Confirmados ({goleiros.length})</span>
        </div>

        <div className="c10-goalkeepers-list">
          {goleiros.map((gk) => (
            <div key={gk.id} className="c10-goalkeeper-card">
              <div className="c10-gk-avatar-wrapper">
                <img 
                  src={gk.avatar} 
                  alt={gk.name} 
                  className="c10-gk-avatar" 
                />
                <div className="c10-gk-dot-online" />
              </div>
              <div className="c10-gk-details">
                <div className="c10-gk-name">{gk.name}</div>
                <div className="c10-gk-role">
                  <IoShieldCheckmarkOutline className="c10-gk-role-icon" />
                  <span>Goleiro</span>
                </div>
              </div>
              <div className="c10-gk-label-confirmed">{gk.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
