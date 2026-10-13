// Experiências exibidas no app "Experiências" (tirado do currículo de set/2026).
// Campos: instituicao, cargo, periodo, descricao, categoria ('profissional' | 'formacao')
// A ordem aqui é a ordem na tela: mais recente primeiro.
export const experiencias = [
  {
    id: 'acesso',
    categoria: 'profissional',
    instituicao: 'Acesso Marketing',
    cargo: 'Trainee de Métricas + Analista',
    periodo: '2026 – atual',
    descricao: 'Comecei como estagiário e hoje sou responsável pelo desenvolvimento de dashboards para a rede de clientes. Trabalho com marketing digital (Google Ads e Meta Ads) e ferramentas como Claude Code, Vercel e Railway.'
  },
  {
    id: 'playermaker',
    categoria: 'profissional',
    instituicao: 'Playermaker',
    cargo: 'Video Editor (Freelancer)',
    periodo: '2025',
    descricao: 'Edição de vídeos curtos sobre temas atuais, com entregas rápidas e de qualidade.'
  },
  {
    id: 'tyria',
    categoria: 'profissional',
    instituicao: 'Tyria Group',
    cargo: 'Assistente Geral',
    periodo: '2024',
    descricao: 'Suporte e orientação a clientes no uso do software proprietário da empresa e criação de manuais de usuário.'
  },
  {
    id: 'puc-es',
    categoria: 'formacao',
    instituicao: 'PUC Minas',
    cargo: 'Bacharelado em Engenharia de Software',
    periodo: '2026 – 2029',
    descricao: 'Graduação em andamento. Antes, passei pelo curso de Jogos Digitais na PUC Minas Lourdes, onde desenvolvi o BugBusters.'
  },
  {
    id: 'ilsc',
    categoria: 'formacao',
    instituicao: 'ILSC Vancouver (Canadá)',
    cargo: 'Intercâmbio de Inglês',
    periodo: 'jan/2026',
    descricao: 'Um mês de imersão no Canadá, alcançando o nível intermediário mais alto. Certificado disponível no app Certificados.'
  },
  {
    id: 'stopmotion',
    categoria: 'formacao',
    instituicao: 'Colégio Santa Marcelina',
    cargo: 'Prêmio de Melhor Stop Motion',
    periodo: '2018',
    descricao: 'Premiado pela melhor animação em stop motion do ano, editando os vídeos sozinho e criando o roteiro: a criatividade já aparecia desde cedo!'
  }
];

// Depoimentos (recomendações) de quem trabalhou comigo — aparecem no fim do app "Experiências".
// "foto" é opcional: colocar a imagem em public/images&Icons/ e escreva o caminho, ex: '/images&Icons/chefe.jpg'
export const depoimentos = [
  {
    id: 'chefe-acesso',
    nome: 'Thiago Vieira',
    cargo: 'Chefe',
    empresa: 'Acesso Marketing',
    foto: '/images&Icons/Thiago pfp.jpg',
    texto: 'O Igor trabalha comigo há pouco mais de seis meses e, desde o início, se destacou pela capacidade de resolver problemas, aprender rápido e assumir cada entrega com responsabilidade e compromisso. Nesse período, liderou a entrega de dashboards automatizados de performance de marketing, oferecendo aos nossos clientes uma visão dos resultados em tempo real.'
  }
];
