import { useEffect, useState } from 'react';
import { cor, fonte, raio } from '../theme/tokens';

// Mensagens que aparecem uma a uma, como um computador ligando
const LINHAS = [
  'Iniciando IgorOS',
  'Carregando criatividade',
  'Carregando ambição',
  'Montando projetos e experiências',
  'Conectando ao YouTube',
  'Tudo pronto'
];

const TEMPO_POR_LINHA = 380; // ms entre uma etapa e outra

// Tela de "boot" exibida ao abrir o OS (estilo Apple: logo, barra fina e uma linha de status).
// Chama onFim() quando termina (ou ao clicar para pular).
export default function BootScreen({ onFim }) {
  const [etapa, setEtapa] = useState(0);
  const [saindo, setSaindo] = useState(false);

  // A cada TEMPO_POR_LINHA avança uma etapa; no fim, faz o fade-out e avisa o App
  useEffect(() => {
    if (etapa < LINHAS.length) {
      const timer = setTimeout(() => setEtapa((n) => n + 1), TEMPO_POR_LINHA);
      return () => clearTimeout(timer);
    }
    const fade = setTimeout(() => setSaindo(true), 450);
    const fim = setTimeout(onFim, 1050);
    return () => {
      clearTimeout(fade);
      clearTimeout(fim);
    };
  }, [etapa, onFim]);

  const progresso = Math.round((etapa / LINHAS.length) * 100);

  return (
    <div
      onClick={onFim}
      title="Clique para pular"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: `radial-gradient(ellipse at 50% 45%, rgba(255, 255, 255, 0.08) 0%, ${cor.preto} 60%)`,
        color: cor.texto,
        fontFamily: fonte.familia,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '36px',
        padding: '24px',
        cursor: 'pointer',
        opacity: saindo ? 0 : 1,
        transform: saindo ? 'scale(1.03)' : 'none',
        transition: 'opacity 0.6s ease, transform 0.6s ease'
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(44px, 9vw, 76px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          textShadow: '0 0 60px rgba(255, 255, 255, 0.25)'
        }}>
          Igor<span style={{ color: cor.textoSecundario }}>OS</span>
        </div>
        <div style={{ color: cor.textoTerciario, fontSize: fonte.xs, letterSpacing: '0.4em', marginTop: '12px' }}>
          PORTFOLIO SYSTEM
        </div>
      </div>

      {/* Barra de progresso fina */}
      <div style={{ width: 'min(220px, 60vw)', height: '4px', background: 'rgba(255,255,255,0.12)', borderRadius: raio.pilula, overflow: 'hidden' }}>
        <div style={{
          width: `${progresso}%`,
          height: '100%',
          background: cor.texto,
          borderRadius: raio.pilula,
          transition: `width ${TEMPO_POR_LINHA}ms ease-out`
        }} />
      </div>

      {/* Etapa atual */}
      <div style={{ fontFamily: fonte.mono, fontSize: fonte.xs, color: cor.textoSecundario, minHeight: '16px' }}>
        {LINHAS[Math.min(etapa, LINHAS.length - 1)]}…
      </div>

      <span style={{ position: 'absolute', bottom: '24px', fontSize: fonte.xs, color: cor.textoTerciario }}>
        clique para pular
      </span>
    </div>
  );
}
