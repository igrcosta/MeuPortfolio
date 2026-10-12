import { cor } from '../theme/tokens';

// Papel de parede: "fitas" escuras sobrepostas, cada uma com a borda iluminada em roxo,
// como luz roxa batendo em superfícies pretas. Feito em SVG para ficar nítido em qualquer tela.
//
// Cada curva vira duas coisas:
//   1) uma área preenchida (da curva até embaixo) com gradiente: roxo escuro na borda -> preto
//   2) a linha da borda, com brilho (uma cópia desfocada por trás da linha fina)
const CURVAS = [
  'M -60 430 C 250 330, 420 200, 640 190 C 860 180, 960 120, 1160 70 C 1350 25, 1520 60, 1660 140',
  'M -60 650 C 220 560, 420 430, 640 410 C 820 395, 900 300, 1060 250 C 1220 200, 1450 210, 1660 330',
  'M 260 960 C 340 780, 470 650, 700 600 C 900 555, 1000 470, 1180 450 C 1380 430, 1560 520, 1660 640',
  'M 640 960 C 700 840, 820 770, 1000 750 C 1200 730, 1450 790, 1660 920'
];

// Fecha a curva até a parte de baixo da tela, para virar uma área preenchida
const area = (curva) => `${curva} L 1660 960 L -60 960 Z`;

export default function Wallpaper() {
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: cor.preto, zIndex: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
        <defs>
          {/* Preenchimento das fitas: borda roxa bem escura que some no preto */}
          <linearGradient id="fita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2B0757" stopOpacity="0.95" />
            <stop offset="0.18" stopColor="#11031F" />
            <stop offset="1" stopColor="#050208" />
          </linearGradient>

          {/* Linha da borda: aparece no meio e some nas pontas, com um ponto mais claro */}
          <linearGradient id="borda" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={cor.roxo} stopOpacity="0" />
            <stop offset="0.3" stopColor={cor.roxo} stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#E2B8FF" />
            <stop offset="0.85" stopColor={cor.roxo} stopOpacity="0.9" />
            <stop offset="1" stopColor={cor.roxo} stopOpacity="0.2" />
          </linearGradient>

          {/* Brilho atrás das linhas */}
          <filter id="brilho" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          {/* Luz roxa difusa de fundo */}
          <radialGradient id="luz" cx="0.62" cy="0.32" r="0.55">
            <stop offset="0" stopColor={cor.roxo} stopOpacity="0.28" />
            <stop offset="1" stopColor={cor.roxo} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#luz)" />

        {CURVAS.map((curva, i) => (
          <g key={i} opacity={1 - i * 0.12}>
            <path d={area(curva)} fill="url(#fita)" />
            <path d={curva} fill="none" stroke="url(#borda)" strokeWidth="7" filter="url(#brilho)" opacity="0.75" />
            <path d={curva} fill="none" stroke="url(#borda)" strokeWidth="1.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}
