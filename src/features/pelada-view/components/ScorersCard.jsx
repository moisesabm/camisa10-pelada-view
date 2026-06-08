import React from 'react';
import { IoTrophyOutline, IoChevronForward } from 'react-icons/io5';
import artilheiroNeon from '../../../assets/artilheiro-neon.png';
import campoRefletores from '../../../assets/campo-refletores.png';

export default function ScorersCard({ ano = 2025, onViewStats }) {
  return (
    <div className="c10-glass-card c10-card-with-bg">
      <div 
        className="c10-card-bg" 
        style={{ backgroundImage: `url(${campoRefletores})` }} 
      />
      <div className="c10-card-overlay" />

      <div className="c10-card-body-content">
        {/* Cabeçalho do Card */}
        <div className="c10-card-header">
          <div className="c10-card-title-group">
            <IoTrophyOutline className="c10-card-title-icon" />
            <span className="c10-card-title">Artilheiros do Evento</span>
          </div>
          <div className="c10-badge-year" onClick={onViewStats} style={{ cursor: 'pointer' }}>
            <span>{ano}</span>
            <IoChevronForward className="c10-badge-year-arrow" />
          </div>
        </div>

        {/* Corpo do Card (Estado Vazio) */}
        <div className="c10-scorers-empty-state">
          {/* Silhueta do Artilheiro Neon à Esquerda */}
          <div 
            className="c10-scorers-illust-left"
            style={{ backgroundImage: `url(${artilheiroNeon})` }}
          />

          {/* Informações Centrais */}
          <div className="c10-scorers-info">
            <div className="c10-scorers-heading">Nenhum gol marcado ainda</div>
            <div className="c10-scorers-desc">
              Os artilheiros aparecerão aqui após os primeiros gols.
            </div>
            <a href="#estatisticas" className="c10-scorers-link" onClick={(e) => { e.preventDefault(); onViewStats(); }}>
              Ver estatísticas completas &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
