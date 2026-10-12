import { cor as cores, sombra } from '../theme/tokens';

// Desenha o ícone de um app. Aceita dois formatos:
//   - texto  -> caminho de uma imagem em public/
//   - função -> um ícone do react-icons (ex: FaUser)
// Com "ladrilho", o ícone vira um quadrado arredondado com gradiente (estilo ícone de app da Apple).
export default function Icone({ icone, tamanho = 40, cor = cores.roxo, ladrilho = false }) {
  const IconeReact = typeof icone === 'string' ? null : icone;

  const simbolo = IconeReact
    ? <IconeReact size={ladrilho ? tamanho * 0.52 : tamanho} color={ladrilho ? '#fff' : cor} />
    : <img src={icone} alt="" style={{ width: ladrilho ? tamanho * 0.6 : tamanho, height: ladrilho ? tamanho * 0.6 : tamanho, objectFit: 'contain' }} />;

  if (!ladrilho) return simbolo;

  return (
    <span style={{
      width: tamanho,
      height: tamanho,
      flexShrink: 0,
      borderRadius: tamanho * 0.27,
      // Gradiente da cor do app + brilho no topo, como os ícones do macOS/iOS
      background: `linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 50%), linear-gradient(150deg, ${cor} 0%, ${cor}99 100%), ${cores.pretoRoxo}`,
      boxShadow: `${sombra.icone}, inset 0 0 0 0.5px rgba(255,255,255,0.25)`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {simbolo}
    </span>
  );
}
