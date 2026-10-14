import { useEffect, useState } from 'react';
import { FaSpotify, FaEye } from 'react-icons/fa';
import useTocandoAgora from '../hooks/useTocandoAgora';
import useVisitas from '../hooks/useVisitas';
import { cor, vidro, raio, sombra, fonte } from '../theme/tokens';

// Estilo base dos widgets: vidro do sistema
const cartao = {
  ...vidro.painel,
  boxShadow: `${vidro.painel.boxShadow}, ${sombra.dock}`,
  borderRadius: raio.xl,
  padding: '16px 18px',
  color: cor.texto,
  fontFamily: fonte.familia
};

// Saudação que muda conforme o horário + data por extenso
function Saudacao() {
  const [agora, setAgora] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hora = agora.getHours();
  const saudacao = hora < 5 ? 'Boa madrugada' : hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  // "segunda-feira, 12 de outubro" -> "Segunda-feira, 12 de outubro"
  const dataPorExtenso = agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={cartao}>
      <div style={{ fontSize: fonte.xl, fontWeight: fonte.negrito, letterSpacing: '-0.02em' }}>
        {saudacao} <span style={{ color: cor.destaqueClaro }}>👋</span>
      </div>
      <div style={{ fontSize: fonte.sm, color: cor.textoSecundario, marginTop: '4px' }}>
        {dataPorExtenso.charAt(0).toUpperCase() + dataPorExtenso.slice(1)}
      </div>
    </div>
  );
}

function TocandoAgora() {
  const { disponivel, musica } = useTocandoAgora();
  if (!disponivel || !musica) return null;

  return (
    <a href={musica.link} target="_blank" rel="noopener noreferrer" style={{ ...cartao, display: 'flex', gap: '14px', alignItems: 'center', textDecoration: 'none' }}>
      {musica.capa ? (
        <img src={musica.capa} alt="" style={{ width: '54px', height: '54px', borderRadius: raio.md, objectFit: 'cover', boxShadow: sombra.icone }} />
      ) : (
        <div style={{ width: '54px', height: '54px', borderRadius: raio.md, background: 'rgba(30, 215, 96, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaSpotify color={cor.spotify} size={26} />
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: fonte.xs, color: cor.spotify, display: 'flex', alignItems: 'center', gap: '5px', fontWeight: fonte.semi }}>
          <FaSpotify /> {musica.tocandoAgora ? 'Ouvindo agora' : 'Ouviu por último'}
        </div>
        <div style={{ fontSize: fonte.md, fontWeight: fonte.semi, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>{musica.nome}</div>
        <div style={{ fontSize: fonte.sm, color: cor.textoSecundario, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{musica.artista}</div>
      </div>
    </a>
  );
}

function Visitas() {
  const total = useVisitas();
  if (total === null) return null;

  return (
    <div style={{ ...cartao, display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ width: '34px', height: '34px', borderRadius: raio.md, background: cor.destaqueSuave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FaEye color={cor.destaqueClaro} />
      </span>
      <div>
        <div style={{ fontSize: fonte.lg, fontWeight: fonte.negrito }}>{total.toLocaleString('pt-BR')}</div>
        <div style={{ fontSize: fonte.xs, color: cor.textoSecundario }}>visitas ao IgorOS</div>
      </div>
    </div>
  );
}

// Coluna de widgets no canto da área de trabalho (cada widget some sozinho se não estiver configurado)
export default function Widgets({ isMobile }) {
  return (
    <div style={{
      position: isMobile ? 'static' : 'absolute',
      top: '20px',
      right: '20px',
      width: isMobile ? 'auto' : '290px',
      margin: isMobile ? '0 16px 16px' : 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <Saudacao />
      <TocandoAgora />
      <Visitas />
    </div>
  );
}
