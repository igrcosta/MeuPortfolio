import { boasVindas } from '../data/boasVindas';
import { cor, raio, fonte, espaco } from '../theme/tokens';
import { TelaApp } from '../theme/ui';

// Janela que abre sozinha ao entrar no OS: o "oi" em vídeo
export default function BoasVindas() {
  return (
    <TelaApp padding={espaco[5]}>
      <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: raio.lg, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
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
      <h2 style={{ margin: `${espaco[5]} 0 ${espaco[2]}`, fontSize: fonte.xl, fontWeight: fonte.negrito, letterSpacing: '-0.02em' }}>
        {boasVindas.titulo}
      </h2>
      <p style={{ margin: 0, fontSize: fonte.md, lineHeight: 1.6, color: cor.textoSecundario }}>{boasVindas.texto}</p>
    </TelaApp>
  );
}
