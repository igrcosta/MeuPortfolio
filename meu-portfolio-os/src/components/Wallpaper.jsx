import { cor } from '../theme/tokens';

// Papel de parede: imagem em public/wallpapers/ (já tratada para o roxo #9D00FF e escurecida).
// Para trocar, basta substituir o arquivo ou mudar o caminho abaixo.
const IMAGEM = '/wallpapers/igoros.jpg';

export default function Wallpaper() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundColor: cor.preto,
        backgroundImage: `url("${IMAGEM}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
}
