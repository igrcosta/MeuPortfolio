// Projetos exibidos na timeline do app "Projetos" (e os jogos também no app "Jogos").
// A ORDEM AQUI NÃO IMPORTA: o app ordena pela data sozinho.
//
// Campos:
//   data        -> 'AAAA-MM' (ano-mês). Nesse formato, ordem alfabética = ordem cronológica!
//   tipo        -> 'jogo' | 'web' | 'sistema'  (o app Jogos filtra os do tipo 'jogo')
//   tecnologias -> lista de techs, vira "chips" na tela
//   github      -> link do repositório (exigido pelo PDF)
//   link        -> link extra opcional (jogar, site no ar...), com o texto em textoLink
//   video       -> opcional: link "embed" do YouTube (aparece no lugar da imagem)
//   imagem      -> print ou GIF em public/projetos/ (null = ainda não tem)
//
// ⚠️ RASCUNHO: confira datas, descrições e tecnologias marcadas com "confirme".
export const projetos = [
  {
    id: 'portfolio-os',
    nome: 'Portfolio OS',
    data: '2026-10',
    tipo: 'web',
    descricao: 'Este portfólio! Um sistema operacional web com janelas arrastáveis, onde cada seção da minha trajetória é um app.',
    tecnologias: ['React', 'Vite', 'JavaScript', 'react-rnd'],
    github: 'https://github.com/igrcosta/Portfolio-PROJECT',
    imagem: '/projetos/portfolio-os.png'
  },
  {
    id: 'thesinhunter',
    nome: 'TheSinHunter',
    data: '2026-06',
    tipo: 'jogo',
    descricao: 'Jogo em Unity que idealizei e organizei: tirei a ideia do papel e liderei a equipe, que finalizou o projeto no semestre seguinte.', // confirme / descreva o jogo
    tecnologias: ['Unity', 'C#'],
    github: 'https://github.com/igrcosta/TheSinHunter',
    imagem: null
  },
  {
    id: 'bugbusters',
    nome: 'BugBusters',
    data: '2025-12',
    tipo: 'jogo',
    descricao: 'Shoot \'em up retrô-futurista com bullet hell, inspirado em Ikaruga: sobreviva a ondas de inimigos "bugados". Fui diretor geral, programando inimigos e fazendo o level design.',
    tecnologias: ['Unity', 'C#'],
    github: 'https://github.com/igrcosta/BugsBusters',
    link: 'https://oigorxz.itch.io/bugbusters2',
    textoLink: 'Jogar no navegador (itch.io)',
    video: 'https://www.youtube.com/embed/1WcJ4Zj--4I',
    imagem: null
  },
  {
    id: 'flight-company',
    nome: 'Sistema de Companhia Aérea',
    data: '2024-12',
    tipo: 'sistema',
    descricao: 'Programa de gerenciamento de voos feito em equipe de 5 pessoas na faculdade, com documentação e pitch do projeto.',
    tecnologias: ['C++'],
    github: 'https://github.com/igrcosta/Colege-Work---Flight-Company',
    imagem: null
  },
  {
    id: 'gameflix',
    nome: 'GameFlix (Portal de Séries)',
    data: '2024-10',
    tipo: 'web',
    descricao: 'Meu primeiro projeto web: um portal de séries e filmes baseados em jogos que eu gosto.',
    tecnologias: ['HTML', 'CSS'],
    github: 'https://github.com/igrcosta/Series-Portal-HTML-CSS-Project',
    imagem: '/projetos/gameflix.png'
  }
];
