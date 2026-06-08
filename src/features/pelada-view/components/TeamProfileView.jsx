import React, { useState } from 'react';
import { 
  IoChevronBack, 
  IoShareSocialOutline, 
  IoSettingsOutline, 
  IoCalendarOutline, 
  IoLocationOutline, 
  IoChevronForward, 
  IoFootballOutline, 
  IoCreateOutline,
  IoTrophyOutline,
  IoPeopleOutline,
  IoMailOutline,
  IoSearchOutline,
  IoArrowUpOutline,
  IoCheckmarkOutline,
  IoRemoveOutline,
  IoCloseOutline,
  IoInformationCircleOutline,
  IoTimeOutline,
  IoChatbubbleEllipsesOutline,
  IoFlashOutline
} from 'react-icons/io5';
import avatarCarlos from '../../../assets/avatar-carlos.png';
import avatarRafael from '../../../assets/avatar-rafael.png';
import stadiumNeonBg from '../../../assets/stadium_neon_bg.png';

export default function TeamProfileView({ onBack }) {
  const [activeSubTab, setActiveSubTab] = useState('geral');

  // Jogadores simulados para o elenco (como no print do Camisa10 FC)
  const players = [
    { id: 1, name: 'Carlos', avatar: avatarCarlos, number: 10, role: 'MEI' },
    { id: 2, name: 'Rafael', avatar: avatarRafael, number: 7, role: 'ZAG' },
    { id: 3, name: 'Lucas', avatar: avatarCarlos, number: 11, role: 'ATA' },
    { id: 4, name: 'Pedro', avatar: avatarRafael, number: 9, role: 'ATA' },
    { id: 5, name: 'Bruno', avatar: avatarCarlos, number: 4, role: 'ZAG' },
    { id: 6, name: 'Matheus', avatar: avatarRafael, number: 8, role: 'MEI' },
    { id: 7, name: 'Gabriel', avatar: avatarCarlos, number: 19, role: 'ATA' },
    { id: 8, name: 'Thiago', avatar: avatarRafael, number: 1, role: 'GOL' }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 1. Botões de Ação Superiores (Fixos) */}
      <div className="c10-header-actions-fixed">
        <button className="c10-round-btn" aria-label="Voltar" onClick={onBack}>
          <IoChevronBack size={20} />
        </button>
        <div className="c10-header-right-btns">
          <button className="c10-round-btn" aria-label="Compartilhar" onClick={() => alert('Compartilhar Time')}>
            <IoShareSocialOutline size={20} />
          </button>
          <button className="c10-round-btn" aria-label="Configurações" onClick={() => alert('Configurações do Time')}>
            <IoSettingsOutline size={20} />
          </button>
        </div>
      </div>

      {/* 2. Área de Conteúdo Rolável */}
      <div className="c10-scroll-content">
        
        {/* Banner do Cabeçalho do Time (Fundo Transparente com escudo à esquerda e textos à direita) */}
        <div className="c10-team-header-banner">
          
          <div className="c10-team-intro" style={{ marginTop: 'auto' }}>
            {/* Escudo à esquerda */}
            <div className="c10-team-logo-container">
              <svg 
                className="c10-neon-shield-large" 
                viewBox="0 0 24 24" 
                fill="none" 
              >
                {/* O escudo brasão com glow */}
                <path 
                  d="M12 2C16.5 2 20 3 20 6.5C20 13.5 14.5 19.5 12 22C9.5 19.5 4 13.5 4 6.5C4 3 7.5 2 12 2Z" 
                  fill="#050b14" 
                  stroke="var(--color-neon-lime)"
                  strokeWidth="1.8"
                />
                {/* Linhas de rede discretas no fundo */}
                <path d="M6 8 L18 8 M5 12 L19 12 M6 16 L18 16 M10 4 L10 20 M14 4 L14 20" stroke="var(--color-neon-lime)" strokeWidth="0.5" opacity="0.12" />
              </svg>
              <div className="c10-team-logo-text-center">10</div>
              {/* Botão de Edição */}
              <div className="c10-team-logo-edit" onClick={() => alert('Editar Escudo')}>
                <IoCreateOutline size={12} />
              </div>
            </div>

            {/* Informações na Lateral do Escudo */}
            <div className="c10-team-info-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 className="c10-team-name">Camisa10 FC</h1>
                <span className="c10-team-badge-amador">AMADOR</span>
              </div>
              <p className="c10-team-meta-subtitle">
                <span className="c10-highlight-green">@C10</span> • São Paulo, SP • 7x7
              </p>
              <p className="c10-team-bio">
                Futebol raiz, amizade verdadeira e respeito sempre! 💚
              </p>
            </div>
          </div>
          
        </div>

        {/* Painel Desfocado que desliza por cima do fundo (Começa logo abaixo do cabeçalho) */}
        <div className="c10-team-scroll-glass-panel" style={{ marginTop: '0px', paddingTop: '16px' }}>

          {/* Grid de Estatísticas Rápidas */}
          <div className="c10-team-stats-grid">
            <div className="c10-team-stat-item">
              <div className="c10-team-stat-icon-row">
                <IoArrowUpOutline size={11} className="c10-highlight-green" style={{ strokeWidth: 3 }} />
                <span className="c10-team-stat-num c10-highlight-green">24</span>
              </div>
              <span className="c10-team-stat-lbl">Jogos</span>
            </div>
            <div className="c10-team-stat-item">
              <div className="c10-team-stat-icon-row">
                <IoCheckmarkOutline size={11} className="c10-highlight-green" style={{ strokeWidth: 3 }} />
                <span className="c10-team-stat-num c10-highlight-green">16</span>
              </div>
              <span className="c10-team-stat-lbl">Vitórias</span>
            </div>
            <div className="c10-team-stat-item">
              <div className="c10-team-stat-icon-row">
                <IoRemoveOutline size={11} style={{ color: 'var(--text-muted)', strokeWidth: 3 }} />
                <span className="c10-team-stat-num" style={{ color: 'var(--text-muted)' }}>4</span>
              </div>
              <span className="c10-team-stat-lbl">Empates</span>
            </div>
            <div className="c10-team-stat-item">
              <div className="c10-team-stat-icon-row">
                <IoCloseOutline size={11} style={{ color: '#ef4444', strokeWidth: 3 }} />
                <span className="c10-team-stat-num" style={{ color: '#ef4444' }}>4</span>
              </div>
              <span className="c10-team-stat-lbl">Derrotas</span>
            </div>
            <div className="c10-team-stat-item-box">
              <span className="c10-team-stat-box-num">67%</span>
              <span className="c10-team-stat-box-lbl">Aproveitamento</span>
            </div>
            <button className="c10-team-calendar-btn" onClick={() => alert('Calendário')}>
              <IoCalendarOutline size={18} />
            </button>
          </div>

          {/* Botões de Ação */}
          <div className="c10-team-action-buttons">
            <button className="c10-team-btn-primary" onClick={() => alert('Buscando Adversários...')}>
              <IoSearchOutline size={16} />
              <span>Buscar Adversários</span>
            </button>
            <button className="c10-team-btn-outline" onClick={() => alert('Abrindo partidas')}>
              <IoFootballOutline size={16} />
              <span>Matches</span>
            </button>
          </div>

          {/* Seção Roster/Elenco */}
          <div className="c10-team-section-container">
            <div className="c10-team-section-header">
              <span className="c10-team-section-title">Elenco • 20 Jogadores</span>
              <span className="c10-team-link" onClick={() => alert('Ver elenco completo')}>Ver todos <IoChevronForward size={10} /></span>
            </div>
            <div className="c10-team-roster-row">
              {players.map((p) => (
                <div key={p.id} className="c10-team-roster-player">
                  <div className="c10-team-roster-avatar-wrapper">
                    <img src={p.avatar} alt={p.name} className="c10-team-roster-avatar" />
                    <div className="c10-team-roster-number">{p.number}</div>
                  </div>
                  <span className="c10-team-roster-name">{p.name}</span>
                  <span className="c10-team-roster-role">{p.role}</span>
                </div>
              ))}
              <div className="c10-team-roster-more" onClick={() => alert('Ver todos')}>
                <span className="c10-team-roster-more-txt">+12</span>
                <span className="c10-team-roster-more-lbl">Jogadores</span>
              </div>
            </div>
          </div>

          {/* Abas Horizontais Internas (Fiel ao print do aplicativo) */}
          <div className="c10-team-tabs-bar">
            {[
              { id: 'geral', label: 'Geral', icon: <IoInformationCircleOutline /> },
              { id: 'historico', label: 'Histórico', icon: <IoTimeOutline /> },
              { id: 'posts', label: 'Posts', icon: <IoChatbubbleEllipsesOutline /> },
              { id: 'conquistas', label: 'Conquistas', icon: <IoTrophyOutline /> },
              { id: 'convidar', label: 'Convidar', icon: <IoMailOutline /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                className={`c10-team-tab-item ${activeSubTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveSubTab(tab.id)}
              >
                <span className="c10-team-tab-icon">{tab.icon}</span>
                <span className="c10-team-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Cards de Detalhe da Aba Ativa */}
          <div className="c10-content-cards" style={{ padding: '0 14px' }}>
            
            {activeSubTab === 'geral' && (
              <>
                {/* Card 1: Estatísticas Gerais */}
                <div className="c10-glass-card c10-card-with-bg">
                  <div 
                    className="c10-card-bg" 
                    style={{ backgroundImage: `url(${stadiumNeonBg})` }} 
                  />
                  <div className="c10-card-overlay" />

                  <div className="c10-card-body-content">
                    <div className="c10-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IoTrophyOutline size={16} className="c10-highlight-green" />
                        <span className="c10-card-title">Estatísticas Gerais</span>
                      </div>
                      <span className="c10-team-link" style={{ fontSize: '10px' }} onClick={() => alert('Ver estatísticas')}>Ver mais <IoChevronForward size={10} /></span>
                    </div>

                    {/* Aproveitamento: Número à esquerda e barra à direita na mesma linha */}
                    <div className="c10-team-stats-progress-row">
                      <div className="c10-team-stats-val-group">
                        <span className="c10-team-stats-percentage">67%</span>
                        <span className="c10-team-stats-label-sub">Aproveitamento</span>
                      </div>
                      {/* Barra de Progresso Neon */}
                      <div className="c10-team-progress-bar-container">
                        <div className="c10-team-progress-bar-fill" style={{ width: '67%' }} />
                      </div>
                    </div>

                    {/* Todos os 6 dados na mesma linha horizontal */}
                    <div className="c10-team-stats-summary-grid">
                      <div className="c10-team-stat-summary-item">
                        <span className="c10-summary-num">24</span>
                        <span className="c10-summary-lbl">Jogos</span>
                      </div>
                      <div className="c10-team-stat-summary-item">
                        <span className="c10-summary-num c10-highlight-green">16</span>
                        <span className="c10-summary-lbl">Vitórias</span>
                      </div>
                      <div className="c10-team-stat-summary-item">
                        <span className="c10-summary-num" style={{ color: '#fbbf24' }}>4</span>
                        <span className="c10-summary-lbl">Empates</span>
                      </div>
                      <div className="c10-team-stat-summary-item">
                        <span className="c10-summary-num" style={{ color: '#ef4444' }}>4</span>
                        <span className="c10-summary-lbl">Derrotas</span>
                      </div>
                      <div className="c10-team-stat-summary-item">
                        <span className="c10-summary-num">68</span>
                        <span className="c10-summary-lbl">Gols Marc.</span>
                      </div>
                      <div className="c10-team-stat-summary-item">
                        <span className="c10-summary-num">32</span>
                        <span className="c10-summary-lbl">Gols Sofr.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Informações do Time (Grid 2x2 Fiel ao Print) */}
                <div className="c10-glass-card">
                  <div className="c10-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IoInformationCircleOutline size={16} className="c10-highlight-green" />
                      <span className="c10-card-title">Informações do Time</span>
                    </div>
                  </div>

                  <div className="c10-team-info-grid">
                    <div className="c10-team-info-item">
                      <div className="c10-team-info-icon-wrapper">
                        <IoFootballOutline size={18} />
                      </div>
                      <div className="c10-team-info-texts">
                        <span className="c10-info-lbl">Modalidade</span>
                        <span className="c10-info-val">7x7</span>
                      </div>
                    </div>

                    <div className="c10-team-info-item">
                      <div className="c10-team-info-icon-wrapper">
                        <IoLocationOutline size={18} />
                      </div>
                      <div className="c10-team-info-texts">
                        <span className="c10-info-lbl">Local</span>
                        <span className="c10-info-val">São Paulo, SP</span>
                      </div>
                    </div>

                    <div className="c10-team-info-item">
                      <div className="c10-team-info-icon-wrapper">
                        <IoCalendarOutline size={18} />
                      </div>
                      <div className="c10-team-info-texts">
                        <span className="c10-info-lbl">Fundação</span>
                        <span className="c10-info-val">12/03/2023</span>
                      </div>
                    </div>

                    <div className="c10-team-info-item">
                      <div className="c10-team-info-icon-wrapper">
                        <IoFlashOutline size={18} />
                      </div>
                      <div className="c10-team-info-texts">
                        <span className="c10-info-lbl">Estilo de Jogo</span>
                        <span className="c10-info-val c10-highlight-green">Ofensivo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSubTab !== 'geral' && (
              <div className="c10-glass-card" style={{ textAlign: 'center', padding: '30px 10px' }}>
                <span className="c10-text-muted">Nenhum conteúdo simulado para a aba "{activeSubTab.toUpperCase()}" nesta sandbox.</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

