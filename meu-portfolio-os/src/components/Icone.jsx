// Desenha o ícone de um app. Aceita dois formatos:
//   - texto  -> caminho de uma imagem em public/ (ex: '/images&Icons/YTlogo.webp')
//   - função -> um ícone do react-icons (ex: FaUser)
export default function Icone({ icone, tamanho = 40, cor = '#e2e8f0' }) {
  if (typeof icone === 'string') {
    return <img src={icone} alt="" style={{ width: tamanho, height: tamanho, objectFit: 'contain' }} />;
  }

  const IconeReact = icone;
  return <IconeReact size={tamanho} color={cor} />;
}
