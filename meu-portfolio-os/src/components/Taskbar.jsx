import { useEffect, useState } from 'react';
import Icone from './Icone';

const ALTURA_TASKBAR = 56;

// Botão de um app na Taskbar: ícone + indicador de "aberto" + nome ao passar o mouse
function BotaoApp({ app, aberto, ativo, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={app.nome}
      style={{
        position: 'relative',
        background: ativo || hover ? 'rgba(255,255,255,0.12)' : 'transparent',
        border: 'none',
        borderRadius: '8px',
        width: '44px',
        height: '44px',
        flexShrink: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.15s'
      }}
    >
      <Icone icone={app.icone} tamanho={24} cor={app.cor} />

      {/* Indicador: risquinho embaixo dos apps abertos (maior no app ativo) */}
      {aberto && (
        <span style={{
          position: 'absolute',
          bottom: '3px',
          width: ativo ? '16px' : '6px',
          height: '3px',
          borderRadius: '2px',
          background: ativo ? '#a78bfa' : '#94a3b8',
          transition: 'width 0.2s'
        }} />
      )}

      {/* Nome do app ao passar o mouse */}
      {hover && (
        <span style={{
          position: 'absolute',
          bottom: '52px',
          background: '#1e1e2e',
          color: '#e2e8f0',
          border: '1px solid #333',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          {app.nome}
        </span>
      )}
    </button>
  );
}

// Barra de tarefas do OS = menu de navegação + rodapé exigidos no PDF.
// Props:
//   apps            -> lista de apps [{ id, nome, icone }]
//   janelasAbertas  -> lista de ids dos apps abertos (o último é o ativo)
//   minimizadas     -> lista de ids dos apps minimizados
//   onClicarApp(id) -> função chamada quando clica em um app
//   compacta        -> true no celular: esconde a data
export default function Taskbar({ apps, janelasAbertas, minimizadas, onClicarApp, compacta = false }) {
  const [agora, setAgora] = useState(new Date());

  // Atualiza o relógio a cada 30 segundos
  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // App ativo = o último da lista que não está minimizado
  const visiveis = janelasAbertas.filter((id) => !minimizadas.includes(id));
  const ativo = visiveis[visiveis.length - 1];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: `${ALTURA_TASKBAR}px`,
      background: 'rgba(15, 15, 25, 0.75)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      gap: '8px',
      zIndex: 9999
    }}>

      {/* Logo do sistema */}
      {!compacta && (
        <div style={{ fontWeight: 800, fontSize: '15px', color: '#e2e8f0', whiteSpace: 'nowrap', width: '110px' }}>
          Igor<span style={{ color: '#a78bfa' }}>OS</span>
        </div>
      )}

      {/* Apps centralizados (rolam para o lado no celular) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: compacta ? 'flex-start' : 'center', gap: '4px', overflowX: compacta ? 'auto' : 'visible' }}>
        {apps.map((app) => (
          <BotaoApp
            key={app.id}
            app={app}
            aberto={janelasAbertas.includes(app.id)}
            ativo={app.id === ativo}
            onClick={() => onClicarApp(app.id)}
          />
        ))}
      </div>

      {/* Relógio */}
      <div style={{ color: '#e2e8f0', fontSize: '12px', textAlign: 'right', lineHeight: 1.35, width: compacta ? 'auto' : '110px' }}>
        <div>{agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
        {!compacta && <div style={{ color: '#94a3b8' }}>{agora.toLocaleDateString('pt-BR')}</div>}
      </div>
    </nav>
  );
}
