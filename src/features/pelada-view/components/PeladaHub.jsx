import React from 'react';
import { IoCalendarOutline, IoLocationOutline, IoChevronForward, IoAddCircleOutline } from 'react-icons/io5';
import campoRefletores from '../../../assets/campo-refletores.png';
import stadiumNeonBg from '../../../assets/stadium_neon_bg.png';

export default function PeladaHub({ onSelectPelada }) {
  // Lista de peladas/views disponíveis para navegação
  const peladasList = [
    {
      id: 'teste',
      title: 'Pelada de Teste',
      subtitle: 'Turma do Camisa10',
      bgImage: campoRefletores,
      date: 'Hoje • 20:00',
      location: 'Quadra Society Central',
      playersCount: 20,
      active: true,
      status: 'Em Produção'
    },
    {
      id: 'times',
      title: 'Camisa10 FC',
      subtitle: 'Perfil do Time',
      bgImage: stadiumNeonBg,
      date: 'Fundado • 12/03/2023',
      location: 'São Paulo, SP',
      playersCount: 20,
      active: true,
      status: 'Em Produção'
    }
  ];

  return (
    <div className="c10-hub-container">
      {/* Cabeçalho da Home */}
      <div className="c10-hub-header">
        <div className="c10-hub-branding">
          <div className="c10-hub-logo-circle">
            <span className="c10-hub-logo-text">10</span>
          </div>
          <div>
            <h1 className="c10-hub-title">Camisa10</h1>
            <p className="c10-hub-subtitle">Seletor de Views de Peladas</p>
          </div>
        </div>
      </div>

      {/* Lista de Views */}
      <div className="c10-hub-content">
        <h2 className="c10-hub-section-title">Views Disponíveis ({peladasList.length})</h2>
        
        <div className="c10-hub-list">
          {peladasList.map((pelada) => (
            <div 
              key={pelada.id}
              className="c10-hub-card"
              onClick={() => onSelectPelada(pelada.id)}
            >
              {/* Imagem de Fundo do Card */}
              <div 
                className="c10-hub-card-bg"
                style={{ backgroundImage: `url(${pelada.bgImage})` }}
              />
              <div className="c10-hub-card-overlay" />

              {/* Informações do Card */}
              <div className="c10-hub-card-body">
                <div className="c10-hub-card-header">
                  <div>
                    <span className={`c10-hub-badge ${pelada.id === 'teste' || pelada.id === 'times' ? 'c10-badge-active' : 'c10-badge-draft'}`}>
                      {pelada.status}
                    </span>
                    <h3 className="c10-hub-card-title">{pelada.title}</h3>
                    <p className="c10-hub-card-subtitle">{pelada.subtitle}</p>
                  </div>
                  <div className="c10-hub-card-arrow">
                    <IoChevronForward size={18} />
                  </div>
                </div>

                <div className="c10-hub-card-meta">
                  <div className="c10-hub-meta-item">
                    <IoCalendarOutline size={12} style={{ color: 'var(--color-neon-lime)' }} />
                    <span>{pelada.date}</span>
                  </div>
                  <div className="c10-hub-meta-item">
                    <IoLocationOutline size={12} style={{ color: 'var(--color-neon-lime)' }} />
                    <span>{pelada.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Card de Adicionar Nova (Visual) */}
          <div className="c10-hub-card-add" onClick={() => alert('Crie uma nova view adicionando no PeladaHub.jsx!')}>
            <IoAddCircleOutline size={28} className="c10-hub-add-icon" />
            <span>Criar Nova View</span>
          </div>
        </div>
      </div>
    </div>
  );
}
