import { useEffect, useState } from 'react';
import Icone from './Icone';

// Barra de tarefas do OS = menu de navegação + rodapé exigidos no PDF do Aramuni.
// Props:
//   apps            -> lista de apps [{ id, nome, icone }]
//   janelasAbertas  -> lista de ids dos apps abertos
//   onAbrir(id)     -> função chamada quando clica em um app
//   compacta        -> true no celular: mostra só os ícones
export default function Taskbar({ apps, janelasAbertas, onAbrir, compacta = false }) {
  const [agora, setAgora] = useState(new Date());

  // Atualiza o relógio a cada 30 segundos
  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const data = agora.toLocaleDateString('pt-BR');

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '48px',
      background: 'rgba(20, 22, 28, 0.85)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #3a3f47',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      zIndex: 9999
    }}>

      {/* Botões dos apps (rolam para o lado no celular) */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
        {apps.map((app) => {
          const aberto = janelasAbertas.includes(app.id);
          return (
            <button
              key={app.id}
              onClick={() => onAbrir(app.id)}
              title={app.nome}
              style={{
                background: aberto ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: 'none',
                borderBottom: aberto ? '2px solid #38bdf8' : '2px solid transparent',
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#e2e8f0',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              <Icone icone={app.icone} tamanho={20} cor={app.cor} />
              {/* No celular mostra só o ícone, para caber todos */}
              {!compacta && <span>{app.nome}</span>}
            </button>
          );
        })}
      </div>

      {/* Relógio */}
      <div style={{ color: '#e2e8f0', fontSize: '11px', textAlign: 'right', lineHeight: 1.3, paddingLeft: '12px' }}>
        <div>{hora}</div>
        <div style={{ color: '#94a3b8' }}>{data}</div>
      </div>
    </nav>
  );
}
