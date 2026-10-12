import { useEffect, useState } from 'react';
import Icone from './Icone';
import { cor, vidro, raio, sombra, fonte, transicao } from '../theme/tokens';

// Botão de um app no dock: ícone-ladrilho + pontinho de "aberto" + nome ao passar o mouse
function BotaoApp({ app, aberto, ativo, onClick, compacta }) {
  const [hover, setHover] = useState(false);
  const tamanho = compacta ? 36 : 42;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={app.nome}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        padding: '4px',
        flexShrink: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Leve "pulo" ao passar o mouse, como no dock do macOS
        transform: hover && !compacta ? 'translateY(-4px) scale(1.08)' : 'none',
        transition: `transform ${transicao.media}`
      }}
    >
      <Icone icone={app.icone} tamanho={tamanho} cor={app.cor} ladrilho />

      {/* Indicador de app aberto (maior e roxo no app ativo) */}
      {aberto && (
        <span style={{
          position: 'absolute',
          bottom: '-3px',
          width: ativo ? '14px' : '4px',
          height: '4px',
          borderRadius: raio.pilula,
          background: ativo ? cor.roxoClaro : cor.textoSecundario,
          transition: `width ${transicao.media}`
        }} />
      )}

      {/* Nome do app ao passar o mouse */}
      {hover && !compacta && (
        <span style={{
          ...vidro.painel,
          position: 'absolute',
          bottom: '62px',
          color: cor.texto,
          borderRadius: raio.sm,
          padding: '5px 10px',
          fontSize: fonte.xs,
          fontWeight: fonte.medio,
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          {app.nome}
        </span>
      )}
    </button>
  );
}

// Pílula de vidro do dock
const pilula = {
  ...vidro.painel,
  boxShadow: `${vidro.painel.boxShadow}, ${sombra.dock}`,
  borderRadius: raio.xl,
  height: '64px',
  display: 'flex',
  alignItems: 'center'
};

// Dock flutuante = menu de navegação + rodapé exigidos no PDF.
// Props:
//   apps            -> lista de apps [{ id, nome, icone, cor }]
//   janelasAbertas  -> lista de ids dos apps abertos (o último é o ativo)
//   minimizadas     -> lista de ids dos apps minimizados
//   onClicarApp(id) -> função chamada quando clica em um app
//   compacta        -> true no celular
export default function Taskbar({ apps, janelasAbertas, minimizadas, onClicarApp, compacta = false }) {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  // App ativo = o último da lista que não está minimizado
  const visiveis = janelasAbertas.filter((id) => !minimizadas.includes(id));
  const ativo = visiveis[visiveis.length - 1];

  // "seg., 12 de out." -> "Seg, 12 de out"
  const dataCurta = agora.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/\./g, '');
  const data = dataCurta.charAt(0).toUpperCase() + dataCurta.slice(1);

  return (
    <nav
      aria-label="Dock de aplicativos"
      style={{
        position: 'fixed',
        bottom: '10px',
        left: compacta ? '8px' : '50%',
        right: compacta ? '8px' : 'auto',
        transform: compacta ? 'none' : 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 9999,
        fontFamily: fonte.familia,
        maxWidth: compacta ? 'none' : 'calc(100vw - 20px)'
      }}
    >
      {/* Apps */}
      <div style={{
        ...pilula,
        padding: '0 10px',
        gap: compacta ? '2px' : '4px',
        flex: compacta ? 1 : 'none',
        overflowX: compacta ? 'auto' : 'visible',
        overflowY: 'visible'
      }}>
        {apps.map((app) => (
          <BotaoApp
            key={app.id}
            app={app}
            aberto={janelasAbertas.includes(app.id)}
            ativo={app.id === ativo}
            onClick={() => onClicarApp(app.id)}
            compacta={compacta}
          />
        ))}
      </div>

      {/* Hora e data */}
      {!compacta && (
        <div style={{ ...pilula, padding: '0 18px', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', color: cor.texto }}>
          <span style={{ fontSize: fonte.md, fontWeight: fonte.semi, letterSpacing: '-0.01em' }}>
            {agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span style={{ fontSize: fonte.xs, color: cor.textoSecundario }}>{data}</span>
        </div>
      )}
    </nav>
  );
}
