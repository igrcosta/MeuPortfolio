import { useState } from 'react';
import { FaYoutube, FaThumbsUp, FaRegThumbsUp, FaShareAlt, FaCheck } from 'react-icons/fa';
import { canal, videos } from '../data/youtube';
import useCurtidas from '../hooks/useCurtidas';
import useComentarios from '../hooks/useComentarios';
import { cor, raio, fonte, espaco } from '../theme/tokens';
import { TelaApp, Botao, Cartao } from '../theme/ui';

// "há 5 min", "há 2 h", "há 3 dias"
function tempoRelativo(dataIso) {
  const segundos = Math.floor((Date.now() - new Date(dataIso).getTime()) / 1000);
  if (segundos < 60) return 'agora mesmo';
  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas} h`;
  const dias = Math.floor(horas / 24);
  return dias === 1 ? 'há 1 dia' : `há ${dias} dias`;
}

// Avatar com a inicial do apelido, cor sorteada a partir do nome (sempre a mesma para o mesmo apelido)
function Avatar({ nome, tamanho = 34 }) {
  const cores = [cor.roxo, cor.roxoEscuro, cor.indigo, cor.azul, cor.roxoHover, cor.laranja];
  const indice = [...nome].reduce((soma, letra) => soma + letra.charCodeAt(0), 0) % cores.length;
  return (
    <span style={{
      width: tamanho,
      height: tamanho,
      flexShrink: 0,
      borderRadius: '50%',
      background: cores[indice],
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: fonte.negrito,
      fontSize: fonte.sm
    }}>
      {nome.charAt(0).toUpperCase()}
    </span>
  );
}

// Campo de texto no estilo do sistema
const estiloCampo = {
  background: cor.superficie,
  border: `1px solid ${cor.borda}`,
  borderRadius: raio.md,
  color: cor.texto,
  padding: '10px 12px',
  fontSize: fonte.sm,
  fontFamily: fonte.familia,
  outline: 'none',
  width: '100%'
};

function Comentarios({ videoId }) {
  const { disponivel, comentarios, enviar, erro } = useComentarios(videoId);
  const [apelido, setApelido] = useState(() => {
    try {
      return localStorage.getItem('apelido') || '';
    } catch {
      return '';
    }
  });
  const [editandoApelido, setEditandoApelido] = useState(!apelido);
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (!disponivel) return null;

  const apelidoValido = apelido.trim().length >= 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apelidoValido || !texto.trim()) return;
    setEnviando(true);
    const deuCerto = await enviar(apelido.trim(), texto.trim());
    setEnviando(false);
    if (deuCerto) {
      setTexto('');
      setEditandoApelido(false);
      try {
        localStorage.setItem('apelido', apelido.trim());
      } catch {
        // sem localStorage: o apelido só não fica salvo para a próxima visita
      }
    }
  };

  return (
    <section style={{ marginTop: espaco[6] }}>
      <h3 style={{ fontSize: fonte.md, fontWeight: fonte.semi, margin: `0 0 ${espaco[4]}` }}>
        {comentarios.length} {comentarios.length === 1 ? 'comentário' : 'comentários'}
      </h3>

      {/* Escrever comentário */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: espaco[3], marginBottom: espaco[6] }}>
        <Avatar nome={apelidoValido ? apelido.trim() : '?'} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: espaco[2] }}>
          {editandoApelido ? (
            <input
              value={apelido}
              onChange={(e) => setApelido(e.target.value.slice(0, 24))}
              placeholder="Seu apelido (ex.: Visitante Curioso)"
              aria-label="Seu apelido"
              style={estiloCampo}
            />
          ) : (
            <span style={{ fontSize: fonte.xs, color: cor.textoSecundario }}>
              Comentando como <strong style={{ color: cor.texto }}>@{apelido}</strong>{' · '}
              <button type="button" onClick={() => setEditandoApelido(true)} style={{ background: 'none', border: 'none', color: cor.roxoClaro, cursor: 'pointer', padding: 0, fontSize: fonte.xs }}>
                trocar
              </button>
            </span>
          )}
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value.slice(0, 500))}
            placeholder="Adicione um comentário..."
            aria-label="Comentário"
            rows={2}
            style={{ ...estiloCampo, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: espaco[3] }}>
            <span style={{ fontSize: fonte.xs, color: erro ? cor.vermelho : cor.textoTerciario }}>
              {erro || (!apelidoValido && editandoApelido ? 'Escolha um apelido com pelo menos 2 letras' : `${texto.length}/500`)}
            </span>
            <Botao type="submit" variante="primario" disabled={enviando || !apelidoValido || !texto.trim()}>
              {enviando ? 'Publicando...' : 'Comentar'}
            </Botao>
          </div>
        </div>
      </form>

      {/* Lista */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: espaco[4] }}>
        {comentarios.map((c) => (
          <div key={c.id} style={{ display: 'flex', gap: espaco[3] }}>
            <Avatar nome={c.apelido} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: fonte.xs }}>
                <strong>@{c.apelido}</strong>
                <span style={{ color: cor.textoTerciario }}> · {tempoRelativo(c.criado_em)}</span>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: fonte.sm, lineHeight: 1.55, color: cor.textoSecundario, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                {c.texto}
              </p>
            </div>
          </div>
        ))}
        {comentarios.length === 0 && (
          <p style={{ color: cor.textoTerciario, fontSize: fonte.sm, margin: 0 }}>Seja o primeiro a comentar! 🚀</p>
        )}
      </div>
    </section>
  );
}

// Miniatura: a do próprio YouTube, ou um bloco escuro para vídeos .mp4
function Miniatura({ video }) {
  const estilo = { width: '132px', aspectRatio: '16/9', borderRadius: raio.md, flexShrink: 0, objectFit: 'cover' };
  if (video.tipo === 'mp4') {
    return <div style={{ ...estilo, background: cor.superficie, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎬</div>;
  }
  return <img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" style={estilo} />;
}

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
    <TelaApp padding={espaco[5]}>
      {/* Corpo: player + lista (a lista desce para baixo quando a janela é estreita) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: espaco[6] }}>

        {/* Coluna do player */}
        <div style={{ flex: '1 1 420px', minWidth: 0 }}>
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: raio.lg, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
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

          <h1 style={{ fontSize: fonte.lg, fontWeight: fonte.semi, letterSpacing: '-0.01em', margin: `${espaco[4]} 0 ${espaco[3]}` }}>{atual.titulo}</h1>

          {/* Canal + ações */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: espaco[3], marginBottom: espaco[4] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: espaco[3] }}>
              <img src="/images&Icons/Foto minha.jpeg" alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <strong style={{ fontSize: fonte.sm, display: 'block' }}>{canal.nome}</strong>
                <span style={{ fontSize: fonte.xs, color: cor.textoTerciario, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaYoutube color={cor.vermelho} /> YouTube
                </span>
              </div>
              <Botao href={`${canal.url}?sub_confirmation=1`} variante="primario" style={{ marginLeft: espaco[2] }}>
                Inscrever-se
              </Botao>
            </div>

            <div style={{ display: 'flex', gap: espaco[2] }}>
              {curtidas.disponivel && (
                <Botao onClick={curtidas.alternar} style={{ color: curtidas.curtido ? cor.roxoClaro : cor.texto }}>
                  {curtidas.curtido ? <FaThumbsUp /> : <FaRegThumbsUp />} {curtidas.total}
                </Botao>
              )}
              <Botao onClick={compartilhar}>
                {copiado ? <><FaCheck /> Link copiado!</> : <><FaShareAlt /> Compartilhar</>}
              </Botao>
            </div>
          </div>

          <Cartao style={{ padding: espaco[4], fontSize: fonte.sm, lineHeight: 1.6, color: cor.textoSecundario }}>
            {atual.descricao}
          </Cartao>

          <Comentarios videoId={atual.id} />
        </div>

        {/* Lista de vídeos */}
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <h4 style={{ margin: `0 0 ${espaco[3]}`, fontSize: fonte.xs, letterSpacing: '0.08em', textTransform: 'uppercase', color: cor.textoTerciario }}>
            Meus vídeos
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: espaco[2] }}>
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setAtual(video)}
                style={{
                  display: 'flex',
                  gap: espaco[3],
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  background: video.id === atual.id ? cor.roxoSuave : 'transparent',
                  border: `1px solid ${video.id === atual.id ? cor.roxoBorda : 'transparent'}`,
                  borderRadius: raio.lg,
                  padding: espaco[2],
                  color: cor.texto,
                  cursor: 'pointer',
                  fontFamily: fonte.familia
                }}
              >
                <Miniatura video={video} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: fonte.sm, fontWeight: fonte.semi, lineHeight: 1.3 }}>{video.titulo}</div>
                  <div style={{ fontSize: fonte.xs, color: cor.textoTerciario, marginTop: '4px' }}>{canal.nome}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </TelaApp>
  );
}
