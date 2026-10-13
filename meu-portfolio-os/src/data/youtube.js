// Canal e vídeos do app "YouTube".
// Para adicionar um vídeo do YouTube: { id: 'ID_DO_VIDEO', titulo, descricao }
//   (o ID é o que vem depois de "youtu.be/" ou "v=")
// Para um vídeo curto em .mp4: coloque o arquivo (e uma miniatura .jpg) em public/videos/ e use
//   { id: 'nome-unico', tipo: 'mp4', src: '/videos/arquivo.mp4', capa: '/videos/arquivo.jpg', titulo, descricao }
//   Os .mp4 aparecem na seção "Demos de edição" do app.
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
  },

  // ---------- DEMOS DE EDIÇÃO (.mp4 em public/videos/) ----------
  // ✏️ Troque os títulos e descrições pelo que cada vídeo mostra
  {
    id: 'demo-v1',
    tipo: 'mp4',
    src: '/videos/demo-v1.mp4',
    capa: '/videos/demo-v1.jpg',
    titulo: 'Demo de edição #1',
    descricao: 'Trecho de um dos meus trabalhos de edição: legendas dinâmicas, cortes e efeitos sonoros.'
  },
  {
    id: 'demo-v2',
    tipo: 'mp4',
    src: '/videos/demo-v2.mp4',
    capa: '/videos/demo-v2.jpg',
    titulo: 'Demo de edição #2',
    descricao: 'Trecho de um dos meus trabalhos de edição para criadores de conteúdo.'
  },
  {
    id: 'demo-v3',
    tipo: 'mp4',
    src: '/videos/demo-v3.mp4',
    capa: '/videos/demo-v3.jpg',
    titulo: 'Demo de edição #3',
    descricao: 'Trecho de um dos meus trabalhos de edição com motion graphics.'
  },
  {
    id: 'demo-v4',
    tipo: 'mp4',
    src: '/videos/demo-v4.mp4',
    capa: '/videos/demo-v4.jpg',
    titulo: 'Demo de edição #4',
    descricao: 'Trecho de um dos meus trabalhos de edição em formato de vídeo curto.'
  }
];
