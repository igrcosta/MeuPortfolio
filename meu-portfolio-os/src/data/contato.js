import { FaEnvelope, FaWhatsapp, FaLinkedin, FaYoutube, FaGithub, FaItchIo } from 'react-icons/fa';

// Ícones clicáveis do app "Contato".
// Item com link vazio ('') não aparece na tela: preencha o LinkedIn quando tiver o link!
export const redes = [
  { nome: 'E-mail', Icone: FaEnvelope, cor: '#0A84FF', link: 'mailto:igorcosta250705@gmail.com' },
  { nome: 'WhatsApp', Icone: FaWhatsapp, cor: '#30D158', link: 'https://wa.me/5531973110294' },
  { nome: 'LinkedIn', Icone: FaLinkedin, cor: '#0A66C2', link: '' },
  { nome: 'YouTube', Icone: FaYoutube, cor: '#FF3B30', link: 'https://www.youtube.com/@Oigorxz' },
  { nome: 'GitHub', Icone: FaGithub, cor: '#3A3A3C', link: 'https://github.com/igrcosta' },
  { nome: 'itch.io', Icone: FaItchIo, cor: '#FA5C5C', link: 'https://oigorxz.itch.io' }
];
