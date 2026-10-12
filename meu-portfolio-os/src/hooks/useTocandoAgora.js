import { useEffect, useState } from 'react';

const USUARIO = import.meta.env.VITE_LASTFM_USER;
const CHAVE = import.meta.env.VITE_LASTFM_API_KEY;
const INTERVALO = 30000; // consulta de novo a cada 30 segundos

// Última música tocada no Spotify (via scrobbles do Last.fm).
// Devolve { disponivel, musica } — musica = { nome, artista, capa, link, tocandoAgora } ou null.
export default function useTocandoAgora() {
  const [musica, setMusica] = useState(null);

  useEffect(() => {
    if (!USUARIO || !CHAVE) return;

    const buscar = async () => {
      try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USUARIO}&api_key=${CHAVE}&format=json&limit=1`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const faixa = dados?.recenttracks?.track?.[0];
        if (!faixa) return;
        setMusica({
          nome: faixa.name,
          artista: faixa.artist?.['#text'],
          capa: faixa.image?.find((img) => img.size === 'medium')?.['#text'] || '',
          link: faixa.url,
          tocandoAgora: faixa['@attr']?.nowplaying === 'true'
        });
      } catch {
        // sem internet ou Last.fm fora do ar: mantém o que já tinha
      }
    };

    buscar();
    const timer = setInterval(buscar, INTERVALO);
    return () => clearInterval(timer);
  }, []);

  return { disponivel: !!(USUARIO && CHAVE), musica };
}
