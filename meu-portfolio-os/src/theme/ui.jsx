// =====================================================================
// COMPONENTES BASE DO IGOROS
// Peças visuais pequenas que todos os apps reaproveitam, sempre usando os tokens.
// =====================================================================
import { useState } from 'react';
import { cor, vidro, raio, fonte, espaco, transicao } from './tokens';

// Área de conteúdo de um app: transparente (o vidro da janela aparece por trás) e com rolagem
export function TelaApp({ children, padding = espaco[6] }) {
  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      padding,
      color: cor.texto,
      fontFamily: fonte.familia
    }}>
      {children}
    </div>
  );
}

// Título grande do app + subtítulo opcional
export function TituloApp({ titulo, subtitulo, Icone }) {
  return (
    <header style={{ marginBottom: espaco[6] }}>
      <h2 style={{
        margin: 0,
        fontSize: fonte.xl,
        fontWeight: fonte.negrito,
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: espaco[3]
      }}>
        {Icone && <Icone color={cor.destaqueClaro} size={22} />}
        {titulo}
      </h2>
      {subtitulo && (
        <p style={{ margin: `${espaco[1]} 0 0`, color: cor.textoSecundario, fontSize: fonte.sm }}>{subtitulo}</p>
      )}
    </header>
  );
}

// Título de seção (pequeno, em caixa alta, como nos Ajustes do iPhone)
export function TituloSecao({ children, Icone }) {
  return (
    <h3 style={{
      margin: `${espaco[6]} 0 ${espaco[3]}`,
      fontSize: fonte.xs,
      fontWeight: fonte.semi,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: cor.textoTerciario,
      display: 'flex',
      alignItems: 'center',
      gap: espaco[2]
    }}>
      {Icone && <Icone />}
      {children}
    </h3>
  );
}

// Cartão translúcido dentro das janelas
export function Cartao({ children, style, destaque = false }) {
  return (
    <div style={{
      ...vidro.cartao,
      borderRadius: raio.lg,
      overflow: 'hidden',
      ...(destaque && { borderColor: cor.destaqueBorda, background: cor.destaqueSuave }),
      ...style
    }}>
      {children}
    </div>
  );
}

// Etiqueta / "chip" (tecnologias, habilidades)
export function Etiqueta({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      background: cor.destaqueSuave,
      color: cor.destaqueClaro,
      border: `1px solid ${cor.destaqueBorda}`,
      borderRadius: raio.pilula,
      padding: '3px 10px',
      fontSize: fonte.xs,
      fontWeight: fonte.medio,
      whiteSpace: 'nowrap'
    }}>
      {children}
    </span>
  );
}

// Botão: "primario" (branco cheio) ou "vidro" (translúcido). Vira link se receber href.
export function Botao({ children, onClick, href, variante = 'vidro', type = 'button', disabled = false, style }) {
  const [hover, setHover] = useState(false);

  const estilos = {
    primario: { background: hover ? cor.destaqueHover : cor.destaque, color: cor.preto, border: '1px solid transparent' },
    vidro: { background: hover ? cor.superficieHover : cor.superficie, color: cor.texto, border: `1px solid ${cor.borda}` }
  };

  const base = {
    ...estilos[variante],
    display: 'inline-flex',
    alignItems: 'center',
    gap: espaco[2],
    padding: '8px 16px',
    borderRadius: raio.pilula,
    fontSize: fonte.sm,
    fontWeight: fonte.semi,
    fontFamily: fonte.familia,
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `background ${transicao.rapida}`,
    ...style
  };

  const eventos = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={base} {...eventos}>{children}</a>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} style={base} {...eventos}>{children}</button>;
}

// Link de texto em destaque
export function LinkTexto({ href, children, style }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: cor.destaqueClaro, textDecoration: 'none', fontWeight: fonte.medio, ...style }}>
      {children}
    </a>
  );
}
