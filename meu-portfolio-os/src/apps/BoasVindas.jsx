import { boasVindas } from '../data/boasVindas';

// Janela que abre sozinha ao entrar no OS: o "oi" em vídeo
export default function BoasVindas() {
  return (
    <div style={{ background: '#0f0f0f', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '16px' }}>
      <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '10px', overflow: 'hidden' }}>
        <iframe
          src={`https://www.youtube.com/embed/${boasVindas.videoId}?rel=0`}
          title={boasVindas.titulo}
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h2 style={{ margin: '14px 0 6px', fontSize: '18px' }}>{boasVindas.titulo}</h2>
      <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#94a3b8' }}>{boasVindas.texto}</p>
    </div>
  );
}
