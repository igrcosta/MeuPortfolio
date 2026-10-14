// =====================================================================
// DESIGN TOKENS DO IGOROS
// Todas as cores, raios, sombras, fontes e espaçamentos do sistema moram aqui.
// Regra: nenhum componente escreve cor "na mão" — sempre importa daqui.
// Estética: preto e branco monocromático, vidro fosco (glassmorphism) estilo Apple/visionOS.
// =====================================================================

// ---------- CORES ----------
export const cor = {
  // Destaque monocromático (branco sobre preto, estilo dashboard minimalista)
  destaque: '#FFFFFF',
  destaqueClaro: '#FFFFFF',                   // texto/ícone de destaque sobre fundo escuro
  destaqueHover: '#E5E5E5',                   // botão primário ao passar o mouse
  destaqueEscuro: '#8E8E93',                  // ícones e gráficos em tom mais fechado
  destaqueSuave: 'rgba(255, 255, 255, 0.10)', // fundos selecionados
  destaqueBorda: 'rgba(255, 255, 255, 0.35)',
  destaqueBrilho: 'rgba(255, 255, 255, 0.10)',

  // Base
  preto: '#0A0A0A',
  pretoProfundo: '#141414',

  // Texto (branco com opacidade, como no macOS)
  texto: '#F5F5F5',
  textoSecundario: 'rgba(245, 245, 245, 0.64)',
  textoTerciario: 'rgba(245, 245, 245, 0.42)',

  // Superfícies dentro das janelas
  superficie: 'rgba(255, 255, 255, 0.05)',
  superficieHover: 'rgba(255, 255, 255, 0.09)',
  divisoria: 'rgba(255, 255, 255, 0.08)',
  borda: 'rgba(255, 255, 255, 0.10)',

  // Cores de sistema (paleta da Apple, modo escuro)
  vermelho: '#FF453A',
  verde: '#30D158',
  azul: '#0A84FF',
  laranja: '#FF9F0A',
  amarelo: '#FFD60A',
  indigo: '#5E5CE6',
  ambar: '#FF9500',
  grafite: '#3A3A3C',
  spotify: '#1ED760'
};

// Escala de cinzas para gráficos (do mais claro ao mais escuro)
export const escalaCinza = ['#FFFFFF', '#C7C7CC', '#8E8E93', '#636366', '#48484A', '#3A3A3C'];

// ---------- VIDRO (glassmorphism) ----------
// Cada nível é um objeto de estilo pronto para espalhar: style={{ ...vidro.janela }}
const desfoque = (px) => ({
  backdropFilter: `blur(${px}px) saturate(170%)`,
  WebkitBackdropFilter: `blur(${px}px) saturate(170%)`
});

export const vidro = {
  // Janelas: vidro escuro neutro, bem desfocado
  janela: {
    background: 'rgba(12, 12, 12, 0.72)',
    border: `1px solid ${cor.borda}`,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
    ...desfoque(40)
  },
  // Dock e widgets: um pouco mais claros
  painel: {
    background: 'rgba(18, 18, 18, 0.62)',
    border: `1px solid ${cor.borda}`,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    ...desfoque(28)
  },
  // Cartões dentro das janelas (sem desfoque, só uma camada translúcida)
  cartao: {
    background: cor.superficie,
    border: `1px solid ${cor.divisoria}`
  }
};

// ---------- RAIOS ----------
export const raio = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '22px',
  pilula: '999px'
};

// ---------- SOMBRAS (elevação) ----------
export const sombra = {
  janela: '0 24px 70px rgba(0, 0, 0, 0.55)',
  janelaAtiva: `0 30px 90px rgba(0, 0, 0, 0.65), 0 0 0 1px ${cor.destaqueSuave}`,
  dock: '0 16px 40px rgba(0, 0, 0, 0.45)',
  icone: '0 6px 16px rgba(0, 0, 0, 0.35)'
};

// ---------- TIPOGRAFIA ----------
export const fonte = {
  familia: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, Consolas, monospace",
  // Escala (px)
  xs: '11px',
  sm: '13px',
  md: '15px',
  lg: '18px',
  xl: '24px',
  xxl: '34px',
  // Pesos
  normal: 400,
  medio: 500,
  semi: 600,
  negrito: 700
};

// ---------- ESPAÇAMENTO (múltiplos de 4) ----------
export const espaco = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px'
};

// ---------- MOVIMENTO ----------
export const transicao = {
  rapida: '0.15s ease',
  media: '0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
};

// ---------- LAYOUT ----------
// Altura total reservada para o dock (64px de dock + 10px de margem embaixo + 10px de folga)
export const ALTURA_DOCK = 84;
