import Icone from './Icone';

// Atalho na área de trabalho: ícone + nome. Abre o app ao clicar.
export default function IconeDesktop({ app, onAbrir }) {
  return (
    <button
      onClick={() => onAbrir(app.id)}
      style={{
        background: 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 4px',
        width: '88px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: '#fff'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <Icone icone={app.icone} tamanho={40} cor={app.cor} />
      <span style={{ fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{app.nome}</span>
    </button>
  );
}
