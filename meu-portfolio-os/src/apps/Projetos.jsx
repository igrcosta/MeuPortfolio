import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Chip from '@mui/material/Chip';
import { FaGamepad, FaGlobe, FaTerminal } from 'react-icons/fa';

import { projetos } from '../data/projetos';
import useIsMobile from '../hooks/useIsMobile';

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
      <TimelineOppositeContent sx={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px', mt: '14px' }}>
        {formatarData(projeto.data)}
      </TimelineOppositeContent>

      {/* Meio: bolinha + linha */}
      <TimelineSeparator>
        <TimelineDot color="primary" variant="outlined">
          <IconeTipo size={14} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>

      {/* Card do projeto */}
      <TimelineContent sx={{ textAlign: 'left', pb: 4 }}>
        <div style={{
          background: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>

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
              height: '80px',
              background: 'linear-gradient(135deg, #312e81, #1e293b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c4b5fd',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              {projeto.nome}
            </div>
          )}

          <div style={{ padding: '12px 14px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', color: '#e2e8f0' }}>{projeto.nome}</h3>
            <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.6, color: '#cbd5e1' }}>{projeto.descricao}</p>

            {/* Tecnologias em "chips" (componente Chip da MUI) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {projeto.tecnologias.map((tec) => (
                <Chip key={tec} label={tec} size="small" color="primary" variant="outlined" />
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13px' }}>
              <a href={projeto.github} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>
                Ver no GitHub
              </a>
              {projeto.link && (
                <a href={projeto.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80' }}>
                  {projeto.textoLink}
                </a>
              )}
            </div>
          </div>
        </div>
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
    <div style={{ background: '#111827', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '24px 12px' }}>
      <h2 style={{ margin: '0 0 4px', textAlign: 'center' }}>Linha do tempo</h2>
      <p style={{ margin: '0 0 16px', color: '#94a3b8', fontSize: '14px', textAlign: 'center' }}>
        Do meu primeiro site em HTML até este sistema operacional.
      </p>

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
    </div>
  );
}
