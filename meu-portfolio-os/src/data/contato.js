import { FaEnvelope, FaWhatsapp, FaLinkedin, FaYoutube, FaGithub, FaItchIo } from 'react-icons/fa';

// Ícones clicáveis do app "Contato".
// Item com link vazio ('') não aparece na tela: preencha o LinkedIn quando tiver o link!
export const redes = [
  { nome: 'E-mail', Icone: FaEnvelope, cor: '#f87171', link: 'mailto:igorcosta250705@gmail.com' },
  { nome: 'WhatsApp', Icone: FaWhatsapp, cor: '#4ade80', link: 'https://wa.me/5531973110294' },
  { nome: 'LinkedIn', Icone: FaLinkedin, cor: '#60a5fa', link: '' },
  { nome: 'YouTube', Icone: FaYoutube, cor: '#ef4444', link: 'https://www.youtube.com/@Oigorxz' },
  { nome: 'GitHub', Icone: FaGithub, cor: '#e2e8f0', link: 'https://github.com/igrcosta' },
  { nome: 'itch.io', Icone: FaItchIo, cor: '#fb7185', link: 'https://oigorxz.itch.io' }
];
