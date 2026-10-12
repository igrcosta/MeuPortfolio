import { useState } from 'react';
import Icone from './Icone';
import { cor, raio, fonte, transicao } from '../theme/tokens';

// Atalho na área de trabalho: ícone-ladrilho + nome. Abre o app ao clicar.
export default function IconeDesktop({ app, onAbrir }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={() => onAbrir(app.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(255,255,255,0.08)' : 'transparent',
        border: 'none',
        borderRadius: raio.md,
        padding: '10px 4px 8px',
        width: '88px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        color: cor.texto,
        fontFamily: fonte.familia,
        transition: `background ${transicao.rapida}`
      }}
    >
      <Icone icone={app.icone} tamanho={50} cor={app.cor} ladrilho />
      <span style={{ fontSize: fonte.xs, fontWeight: fonte.medio, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{app.nome}</span>
    </button>
  );
}
