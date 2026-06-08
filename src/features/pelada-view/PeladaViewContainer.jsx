import React, { useState, useEffect } from 'react';
import PeladaHeader from './components/PeladaHeader';
import SessionCard from './components/SessionCard';
import ScorersCard from './components/ScorersCard';
import PlayerDashboard from './components/PlayerDashboard';
import BottomNavBar from './components/BottomNavBar';
import PeladaHub from './components/PeladaHub';
import TeamProfileView from './components/TeamProfileView';
import EventWallet from './components/EventWallet';
import EventCalendar from './components/EventCalendar';
import { 
  IoPlayOutline, 
  IoFileTrayOutline, 
  IoChatbubbleEllipsesOutline,
  IoChevronDown,
  IoPersonAddOutline,
  IoFlashOutline,
  IoClose,
  IoAdd,
  IoCheckmarkCircle,
  IoFilterOutline,
  IoChevronBack,
  IoShareSocialOutline,
  IoSettingsOutline,
  IoWalletOutline
} from 'react-icons/io5';
import './PeladaView.css';

// Importando avatares para simulação de novos jogadores
import avatarCarlos from '../../assets/avatar-carlos.png';
import avatarRafael from '../../assets/avatar-rafael.png';
import campoRefletores from '../../assets/campo-refletores.png';
import stadiumDiagonalDark from '../../assets/stadium_diagonal_dark.png';

export default function PeladaViewContainer() {
  // Estados interativos
  const [view, setView] = useState('hub');
  const [activeTab, setActiveTab] = useState('arena');
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveScore, setLiveScore] = useState({ timeA: 0, timeB: 0 });
  const [liveTime, setLiveTime] = useState(0);
  
  // Lista de jogadores (com goleiros integrados)
  const [playerCounts, setPlayerCounts] = useState({
    total: 20,
    confirmados: 16,
    pendentes: 3,
    recusados: 1
  });

  // Lista de goleiros confirmados
  const [goleiros, setGoleiros] = useState([
    { id: 1, name: 'Carlos Silva', avatar: avatarCarlos, status: 'Confirmado' },
    { id: 2, name: 'Rafael Santos', avatar: avatarRafael, status: 'Confirmado' }
  ]);

  // Modais de simulação
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerStatus, setNewPlayerStatus] = useState('Confirmado');
  const [newPlayerIsGk, setNewPlayerIsGk] = useState(false);

  const [showDrawTeamsModal, setShowDrawTeamsModal] = useState(false);
  const [drawnTeams, setDrawnTeams] = useState(null);

  // Efeito para cronômetro do modo Ao Vivo
  useEffect(() => {
    let interval;
    if (isLiveActive) {
      interval = setInterval(() => {
        setLiveTime((prev) => prev + 1);
        // Chance aleatória de sair gol na simulação
        if (Math.random() < 0.1) {
          setLiveScore((prev) => {
            const time = Math.random() > 0.5 ? 'timeA' : 'timeB';
            return { ...prev, [time]: prev[time] + 1 };
          });
        }
      }, 1000);
    } else {
      setLiveTime(0);
      setLiveScore({ timeA: 0, timeB: 0 });
    }
    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Formatar tempo do cronômetro (ex: 45:12)
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Sorteador de times simulado
  const handleDrawTeams = () => {
    const playersList = [
      'Carlos Silva 🧤', 'Rafael Santos 🧤', 'Moisés Oliveira', 'Lucas Souza', 
      'Felipe Costa', 'Bruno Lima', 'Gustavo Henrique', 'Gabriel Silva', 
      'Matheus Santos', 'Eduardo Santos', 'Thiago Rocha', 'Renan Silva', 
      'Diego Barbosa', 'Vitor Hugo', 'Rodrigo Alves', 'Alexandre Junior'
    ];
    
    // Embaralhar
    const shuffled = [...playersList].sort(() => Math.random() - 0.5);
    
    // Distribuir em Time A (Sem Colete) e Time B (Com Colete)
    const teamA = shuffled.slice(0, 8);
    const teamB = shuffled.slice(8, 16);
    
    setDrawnTeams({ teamA, teamB });
    setShowDrawTeamsModal(true);
  };

  // Adicionar jogador dinâmico
  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    // Atualiza contadores
    setPlayerCounts(prev => {
      const counts = { ...prev };
      counts.total += 1;
      if (newPlayerStatus === 'Confirmado') counts.confirmados += 1;
      else if (newPlayerStatus === 'Pendente') counts.pendentes += 1;
      else counts.recusados += 1;
      return counts;
    });

    // Se for goleiro confirmado, adiciona na lista de goleiros
    if (newPlayerIsGk && newPlayerStatus === 'Confirmado') {
      const newGk = {
        id: Date.now(),
        name: newPlayerName,
        avatar: Math.random() > 0.5 ? avatarCarlos : avatarRafael,
        status: 'Confirmado'
      };
      setGoleiros(prev => [...prev, newGk]);
    }

    // Reset
    setNewPlayerName('');
    setNewPlayerIsGk(false);
    setShowAddPlayerModal(false);
  };

  return (
    <div className="c10-app-wrapper">
      <div className="c10-mobile-container">
        
        {view === 'hub' ? (
          <PeladaHub onSelectPelada={(id) => setView(id)} />
        ) : view === 'times' ? (
          <>
            {/* Imagem de Fundo Fixa do Time */}
            <div 
              className="c10-fixed-bg"
              style={{ backgroundImage: `url(${stadiumDiagonalDark})` }}
            />
            <div className="c10-fixed-bg-overlay-team" />
            
            <TeamProfileView onBack={() => setView('hub')} />
          </>
        ) : view === 'carteira' ? (
          <EventWallet onBack={() => setView('teste')} onViewCalendar={() => setView('calendario')} />
        ) : view === 'calendario' ? (
          <EventCalendar onBack={() => setView('teste')} onViewWallet={() => setView('carteira')} />
        ) : (
          <>
            {/* Imagem de Fundo Fixa */}
            <div 
              className="c10-fixed-bg"
              style={{ backgroundImage: `url(${campoRefletores})` }}
            />
            <div className="c10-fixed-bg-overlay" />
    
            {/* Botões de Ação Superiores (Fixos) */}
            <div className="c10-header-actions-fixed">
              <button className="c10-round-btn" aria-label="Voltar" onClick={() => setView('hub')}>
                <IoChevronBack size={20} />
              </button>
              <div className="c10-header-right-btns">
                <button className="c10-round-btn" aria-label="Compartilhar" onClick={() => alert('Compartilhar')}>
                  <IoShareSocialOutline size={20} />
                </button>
                <button className="c10-round-btn" aria-label="Configurações" onClick={() => alert('Configurações')}>
                  <IoSettingsOutline size={20} />
                </button>
              </div>
            </div>
    
            {/* Área de Conteúdo Rolável */}
            <div className="c10-scroll-content">
          
          {/* 1. Cabeçalho */}
          <PeladaHeader 
            totalJogadores={playerCounts.total} 
            totalSessoes={57} 
          />

          {/* Painel Desfocado que desliza por cima do fundo */}
          <div className="c10-scroll-glass-panel">

            {/* 2. Botões Rápidos */}
            <div className="c10-quick-actions">
              <button 
                className={`c10-action-btn-live ${isLiveActive ? 'animate-pulse' : ''}`}
                onClick={() => setIsLiveActive(!isLiveActive)}
              >
                <IoPlayOutline size={20} />
                <span>Ao Vivo</span>
              </button>
              <button 
                className="c10-action-btn-col"
                onClick={() => setView('carteira')}
              >
                <IoWalletOutline className="c10-btn-icon-col" />
                <span>Carteira</span>
              </button>
              <button className="c10-action-btn-col" onClick={() => alert('Abrindo chat do evento')}>
                <IoChatbubbleEllipsesOutline className="c10-btn-icon-col" />
                <span>Chat do evento</span>
              </button>
            </div>

        {/* Simulador da Partida Ao Vivo (Se ativo) */}
        {isLiveActive && (
          <div className="c10-glass-card animate-fade-in-up" style={{ margin: '0 20px 16px 20px', border: '1px solid rgba(163, 230, 53, 0.4)', background: 'linear-gradient(to bottom, rgba(163, 230, 53, 0.05), rgba(11, 21, 40, 0.95))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="c10-highlight-green" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-neon-lime)', display: 'inline-block', boxShadow: '0 0 10px var(--color-neon-lime)' }} />
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-neon-lime)' }}>Partida Simulada</span>
              </div>
              <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-muted)' }}>{formatTime(liveTime)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '12px 0 4px 0' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>Time A</div>
                <div style={{ fontSize: '28px', fontFamily: 'var(--font-title)', fontWeight: '900', color: 'var(--color-neon-lime)' }}>{liveScore.timeA}</div>
              </div>
              <div style={{ fontSize: '16px', color: 'var(--text-dim)', fontWeight: '700' }}>VS</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>Time B</div>
                <div style={{ fontSize: '28px', fontFamily: 'var(--font-title)', fontWeight: '900', color: 'var(--color-neon-lime)' }}>{liveScore.timeB}</div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Cards do Conteúdo */}
        <div className="c10-content-cards">
          
          {/* Card Sessão */}
          <SessionCard 
            confirmados={playerCounts.confirmados} 
            total={playerCounts.total} 
            onProgressClick={() => setView('calendario')}
          />

          {/* Card Artilheiros */}
          <ScorersCard 
            ano={2025} 
            onViewStats={() => alert('Redirecionando para estatísticas completas dos artilheiros')}
          />

          {/* Header da lista de jogadores */}
          <div className="c10-section-header-block">
            <h2 className="c10-section-title">Lista de Jogadores ({playerCounts.total})</h2>
            <div className="c10-filter-dropdown" onClick={() => alert('Opções de filtro: Confirmados, Pendentes, Recusados, Todos')}>
              <IoFilterOutline size={14} style={{ color: 'var(--text-muted)' }} />
              <span>Todos</span>
              <IoChevronDown />
            </div>
          </div>

          {/* Dashboard e Goleiros */}
          <PlayerDashboard 
            total={playerCounts.total}
            confirmados={playerCounts.confirmados}
            pendentes={playerCounts.pendentes}
            recusados={playerCounts.recusados}
            goleiros={goleiros}
          />

        </div>

        {/* 4. Botões de Ação Finais */}
        <div className="c10-footer-actions">
          <button 
            className="c10-primary-btn"
            onClick={() => setShowAddPlayerModal(true)}
          >
            <IoPersonAddOutline size={15} />
            <span>Adicionar Jogadores</span>
          </button>
          <button 
            className="c10-outline-btn"
            onClick={handleDrawTeams}
          >
            <IoFlashOutline size={15} />
            <span>Sortear Times</span>
          </button>
        </div>
        </div> {/* Fecha c10-scroll-glass-panel */}
        </div> {/* Fecha c10-scroll-content */}
        </>
        )}

        {/* 5. Barra de Navegação Inferior */}
        <BottomNavBar 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'arena') {
              setView('hub'); // Volta para a home hub se clicar na aba principal
            } else {
              alert(`Simulando navegação para a aba: ${tab.toUpperCase()}`);
            }
          }}
          onCenterClick={() => alert('Menu rápido do Camisa10 aberto!')}
        />

        {/* --- MODAL SIMULADO: Adicionar Jogador --- */}
        {showAddPlayerModal && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5, 11, 20, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="c10-glass-card animate-slideUp" style={{ width: '100%', maxWidth: '380px', backgroundColor: '#0d192e', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="c10-card-title" style={{ fontSize: '18px' }}>Adicionar Jogador</h3>
                <button onClick={() => setShowAddPlayerModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <IoClose size={24} />
                </button>
              </div>
              <form onSubmit={handleAddPlayer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>Nome do Jogador</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Pedro Henrique" 
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-main)', fontSize: '14px', outline: 'none' }}
                    required 
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>Status de Presença</label>
                  <select 
                    value={newPlayerStatus}
                    onChange={(e) => setNewPlayerStatus(e.target.value)}
                    style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-main)', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Recusou">Recusou</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
                  <input 
                    type="checkbox" 
                    id="isGk"
                    checked={newPlayerIsGk}
                    onChange={(e) => setNewPlayerIsGk(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--color-neon-lime)' }}
                  />
                  <label htmlFor="isGk" style={{ fontSize: '14px', cursor: 'pointer' }}>Goleiro de Posição?</label>
                </div>

                <button type="submit" className="c10-primary-btn" style={{ marginTop: '8px' }}>
                  <IoAdd size={18} />
                  <span>Adicionar à Lista</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL SIMULADO: Sorteio de Times --- */}
        {showDrawTeamsModal && drawnTeams && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5, 11, 20, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="c10-glass-card animate-slideUp" style={{ width: '100%', maxWidth: '400px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0d192e', borderColor: 'rgba(255,255,255,0.1)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IoFlashOutline style={{ color: 'var(--color-neon-lime)', fontSize: '20px' }} />
                  <h3 className="c10-card-title" style={{ fontSize: '18px' }}>Times Sorteados</h3>
                </div>
                <button onClick={() => setShowDrawTeamsModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <IoClose size={24} />
                </button>
              </div>

              {/* Lista dos Times */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
                
                {/* Time A */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '800', color: 'var(--color-neon-lime)' }}>TIME A (Sem Colete)</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{drawnTeams.teamA.length} Jogadores</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {drawnTeams.teamA.map((player, idx) => (
                      <div key={idx} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>{idx+1}.</span>
                        <span>{player}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time B */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '800', color: 'var(--color-confirmed)' }}>TIME B (Com Colete)</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{drawnTeams.teamB.length} Jogadores</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {drawnTeams.teamB.map((player, idx) => (
                      <div key={idx} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--text-dim)', fontSize: '10px' }}>{idx+1}.</span>
                        <span>{player}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Botão de Refazer */}
              <button 
                className="c10-primary-btn" 
                style={{ marginTop: '16px', width: '100%' }}
                onClick={handleDrawTeams}
              >
                <IoFlashOutline size={18} />
                <span>Refazer Sorteio</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
