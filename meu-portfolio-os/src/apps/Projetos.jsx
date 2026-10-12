import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { FaGamepad, FaGlobe, FaTerminal } from 'react-icons/fa';

import { projetos } from '../data/projetos';
import useIsMobile from '../hooks/useIsMobile';
import { cor, fonte, espaco } from '../theme/tokens';
import { TelaApp, TituloApp, Cartao, Etiqueta, LinkTexto } from '../theme/ui';

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

// '2025-12' -> 'dez/2025'
function formatarData(data) {
  const [ano, mes] = data.split('-');
  return `${MESES[Number(mes) - 1]}/${ano}`;
}

// Ícone da bolinha da timeline, de acordo com o tipo do projeto
const ICONES_TIPO = {
  jogo: FaGamepad,
  web: FaGlobe,
  sistema: FaTerminal
};

// Um item da timeline (MUI): data de um lado, bolinha com ícone no meio, card do outro
function CardProjeto({ projeto }) {
  const IconeTipo = ICONES_TIPO[projeto.tipo];

  return (
    <TimelineItem>

      {/* Lado oposto ao card: a data */}
      <TimelineOppositeContent sx={{ color: cor.roxoClaro, fontWeight: fonte.semi, fontSize: fonte.sm, mt: '14px' }}>
        {formatarData(projeto.data)}
      </TimelineOppositeContent>

      {/* Meio: bolinha + linha */}
      <TimelineSeparator>
        <TimelineDot sx={{ background: cor.roxoSuave, border: `1px solid ${cor.roxoBorda}`, color: cor.roxoClaro, boxShadow: `0 0 18px ${cor.roxoSuave}` }}>
          <IconeTipo size={14} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>

      {/* Card do projeto */}
      <TimelineContent sx={{ textAlign: 'left', pb: 4 }}>
        <Cartao>

          {/* Mídia do projeto: vídeo do YouTube > imagem > capa provisória */}
          {projeto.video ? (
            <div style={{ aspectRatio: '16/9', background: '#000' }}>
              <iframe
                src={projeto.video}
                title={`Trailer de ${projeto.nome}`}
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : projeto.imagem ? (
            <img src={projeto.imagem} alt={projeto.nome} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          ) : (
            <div style={{
              height: '84px',
              background: `radial-gradient(ellipse at 30% 0%, ${cor.roxoBrilho}, transparent 70%), ${cor.pretoRoxo}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cor.roxoClaro,
              fontSize: fonte.lg,
              fontWeight: fonte.negrito,
              letterSpacing: '-0.01em'
            }}>
              {projeto.nome}
            </div>
          )}

          <div style={{ padding: `${espaco[3]} ${espaco[4]} ${espaco[4]}` }}>
            <h3 style={{ margin: `0 0 ${espaco[1]}`, fontSize: fonte.md, fontWeight: fonte.semi }}>{projeto.nome}</h3>
            <p style={{ margin: `0 0 ${espaco[3]}`, fontSize: fonte.sm, lineHeight: 1.6, color: cor.textoSecundario }}>{projeto.descricao}</p>

            {/* Tecnologias em "chips" */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: espaco[3] }}>
              {projeto.tecnologias.map((tec) => (
                <Etiqueta key={tec}>{tec}</Etiqueta>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: espaco[4], fontSize: fonte.sm }}>
              <LinkTexto href={projeto.github}>Ver no GitHub →</LinkTexto>
              {projeto.link && <LinkTexto href={projeto.link} style={{ color: cor.verde }}>{projeto.textoLink} →</LinkTexto>}
            </div>
          </div>
        </Cartao>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function Projetos() {
  const isMobile = useIsMobile();

  // Ordena do MAIS ANTIGO para o MAIS RECENTE (o PDF exige essa ordem):
  //   - [...projetos] cria uma CÓPIA da lista (o .sort() altera a lista original)
  //   - .sort((a, b) => ...) compara dois projetos por vez
  //   - localeCompare compara as datas 'AAAA-MM' como texto: ordem alfabética = ordem cronológica
  const projetosOrdenados = [...projetos].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <TelaApp padding={`${espaco[6]} ${espaco[3]}`}>
      <div style={{ padding: `0 ${espaco[3]}` }}>
        <TituloApp titulo="Linha do tempo" subtitulo="Do meu primeiro site em HTML até este sistema operacional." />
      </div>

      {/* PC: cards alternando esquerda/direita. Celular: todos à direita, data estreita à esquerda */}
      <Timeline
        position={isMobile ? 'right' : 'alternate'}
        sx={isMobile ? { px: 0, '& .MuiTimelineOppositeContent-root': { flex: 0.25, px: 1 } } : {}}
      >
        {/* Um <CardProjeto /> para cada projeto, já na ordem certa */}
        {projetosOrdenados.map((projeto) => (
          <CardProjeto key={projeto.id} projeto={projeto} />
        ))}
      </Timeline>
    </TelaApp>
  );
}
