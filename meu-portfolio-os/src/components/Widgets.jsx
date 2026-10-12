import { useEffect, useState } from 'react';
import { FaSpotify, FaEye } from 'react-icons/fa';
import useTocandoAgora from '../hooks/useTocandoAgora';
import useVisitas from '../hooks/useVisitas';

// Estilo "vidro" dos widgets
const cartao = {
  background: 'rgba(15, 23, 42, 0.55)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '14px 16px',
  color: '#e2e8f0'
};

function Relogio() {
  const [agora, setAgora] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // "segunda-feira, 12 de outubro" -> "Segunda-feira, 12 de outubro"
  const dataPorExtenso = agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={cartao}>
      <div style={{ fontSize: '40px', fontWeight: 300, letterSpacing: '-1px', lineHeight: 1 }}>
        {agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>
        {dataPorExtenso.charAt(0).toUpperCase() + dataPorExtenso.slice(1)}
      </div>
    </div>
  );
}

function TocandoAgora() {
  const { disponivel, musica } = useTocandoAgora();
  if (!disponivel || !musica) return null;

  return (
    <a href={musica.link} target="_blank" rel="noopener noreferrer" style={{ ...cartao, display: 'flex', gap: '12px', alignItems: 'center', textDecoration: 'none' }}>
      {musica.capa ? (
        <img src={musica.capa} alt="" style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover' }} />
      ) : (
        <div style={{ width: '52px', height: '52px', borderRadius: '8px', background: '#1db95433', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaSpotify color="#1db954" size={24} />
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '11px', color: '#1db954', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <FaSpotify /> {musica.tocandoAgora ? 'Ouvindo agora' : 'Ouviu por último'}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{musica.nome}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{musica.artista}</div>
      </div>
    </a>
  );
}

function Visitas() {
  const total = useVisitas();
  if (total === null) return null;

  return (
    <div style={{ ...cartao, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
      <FaEye color="#a78bfa" />
      <span><strong>{total.toLocaleString('pt-BR')}</strong> visitas ao IgorOS</span>
    </div>
  );
}

// Coluna de widgets no canto da área de trabalho (cada widget some sozinho se não estiver configurado)
export default function Widgets({ isMobile }) {
  return (
    <div style={{
      position: isMobile ? 'static' : 'absolute',
      top: '16px',
      right: '16px',
      width: isMobile ? 'auto' : '280px',
      margin: isMobile ? '0 16px' : 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <Relogio />
      <TocandoAgora />
      <Visitas />
    </div>
  );
}
