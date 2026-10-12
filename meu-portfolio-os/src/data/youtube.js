// Canal e vídeos do app "YouTube".
// Para adicionar um vídeo do YouTube: { id: 'ID_DO_VIDEO', titulo, descricao }
//   (o ID é o que vem depois de "youtu.be/" ou "v=")
// Para um vídeo curto em .mp4: coloque o arquivo em public/videos/ e use
//   { id: 'nome-unico', tipo: 'mp4', src: '/videos/arquivo.mp4', titulo, descricao }
// O PRIMEIRO da lista é o que abre por padrão.
export const canal = {
  nome: 'Oigorxz',
  url: 'https://www.youtube.com/@Oigorxz'
};

export const videos = [
  {
    id: 'CMIr3xr2O3o',
    titulo: 'Bem-vindo ao meu Portfólio OS',
    descricao: 'O "oi" oficial do IgorOS: quem eu sou, o que eu faço e como navegar por este sistema.'
  },
  {
    id: 'xckdE-H2auY',
    titulo: 'Cyberleek: o herói que se tornou vilão',
    descricao: 'Análise da trajetória do Cyberleek no universo gamer e a polêmica envolvendo o GTA 6.'
  },
  {
    id: '1WcJ4Zj--4I',
    titulo: 'BugBusters — Trailer',
    descricao: 'Trailer do BugBusters, shoot \'em up com bullet hell que desenvolvi na faculdade de Jogos Digitais.'
  }
];
