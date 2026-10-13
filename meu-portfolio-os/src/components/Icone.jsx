import { cor as cores, sombra } from '../theme/tokens';

// Desenha o ícone de um app. Aceita dois formatos:
//   - texto  -> caminho de uma imagem em public/
//   - função -> um ícone do react-icons (ex: FaUser)
// Com "ladrilho", o ícone vira um quadrado arredondado preto com o símbolo em roxo
// (como os ícones "tingidos" do iOS): todos os apps seguem a mesma cor da marca.
export default function Icone({ icone, tamanho = 40, cor = cores.roxoClaro, ladrilho = false }) {
  const IconeReact = typeof icone === 'string' ? null : icone;
  const corSimbolo = ladrilho ? cores.roxoClaro : cor;

  const simbolo = IconeReact
    ? <IconeReact size={ladrilho ? tamanho * 0.5 : tamanho} color={corSimbolo} />
    : <img src={icone} alt="" style={{ width: ladrilho ? tamanho * 0.6 : tamanho, height: ladrilho ? tamanho * 0.6 : tamanho, objectFit: 'contain' }} />;

  if (!ladrilho) return simbolo;

  return (
    <span style={{
      width: tamanho,
      height: tamanho,
      flexShrink: 0,
      borderRadius: tamanho * 0.27,
      // Preto com um leve reflexo roxo no topo
      background: 'radial-gradient(circle at 30% 0%, rgba(157, 0, 255, 0.22), transparent 65%), linear-gradient(160deg, #150A24 0%, #07030C 100%)',
      boxShadow: `${sombra.icone}, inset 0 0 0 1px rgba(157, 0, 255, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {simbolo}
    </span>
  );
}
