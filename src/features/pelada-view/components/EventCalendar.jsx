import React, { useState } from 'react';
import { 
  IoChevronBack, 
  IoChevronForward,
  IoCalendarOutline, 
  IoLocationOutline, 
  IoCheckmarkCircle, 
  IoCloseCircle, 
  IoTimeOutline, 
  IoCashOutline, 
  IoPeopleOutline, 
  IoTrophyOutline,
  IoAlertCircleOutline,
  IoListOutline,
  IoGridOutline,
  IoCalendarClearOutline,
  IoFilterOutline
} from 'react-icons/io5';
import stadiumDiagonalDark from '../../../assets/stadium_diagonal_dark.png';
import stadiumNeonBg from '../../../assets/stadium_neon_bg.png';

// Constante com os nomes dos dias da semana
const WEEKDAY_NAMES = ["D", "S", "T", "Q", "Q", "S", "S"];

// Nomes dos meses em português
const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function EventCalendar({ onBack, onViewWallet }) {
  const [activeDate, setActiveDate] = useState(new Date(2026, 0, 19)); // Mês base: Janeiro 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 19)); // Data selecionada
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('todos'); // 'todos', 'agendada', 'confirmada', 'finalizada'

  // Dados fictícios ricos de peladas/sessões vinculadas a datas específicas
  const sessions = [
    {
      id: 17,
      number: 17,
      dateStr: '2026-01-26', // Segunda-feira
      time: '21:00',
      status: 'Agendada', 
      location: 'Quadra Society Central',
      confirmados: 8,
      total: 20,
      arrecadado: 200,
      metaFinanceira: 500,
      preco: 25,
      pagos: 2,
      userPresence: 'Pendente', 
      userPayment: 'Pendente'
    },
    {
      id: 16,
      number: 16,
      dateStr: '2026-01-19', // Segunda-feira (Hoje na nossa simulação)
      time: '21:00',
      status: 'Confirmada',
      location: 'Quadra Society Central',
      confirmados: 16,
      total: 20,
      arrecadado: 225,
      metaFinanceira: 500,
      preco: 25,
      pagos: 9,
      userPresence: 'Confirmado',
      userPayment: 'Pago'
    },
    {
      id: 15,
      number: 15,
      dateStr: '2026-01-12', // Segunda-feira
      time: '21:00',
      status: 'Finalizada',
      location: 'Quadra Society Central',
      confirmados: 18,
      total: 20,
      arrecadado: 450,
      metaFinanceira: 500,
      preco: 25,
      pagos: 18,
      placar: { timeA: 5, timeB: 3 },
      artilheiro: 'João da Silva (3 gols)',
      userPresence: 'Confirmado',
      userPayment: 'Pago'
    },
    {
      id: 14,
      number: 14,
      dateStr: '2026-01-05', // Segunda-feira
      time: '21:00',
      status: 'Finalizada',
      location: 'Quadra Society Central',
      confirmados: 15,
      total: 20,
      arrecadado: 375,
      metaFinanceira: 500,
      preco: 25,
      pagos: 15,
      placar: { timeA: 2, timeB: 2 },
      artilheiro: 'Moisés Oliveira (2 gols)',
      userPresence: 'Confirmado',
      userPayment: 'Pago'
    },
    {
      id: 13,
      number: 13,
      dateStr: '2025-12-29', // Segunda-feira
      time: '21:00',
      status: 'Finalizada',
      location: 'Arena Society Gol',
      confirmados: 14,
      total: 20,
      arrecadado: 350,
      metaFinanceira: 400,
      preco: 25,
      pagos: 14,
      placar: { timeA: 1, timeB: 4 },
      artilheiro: 'Rafael Santos (2 gols)',
      userPresence: 'Recusou',
      userPayment: 'Isento'
    }
  ];

  // Helper para formatar a data como YYYY-MM-DD local
  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Helper para verificar se duas datas são no mesmo dia
  const isSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  // Obter sessões do dia e filtrar por status
  const getEventsForDate = (date) => {
    const key = formatDateKey(date);
    return sessions.filter(s => {
      const matchDate = s.dateStr === key;
      const matchStatus = statusFilter === 'todos' || s.status.toLowerCase() === statusFilter;
      return matchDate && matchStatus;
    });
  };

  // Estatísticas consolidadas baseadas nos dados reais
  const totalSessoes = sessions.length;
  const totalArrecadadoGeral = sessions.reduce((acc, curr) => acc + curr.arrecadado, 0);
  const mediaPresenca = Math.round(
    (sessions.reduce((acc, curr) => acc + curr.confirmados, 0) / (totalSessoes * 20)) * 100
  );

  // Lógica segura para gerar os dias da grade mensal (livre de bugs de fuso horário e meses negativos)
  const generateMonthDays = () => {
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Obter o total de dias do mês anterior com segurança
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthTotalDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    const days = [];
    
    // Dias do mês anterior
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(prevYear, prevMonth, prevMonthTotalDays - i),
        isCurrentMonth: false
      });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Dias do mês seguinte para fechar as 6 semanas (42 dias)
    const remaining = 42 - days.length;
    const nextYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(nextYear, nextMonth, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Lógica para gerar os dias da grade semanal
  const generateWeekDays = () => {
    const current = new Date(selectedDate);
    const dayOfWeek = current.getDay();
    const days = [];
    
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - dayOfWeek);
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      days.push({
        date: d,
        isCurrentMonth: d.getMonth() === activeDate.getMonth()
      });
    }
    
    return days;
  };

  const daysGrid = viewMode === 'month' ? generateMonthDays() : generateWeekDays();

  // Navegar mês/semana
  const handleNavigate = (direction) => {
    if (viewMode === 'month') {
      const newDate = new Date(activeDate);
      newDate.setMonth(activeDate.getMonth() + (direction === 'next' ? 1 : -1));
      setActiveDate(newDate);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
      setSelectedDate(newDate);
      setActiveDate(newDate);
    }
  };

  const handleGoToToday = () => {
    const today = new Date(2026, 0, 19);
    setSelectedDate(today);
    setActiveDate(today);
  };

  // Formatar data por extenso em Português
  const formatFullDate = (date) => {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const weekday = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][date.getDay()];
    return `${weekday}, ${day} de ${month} de ${year}`;
  };

  // Listar todas as sessões filtradas (usado no modo Lista)
  const filteredAllSessions = sessions.filter(s => {
    return statusFilter === 'todos' || s.status.toLowerCase() === statusFilter;
  });

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="c10-calendar-container">
      {/* 1. Cabeçalho Fixo do Calendário */}
      <div className="c10-calendar-header">
        <div className="c10-calendar-header-left">
          <button className="c10-round-btn" aria-label="Voltar" onClick={onBack}>
            <IoChevronBack size={20} />
          </button>
          <div className="c10-calendar-header-title-block">
            <h1 className="c10-calendar-title-text">Calendário de Peladas</h1>
            <p className="c10-calendar-subtitle-text">Agenda e Histórico do Grupo</p>
          </div>
        </div>
      </div>

      {/* Área Rolável */}
      <div className="c10-calendar-scroll-content">
        
        {/* Card Resumo do Calendário com Fundo Premium de Estádio */}
        <div className="c10-glass-card c10-calendar-summary-card c10-card-with-bg">
          <div 
            className="c10-card-bg" 
            style={{ backgroundImage: `url(${stadiumNeonBg})` }} 
          />
          <div className="c10-card-overlay" />
          
          <div className="c10-card-body-content c10-calendar-summary-content" style={{ zIndex: 3 }}>
            <span className="c10-calendar-card-label-neon">RESUMO DA TEMPORADA</span>
            <div className="c10-calendar-stats-row">
              <div className="c10-calendar-stat-item">
                <span className="c10-calendar-stat-lbl">Total Sessões</span>
                <span className="c10-calendar-stat-val-white">{totalSessoes}</span>
              </div>
              <div className="c10-calendar-stat-item">
                <span className="c10-calendar-stat-lbl">Total Gols</span>
                <span className="c10-calendar-stat-val-white">32 gols</span>
              </div>
              <div className="c10-calendar-stat-item">
                <span className="c10-calendar-stat-lbl">Média Presença</span>
                <span className="c10-calendar-stat-val-neon">{mediaPresenca}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card do Calendário Principal (com imagem de estádio e overlay) */}
        <div className="c10-glass-card c10-card-with-bg" style={{ padding: '12px', flexShrink: 0 }}>
          <div 
            className="c10-card-bg" 
            style={{ backgroundImage: `url(${stadiumDiagonalDark})` }} 
          />
          <div className="c10-card-overlay" style={{
            background: 'linear-gradient(to bottom, rgba(11, 21, 40, 0.95) 0%, rgba(5, 11, 20, 0.98) 100%)'
          }} />

          {/* Conteúdo sobreposto */}
          <div className="c10-card-body-content" style={{ zIndex: 3 }}>
            
            {/* Navegador de Mês */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button
                onClick={() => handleNavigate('prev')}
                className="c10-round-btn"
                style={{ width: '28px', height: '28px', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <IoChevronBack size={14} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-title)', fontWeight: '800', fontSize: '13.5px', color: 'var(--text-main)' }}>
                  {MONTH_NAMES[activeDate.getMonth()]} {activeDate.getFullYear()}
                </span>
                <button
                  onClick={handleGoToToday}
                  style={{
                    fontSize: '9px',
                    fontWeight: '800',
                    backgroundColor: 'var(--color-neon-lime-glow-soft)',
                    color: 'var(--color-neon-lime)',
                    border: '1px solid var(--border-neon-soft)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Hoje
                </button>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`c10-round-btn ${showFilters ? 'active' : ''}`}
                  style={{ 
                    width: '28px', 
                    height: '28px', 
                    backgroundColor: showFilters ? 'var(--color-neon-lime)' : 'rgba(255,255,255,0.03)',
                    color: showFilters ? '#050b14' : 'var(--text-main)',
                    borderColor: showFilters ? 'var(--color-neon-lime)' : 'var(--border-glass)'
                  }}
                >
                  <IoFilterOutline size={14} />
                </button>
                <button
                  onClick={() => handleNavigate('next')}
                  className="c10-round-btn"
                  style={{ width: '28px', height: '28px', backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                  <IoChevronForward size={14} />
                </button>
              </div>
            </div>

            {/* Painel de Filtros Deslizante / Premium (Aparece se showFilters for true) */}
            {showFilters && (
              <div className="animate-fadeIn" style={{
                display: 'flex',
                gap: '4px',
                padding: '6px',
                backgroundColor: 'rgba(5, 11, 20, 0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: '10px',
                marginBottom: '10px',
                boxSizing: 'border-box'
              }}>
                {[
                  { id: 'todos', label: 'Todas' },
                  { id: 'agendada', label: 'Agendadas' },
                  { id: 'confirmada', label: 'Confirmadas' },
                  { id: 'finalizada', label: 'Finalizadas' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setStatusFilter(item.id)}
                    style={{
                      flex: 1,
                      backgroundColor: statusFilter === item.id ? 'var(--color-neon-lime)' : 'transparent',
                      color: statusFilter === item.id ? '#050b14' : 'var(--text-muted)',
                      border: 'none',
                      fontSize: '9px',
                      fontWeight: '800',
                      padding: '4px 2px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2px'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Abas de Modo de Visualização (Mês, Semana, Lista) */}
            <div className="c10-calendar-tabs-bar" style={{ marginBottom: '10px' }}>
              {[
                { id: 'month', label: 'Mês', icon: <IoGridOutline size={12} /> },
                { id: 'week', label: 'Semana', icon: <IoCalendarClearOutline size={12} /> },
                { id: 'list', label: 'Lista', icon: <IoListOutline size={12} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`c10-calendar-tab-item ${viewMode === tab.id ? 'active' : ''}`}
                  onClick={() => setViewMode(tab.id)}
                  style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Grade de Dias (Mês ou Semana) */}
            {viewMode !== 'list' ? (
              <>
                {/* Cabeçalho dias da semana */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '6px' }}>
                  {WEEKDAY_NAMES.map((name, idx) => (
                    <span key={idx} style={{ fontSize: '9px', fontWeight: '800', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      {name}
                    </span>
                  ))}
                </div>

                {/* Grade Física de Dias */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {daysGrid.map((dayItem, index) => {
                    const dayEvents = getEventsForDate(dayItem.date);
                    const isSelected = isSameDay(dayItem.date, selectedDate);
                    const isTodayDate = isSameDay(dayItem.date, new Date(2026, 0, 19)); // Nosso hoje simulado
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedDate(dayItem.date);
                          setActiveDate(dayItem.date);
                        }}
                        style={{
                          aspectRatio: '1',
                          backgroundColor: isSelected 
                            ? 'var(--color-neon-lime-glow-soft)' 
                            : isTodayDate 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'transparent',
                          border: isSelected 
                            ? '1.5px solid var(--color-neon-lime)' 
                            : '1.5px solid transparent',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          opacity: dayItem.isCurrentMonth ? 1 : 0.3,
                          position: 'relative',
                          padding: '0',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          color: isSelected 
                            ? 'var(--color-neon-lime)' 
                            : isTodayDate 
                            ? 'var(--color-neon-lime)' 
                            : 'var(--text-main)'
                        }}>
                          {dayItem.date.getDate()}
                        </span>

                        {/* Bolinha neon indicadora de pelada neste dia */}
                        {dayEvents.length > 0 && (
                          <span style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-neon-lime)',
                            position: 'absolute',
                            bottom: '3px',
                            boxShadow: '0 0 5px var(--color-neon-lime)'
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              // MODO LISTA INTEGRADO NO CARD PRINCIPAL (Cards Compactos Premium)
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px', maxH: '300px', overflowY: 'auto' }}>
                {filteredAllSessions.length > 0 ? (
                  filteredAllSessions.map(session => (
                    <div 
                      key={session.id} 
                      onClick={() => {
                        setSelectedDate(new Date(session.dateStr + 'T12:00:00'));
                        setViewMode('month'); // Volta para o mês selecionando-o
                      }}
                      style={{
                        backgroundColor: 'rgba(5, 11, 20, 0.65)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '10px',
                        padding: '8px 10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      className="c10-list-item-hover"
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text-main)' }}>Sessão #{session.number}</span>
                          <span style={{
                            fontSize: '6.5px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            padding: '1px 4px',
                            borderRadius: '4px',
                            backgroundColor: session.status === 'Finalizada' ? 'rgba(34,197,94,0.1)' : 'var(--color-neon-lime-glow-soft)',
                            color: session.status === 'Finalizada' ? '#22c55e' : 'var(--color-neon-lime)',
                            border: session.status === 'Finalizada' ? '1px solid rgba(34,197,94,0.2)' : '1px solid var(--border-neon-soft)'
                          }}>
                            {session.status}
                          </span>
                        </div>
                        <span style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>{session.dateStr.split('-').reverse().join('/')} às {session.time}</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-main)' }}>{session.confirmados}/{session.total} conf.</span>
                        <span style={{ fontSize: '8.5px', color: 'var(--color-neon-lime)', fontWeight: '700' }}>R$ {session.arrecadado}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    Nenhuma pelada encontrada no filtro.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Detalhes Dinâmicos abaixo do Calendário (Para dia selecionado) */}
        {viewMode !== 'list' && (
          <>
            <div className="c10-calendar-details-header" style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {formatFullDate(selectedDate)}
              </span>
            </div>

            <div className="c10-calendar-list">
              {selectedEvents.length > 0 ? (
                selectedEvents.map(session => (
                  <PeladaCardDetail key={session.id} session={session} onViewWallet={onViewWallet} />
                ))
              ) : (
                <div className="c10-calendar-empty-state" style={{ padding: '20px 12px' }}>
                  <IoAlertCircleOutline size={22} style={{ color: 'var(--text-dim)', marginBottom: '6px' }} />
                  <p style={{ margin: 0, fontSize: '11px' }}>Nenhuma pelada agendada para esta data.</p>
                  <button 
                    onClick={() => alert(`Simulando criação de nova pelada para: ${selectedDate.toLocaleDateString()}`)}
                    style={{
                      marginTop: '8px',
                      backgroundColor: 'transparent',
                      border: '1px dashed var(--border-neon-soft)',
                      color: 'var(--color-neon-lime)',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    + Agendar Pelada
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// Subcomponente de Card da Pelada Detalhado (Exibido abaixo da grade)
function PeladaCardDetail({ session, onViewWallet }) {
  return (
    <div className="c10-glass-card c10-calendar-card" style={{ padding: '14px' }}>
      
      {/* Topo do Card da Pelada (Sessão # e Badge de Status) */}
      <div className="c10-calendar-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IoCalendarOutline size={16} className="c10-highlight-green" />
          <span className="c10-calendar-session-number-title">Sessão #{session.number}</span>
        </div>
        <span className={`c10-calendar-status-badge c10-status-${session.status.toLowerCase()}`}>
          {session.status}
        </span>
      </div>

      {/* Detalhes de Data, Hora e Local */}
      <div className="c10-calendar-card-details">
        <div className="c10-calendar-detail-row">
          <IoTimeOutline size={13} className="c10-detail-icon" />
          <span className="c10-detail-txt">Segunda-feira às {session.time}</span>
        </div>
        <div className="c10-calendar-detail-row">
          <IoLocationOutline size={13} className="c10-detail-icon" />
          <span className="c10-detail-txt">{session.location}</span>
        </div>
      </div>

      {/* Informações de Confirmados e Pagos */}
      <div className="c10-calendar-grid-info">
        
        {/* Lado Esquerdo: Confirmados */}
        <div className="c10-calendar-info-box">
          <div className="c10-calendar-info-box-header">
            <IoPeopleOutline size={13} className="c10-box-icon" />
            <span>Confirmados</span>
          </div>
          <span className="c10-calendar-info-box-val">
            {session.confirmados} <span className="c10-calendar-info-box-total">/ {session.total}</span>
          </span>
          <div className="c10-calendar-mini-progress">
            <div 
              className="c10-calendar-mini-progress-fill" 
              style={{ width: `${(session.confirmados / session.total) * 100}%` }}
            />
          </div>
        </div>

        {/* Lado Direito: Financeiro / Pagamentos */}
        <div className="c10-calendar-info-box">
          <div className="c10-calendar-info-box-header">
            <IoCashOutline size={13} className="c10-box-icon" />
            <span>Pagamentos</span>
          </div>
          <span className="c10-calendar-info-box-val" style={{ color: session.status === 'Finalizada' ? 'var(--color-neon-lime)' : 'var(--text-main)' }}>
            {session.pagos} <span className="c10-calendar-info-box-total">pagos</span>
          </span>
          <span className="c10-calendar-info-box-lbl">
            R$ {session.arrecadado} / R$ {session.metaFinanceira}
          </span>
        </div>

      </div>

      {/* Bloco Adicional para Sessões Passadas (Placar, Artilheiros) */}
      {session.status === 'Finalizada' && session.placar && (
        <div className="c10-calendar-score-block">
          <div className="c10-calendar-score-row">
            <IoTrophyOutline size={14} className="c10-score-trophy" />
            <span className="c10-score-text">Resultado da Partida</span>
          </div>
          <div className="c10-calendar-score-board">
            <span className="c10-score-team">Sem Colete</span>
            <span className="c10-score-digits">{session.placar.timeA} - {session.placar.timeB}</span>
            <span className="c10-score-team">Com Colete</span>
          </div>
          {session.artilheiro && (
            <div className="c10-calendar-scorer-note">
              Destaque: <span className="c10-scorer-name">{session.artilheiro}</span>
            </div>
          )}
        </div>
      )}

      {/* Status Pessoal do Usuário (Presença e Pagamento) */}
      <div className="c10-calendar-user-footer">
        <div className="c10-calendar-user-status-item">
          <span className="c10-user-status-lbl">Minha Presença:</span>
          <div className="c10-user-status-badge-wrapper">
            {session.userPresence === 'Confirmado' ? (
              <span className="c10-user-presence-confirmed">
                <IoCheckmarkCircle size={12} /> Confirmado
              </span>
            ) : session.userPresence === 'Recusou' ? (
              <span className="c10-user-presence-rejected">
                <IoCloseCircle size={12} /> Recusou
              </span>
            ) : (
              <span className="c10-user-presence-pending">
                <IoAlertCircleOutline size={12} /> Pendente
              </span>
            )}
          </div>
        </div>

        <div className="c10-calendar-user-status-item">
          <span className="c10-user-status-lbl">Minha Taxa:</span>
          <div className="c10-user-status-badge-wrapper">
            {session.userPayment === 'Pago' ? (
              <span className="c10-user-payment-done">Pago</span>
            ) : session.userPayment === 'Pendente' ? (
              <span className="c10-user-payment-pending">Pendente</span>
            ) : (
              <span className="c10-user-payment-free">Isento</span>
            )}
          </div>
        </div>
      </div>

      {/* Ações Rápidas de Integração da Tela */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '10px' }}>
        <button 
          onClick={onViewWallet}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid var(--border-neon-soft)',
            color: 'var(--color-neon-lime)',
            fontSize: '9.5px',
            fontWeight: '700',
            padding: '5px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <IoCashOutline size={12} />
          <span>Financeiro</span>
        </button>
        <button 
          onClick={() => alert(`Redirecionando para a Pelada de Teste (Sessão #${session.number})`)}
          style={{
            backgroundColor: 'var(--color-neon-lime)',
            border: 'none',
            color: '#050b14',
            fontSize: '9.5px',
            fontWeight: '700',
            padding: '5px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>Ir para Pelada</span>
          <IoChevronForward size={12} />
        </button>
      </div>

    </div>
  );
}
