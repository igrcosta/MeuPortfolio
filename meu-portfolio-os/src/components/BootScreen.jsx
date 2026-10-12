import { useEffect, useState } from 'react';

// Mensagens que aparecem uma a uma, como um computador ligando
const LINHAS = [
  'IgorOS v1.0 — iniciando...',
  'Carregando criatividade.......... OK',
  'Carregando ambição............... OK',
  'Montando projetos e experiências. OK',
  'Conectando ao YouTube............ OK',
  'Bem-vindo! 🚀'
];

const TEMPO_POR_LINHA = 380; // ms entre uma linha e outra

// Tela de "boot" exibida ao abrir o OS. Chama onFim() quando termina (ou ao clicar para pular).
export default function BootScreen({ onFim }) {
  const [linhasVisiveis, setLinhasVisiveis] = useState(0);
  const [saindo, setSaindo] = useState(false);

  // A cada TEMPO_POR_LINHA mostra mais uma linha; no fim, faz o fade-out e avisa o App
  useEffect(() => {
    if (linhasVisiveis < LINHAS.length) {
      const timer = setTimeout(() => setLinhasVisiveis((n) => n + 1), TEMPO_POR_LINHA);
      return () => clearTimeout(timer);
    }
    const fade = setTimeout(() => setSaindo(true), 500);
    const fim = setTimeout(onFim, 1100);
    return () => {
      clearTimeout(fade);
      clearTimeout(fim);
    };
  }, [linhasVisiveis, onFim]);

  const progresso = Math.round((linhasVisiveis / LINHAS.length) * 100);

  return (
    <div
      onClick={onFim}
      title="Clique para pular"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'radial-gradient(circle at 50% 40%, #1e1b4b 0%, #0b0b12 70%)',
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        padding: '24px',
        cursor: 'pointer',
        opacity: saindo ? 0 : 1,
        transition: 'opacity 0.6s ease'
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 800, letterSpacing: '-1px' }}>
          Igor<span style={{ color: '#a78bfa' }}>OS</span>
        </div>
        <div style={{ color: '#94a3b8', fontSize: '13px', letterSpacing: '4px' }}>PORTFOLIO SYSTEM</div>
      </div>

      {/* Barra de progresso */}
      <div style={{ width: 'min(360px, 80vw)', height: '6px', background: '#1f2937', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          width: `${progresso}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
          transition: `width ${TEMPO_POR_LINHA}ms linear`
        }} />
      </div>

      {/* Linhas do "terminal" */}
      <div style={{
        width: 'min(420px, 90vw)',
        minHeight: '140px',
        fontFamily: 'Consolas, ui-monospace, monospace',
        fontSize: '12px',
        lineHeight: 1.8,
        color: '#4ade80'
      }}>
        {LINHAS.slice(0, linhasVisiveis).map((linha) => (
          <div key={linha}>&gt; {linha}</div>
        ))}
      </div>

      <span style={{ position: 'absolute', bottom: '20px', fontSize: '11px', color: '#475569' }}>
        clique para pular
      </span>
    </div>
  );
}
