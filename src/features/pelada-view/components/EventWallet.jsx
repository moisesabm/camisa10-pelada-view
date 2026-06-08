import React, { useState } from 'react';
import { 
  IoChevronBack, 
  IoWalletOutline, 
  IoAddCircleOutline,
  IoDocumentTextOutline, 
  IoDownloadOutline, 
  IoReceiptOutline, 
  IoChevronForward, 
  IoCalendarOutline, 
  IoSearchOutline, 
  IoFilterOutline, 
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoHourglassOutline,
  IoReorderTwoOutline
} from 'react-icons/io5';
import avatarCarlos from '../../../assets/avatar-carlos.png';
import avatarRafael from '../../../assets/avatar-rafael.png';
import stadiumNeonBg from '../../../assets/stadium_neon_bg.png';

export default function EventWallet({ onBack }) {
  const [activeSubTab, setActiveSubTab] = useState('geral');
  const [searchQuery, setSearchQuery] = useState('');

  // 18 jogadores simulados usando os avatares do app
  const paymentsList = [
    { id: 1, name: 'João da Silva', role: 'Atacante', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarCarlos },
    { id: 2, name: 'Lucas Oliveira', role: 'Zagueiro', type: 'Confirmado', amount: 25, status: 'Pendente', valDate: null, avatar: avatarRafael },
    { id: 3, name: 'Bruno Ferreira', role: 'Meio-campo', type: 'Mensalista', amount: null, status: 'Mensalista', valDate: '15/08/2026', avatar: avatarCarlos },
    { id: 4, name: 'Diego Martins', role: 'Meio-campo', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarRafael },
    { id: 5, name: 'Rodrigo Costa', role: 'Atacante', type: 'Confirmado', amount: 25, status: 'Pendente', valDate: null, avatar: avatarCarlos },
    { id: 6, name: 'Pedro Santos', role: 'Goleiro', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarCarlos },
    { id: 7, name: 'Gustavo Lima', role: 'Zagueiro', type: 'Confirmado', amount: 25, status: 'Pendente', valDate: null, avatar: avatarRafael },
    { id: 8, name: 'Bruno Silva', role: 'Meio-campo', type: 'Mensalista', amount: null, status: 'Mensalista', valDate: '10/09/2026', avatar: avatarCarlos },
    { id: 9, name: 'Felipe Costa', role: 'Atacante', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarRafael },
    { id: 10, name: 'Gabriel Henrique', role: 'Zagueiro', type: 'Confirmado', amount: 25, status: 'Pendente', valDate: null, avatar: avatarCarlos },
    { id: 11, name: 'Matheus Rocha', role: 'Meio-campo', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarRafael },
    { id: 12, name: 'Eduardo Silva', role: 'Atacante', type: 'Mensalista', amount: null, status: 'Mensalista', valDate: '20/08/2026', avatar: avatarCarlos },
    { id: 13, name: 'Thiago Junior', role: 'Goleiro', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarRafael },
    { id: 14, name: 'Renan Barbosa', role: 'Zagueiro', type: 'Confirmado', amount: 25, status: 'Pendente', valDate: null, avatar: avatarCarlos },
    { id: 15, name: 'Diego Alves', role: 'Meio-campo', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarRafael },
    { id: 16, name: 'Vitor Hugo', role: 'Atacante', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarCarlos },
    { id: 17, name: 'Rodrigo Junior', role: 'Meio-campo', type: 'Mensalista', amount: null, status: 'Mensalista', valDate: '12/10/2026', avatar: avatarRafael },
    { id: 18, name: 'Alexandre Santos', role: 'Zagueiro', type: 'Confirmado', amount: 25, status: 'Pago', valDate: null, avatar: avatarCarlos }
  ];

  // Filtro por busca
  const filteredPayments = paymentsList.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="c10-wallet-container">
      {/* 1. Cabeçalho da Carteira */}
      <div className="c10-wallet-header">
        <div className="c10-wallet-header-left">
          <button className="c10-round-btn" aria-label="Voltar" onClick={onBack}>
            <IoChevronBack size={20} />
          </button>
          <div className="c10-wallet-header-title-block">
            <h1 className="c10-wallet-title">Carteira do Evento</h1>
            <p className="c10-wallet-subtitle">Pelada de Teste</p>
          </div>
        </div>

        <div className="c10-wallet-header-right">
          <div className="c10-wallet-balance-block">
            <span className="c10-wallet-balance-label">SALDO DISPONÍVEL</span>
            <span className="c10-wallet-balance-value">R$ 225,00</span>
          </div>
          <div className="c10-wallet-icon-circle">
            <IoWalletOutline size={20} style={{ color: 'var(--color-neon-lime)' }} />
          </div>
        </div>
      </div>
      
      {/* Área Rolável de Conteúdo (Rola por trás do cabeçalho transparente) */}
      <div className="c10-wallet-scroll-content">
        
        {/* 2. Card de Resumo Financeiro */}
        <div className="c10-glass-card c10-wallet-summary-card c10-card-with-bg">
          <div 
            className="c10-card-bg" 
            style={{ backgroundImage: `url(${stadiumNeonBg})` }} 
          />
          <div className="c10-card-overlay" />
          
          <div className="c10-card-body-content c10-wallet-summary-content" style={{ zIndex: 3 }}>
            <div className="c10-wallet-card-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '14px' }}>
              <span className="c10-wallet-card-label-neon" style={{ marginBottom: 0 }}>RESUMO FINANCEIRO</span>
              
              {/* Botões Rápidos acima à direita do card */}
              <div className="c10-wallet-quick-actions-group" style={{ display: 'flex', gap: '8px' }}>
                <div className="c10-wallet-action-item-small" onClick={() => alert('Nova Cobrança')}>
                  <div className="c10-wallet-action-btn-small">
                    <IoAddCircleOutline size={13} />
                  </div>
                  <span className="c10-wallet-action-lbl-small">Cobrar</span>
                </div>
                <div className="c10-wallet-action-item-small" onClick={() => alert('Extrato Financeiro')}>
                  <div className="c10-wallet-action-btn-small">
                    <IoDocumentTextOutline size={13} />
                  </div>
                  <span className="c10-wallet-action-lbl-small">Extrato</span>
                </div>
                <div className="c10-wallet-action-item-small" onClick={() => alert('Exportar Planilha')}>
                  <div className="c10-wallet-action-btn-small">
                    <IoDownloadOutline size={13} />
                  </div>
                  <span className="c10-wallet-action-lbl-small">Exportar</span>
                </div>
                <div className="c10-wallet-action-item-small" onClick={() => alert('Recibos Enviados')}>
                  <div className="c10-wallet-action-btn-small">
                    <IoReceiptOutline size={13} />
                  </div>
                  <span className="c10-wallet-action-lbl-small">Recibos</span>
                </div>
              </div>
            </div>
            
            <div className="c10-wallet-summary-grid">
              <div className="c10-wallet-summary-column-left">
                <div className="c10-wallet-summary-item">
                  <span className="c10-wallet-item-label">Arrecadado</span>
                  <span className="c10-wallet-item-val-green">R$ 225,00</span>
                </div>
                <div className="c10-wallet-summary-item" style={{ marginTop: '12px' }}>
                  <span className="c10-wallet-item-label">Pendentes</span>
                  <span className="c10-wallet-item-val-orange">R$ 5.075,00</span>
                </div>
              </div>
              
              <div className="c10-wallet-summary-column-right">
                <div className="c10-wallet-summary-item">
                  <span className="c10-wallet-item-label">Sessões</span>
                  <span className="c10-wallet-item-val-white">16</span>
                </div>
                <div className="c10-wallet-summary-item" style={{ marginTop: '12px' }}>
                  <span className="c10-wallet-item-label">Pagamentos</span>
                  <span className="c10-wallet-item-val-white">9 / 212</span>
                </div>
              </div>
            </div>
  
            {/* Barra de Progresso Horizontal dos Pagamentos */}
            <div className="c10-wallet-progress-bar-block">
              <div className="c10-wallet-progress-bar-track">
                <div className="c10-wallet-progress-bar-fill" style={{ width: '4%' }} />
              </div>
              <span className="c10-wallet-progress-percentage">4%</span>
            </div>
          </div>
        </div>
  
        {/* 3. Abas Horizontais Internas */}
        <div className="c10-wallet-subtabs-bar">
          {[
            { id: 'geral', label: 'Geral' },
            { id: 'mensalistas', label: 'Mensalistas' },
            { id: 'despesas', label: 'Despesas' },
            { id: 'extrato', label: 'Extrato' }
          ].map((tab) => (
            <button 
              key={tab.id}
              className={`c10-wallet-subtab-item ${activeSubTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <span>{tab.label}</span>
              {activeSubTab === tab.id && <div className="c10-wallet-subtab-indicator" />}
            </button>
          ))}
        </div>
        
        {activeSubTab === 'geral' ? (
          <>
            {/* 4. Grid de Cards do Meio (Sessão Atual + Taxa de Pagamento) */}
            <div className="c10-wallet-mid-row">
              {/* Card Sessão Atual */}
              <div className="c10-glass-card" style={{ flex: 1.8 }}>
                <span className="c10-wallet-card-label-neon" style={{ fontSize: '7.5px' }}>SESSÃO ATUAL</span>
                <div className="c10-wallet-session-content" onClick={() => alert('Detalhes da Sessão #16')}>
                  <div className="c10-wallet-session-icon-box">
                    <IoCalendarOutline size={20} />
                  </div>
                  <div className="c10-wallet-session-texts">
                    <span className="c10-wallet-session-num">Sessão #16</span>
                    <span className="c10-wallet-session-players">18 jogadores</span>
                    <span className="c10-wallet-session-date">19/01/2026, 21:00</span>
                  </div>
                  <IoChevronForward className="c10-wallet-session-arrow" />
                </div>
              </div>

              {/* Card Taxa de Pagamento (Circular Progress Ring SVG) */}
              <div className="c10-glass-card" style={{ flex: 1, maxWidth: '120px' }}>
                <span className="c10-wallet-card-label-neon" style={{ fontSize: '7px', whiteSpace: 'nowrap' }}>TAXA DE PAGAMENTO</span>
                
                <div className="c10-wallet-chart-block">
                  <div className="c10-wallet-radial-wrapper">
                    <svg width="44" height="44" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="22"
                        cy="22"
                        r="17"
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="17"
                        fill="transparent"
                        stroke="var(--color-neon-lime)"
                        strokeWidth="3"
                        strokeDasharray="106.8"
                        strokeDashoffset="35.2"
                        strokeLinecap="round"
                        style={{
                          filter: 'drop-shadow(0 0 3px var(--color-neon-lime-glow))',
                          transition: 'stroke-dashoffset 0.8s ease-in-out',
                        }}
                      />
                    </svg>
                    <div className="c10-wallet-radial-text">67%</div>
                  </div>
                  <span className="c10-wallet-radial-sublabel">Taxa de aprovação</span>
                </div>
              </div>
            </div>

            {/* 5. Barra de Busca e Filtros */}
            <div className="c10-wallet-search-bar-row">
              <div className="c10-wallet-search-input-wrapper">
                <IoSearchOutline className="c10-wallet-search-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar jogador..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="c10-wallet-search-input"
                />
              </div>
              <button className="c10-wallet-filter-btn" onClick={() => alert('Abrindo Filtros')}>
                <IoFilterOutline size={16} />
                <span>Filtros</span>
              </button>
            </div>

            {/* 6. Listagem de Pagamentos */}
            <div className="c10-wallet-list-section">
              <div className="c10-wallet-section-header">
                <span className="c10-wallet-section-title">PAGAMENTOS</span>
                <span className="c10-wallet-badge-count">{filteredPayments.length}</span>
              </div>

              <div className="c10-wallet-players-list">
                {filteredPayments.map((player) => (
                  <div key={player.id} className="c10-wallet-player-row">
                    {/* Avatar do Jogador */}
                    <div className="c10-wallet-avatar-img-wrapper">
                      <img src={player.avatar} alt={player.name} className="c10-wallet-avatar-img" />
                    </div>

                    {/* Informações Centrais */}
                    <div className="c10-wallet-player-info">
                      <div className="c10-wallet-player-name-row">
                        <span className="c10-wallet-player-name">{player.name}</span>
                        <span className={`c10-wallet-badge-type ${player.type === 'Mensalista' ? 'c10-badge-mensalista' : 'c10-badge-confirmado'}`}>
                          {player.type}
                        </span>
                      </div>
                      <span className="c10-wallet-player-role">{player.role}</span>
                    </div>

                    {/* Status de Pagamento e Ações à Direita */}
                    <div className="c10-wallet-player-payment-block">
                      {player.status === 'Pago' && (
                        <div className="c10-wallet-status-pago">
                          <span className="c10-wallet-value-text">R$ {player.amount.toFixed(2)}</span>
                          <div className="c10-wallet-status-row">
                            <span className="c10-status-lbl">Pago</span>
                            <IoCheckmarkCircle size={10} className="c10-status-icon-check" />
                          </div>
                        </div>
                      )}
                      
                      {player.status === 'Pendente' && (
                        <div className="c10-wallet-status-pendente">
                          <span className="c10-wallet-value-text">R$ {player.amount.toFixed(2)}</span>
                          <div className="c10-wallet-status-row">
                            <span className="c10-status-lbl">Pendente</span>
                            <IoHourglassOutline size={10} className="c10-status-icon-hourglass" />
                          </div>
                        </div>
                      )}

                      {player.status === 'Mensalista' && (
                        <div className="c10-wallet-status-mensalista">
                          <span className="c10-wallet-mensalista-label">Válido até</span>
                          <span className="c10-wallet-mensalista-date">{player.valDate}</span>
                        </div>
                      )}

                      {/* Ícone de menu ou reordenador */}
                      {player.status === 'Mensalista' ? (
                        <IoReorderTwoOutline className="c10-wallet-reorder-icon" size={18} />
                      ) : (
                        <button className="c10-wallet-row-action-btn" onClick={() => alert(`Ações para ${player.name}`)}>
                          <IoEllipsisVertical size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {filteredPayments.length === 0 && (
                  <div className="c10-wallet-empty-search">
                    Nenhum jogador encontrado com "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="c10-wallet-empty-tab">
            <span className="c10-text-muted">Nenhum conteúdo simulado para a aba "{activeSubTab.toUpperCase()}" nesta sandbox.</span>
          </div>
        )}

      </div>
    </div>
  );
}
