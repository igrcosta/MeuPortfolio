import { useState } from 'react';
import { FaYoutube, FaThumbsUp, FaRegThumbsUp, FaShareAlt, FaCheck } from 'react-icons/fa';
import { canal, videos } from '../data/youtube';
import useCurtidas from '../hooks/useCurtidas';

// Miniatura: a do próprio YouTube, ou um bloco escuro para vídeos .mp4
function Miniatura({ video, largura }) {
  if (video.tipo === 'mp4') {
    return (
      <div style={{ width: largura, aspectRatio: '16/9', background: '#272727', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        🎬
      </div>
    );
  }
  return (
    <img
      src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
      alt=""
      style={{ width: largura, aspectRatio: '16/9', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
    />
  );
}

// Botão estilo YouTube (cinza arredondado)
const estiloBotao = {
  background: '#272727',
  color: '#f1f1f1',
  border: 'none',
  borderRadius: '18px',
  padding: '8px 14px',
  fontSize: '13px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

export default function YoutubeApp() {
  const [atual, setAtual] = useState(videos[0]);
  const [copiado, setCopiado] = useState(false);
  const curtidas = useCurtidas(atual.id);

  const linkDoVideo = atual.tipo === 'mp4' ? canal.url : `https://youtu.be/${atual.id}`;

  const compartilhar = async () => {
    try {
      await navigator.clipboard.writeText(linkDoVideo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.open(linkDoVideo, '_blank', 'noopener');
    }
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#f1f1f1', height: '100%', overflowY: 'auto', fontFamily: 'Roboto, Arial, sans-serif' }}>

      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', position: 'sticky', top: 0, zIndex: 2, background: '#0f0f0f', borderBottom: '1px solid #272727' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '17px' }}>
          <FaYoutube color="#ff0000" size={24} /> YouTube
        </div>
        <a href={canal.url} target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none' }}>
          @{canal.nome}
        </a>
      </div>

      {/* Corpo: player + lista (a lista desce para baixo quando a janela é estreita) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '16px' }}>

        {/* Coluna do player */}
        <div style={{ flex: '1 1 420px', minWidth: 0 }}>
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
            {atual.tipo === 'mp4' ? (
              <video key={atual.id} src={atual.src} controls style={{ width: '100%', height: '100%', display: 'block' }} />
            ) : (
              <iframe
                key={atual.id}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${atual.id}?rel=0`}
                title={atual.titulo}
                style={{ border: 'none', display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <h1 style={{ fontSize: '18px', margin: '12px 0 10px' }}>{atual.titulo}</h1>

          {/* Canal + ações */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/images&Icons/Foto minha.jpeg" alt="" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
              <strong style={{ fontSize: '14px' }}>{canal.nome}</strong>
              <a
                href={`${canal.url}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#f1f1f1', color: '#0f0f0f', padding: '8px 14px', borderRadius: '18px', fontWeight: 'bold', fontSize: '13px', textDecoration: 'none' }}
              >
                Inscrever-se
              </a>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Curtir: só aparece se o Supabase estiver configurado */}
              {curtidas.disponivel && (
                <button onClick={curtidas.alternar} style={{ ...estiloBotao, color: curtidas.curtido ? '#3ea6ff' : '#f1f1f1' }}>
                  {curtidas.curtido ? <FaThumbsUp /> : <FaRegThumbsUp />} {curtidas.total}
                </button>
              )}
              <button onClick={compartilhar} style={estiloBotao}>
                {copiado ? <><FaCheck /> Link copiado!</> : <><FaShareAlt /> Compartilhar</>}
              </button>
            </div>
          </div>

          <div style={{ background: '#272727', borderRadius: '12px', padding: '12px', fontSize: '13px', lineHeight: 1.6, color: '#d9d9d9' }}>
            {atual.descricao}
          </div>
        </div>

        {/* Lista de vídeos */}
        <div style={{ flex: '1 1 240px', minWidth: 0 }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#aaa' }}>Meus vídeos</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setAtual(video)}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  background: video.id === atual.id ? '#272727' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '6px',
                  color: '#f1f1f1',
                  cursor: 'pointer'
                }}
              >
                <Miniatura video={video} largura="140px" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', lineHeight: 1.3 }}>{video.titulo}</div>
                  <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{canal.nome}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
