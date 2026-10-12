import { useEffect, useState } from 'react';

const USUARIO = import.meta.env.VITE_LASTFM_USER;
const CHAVE = import.meta.env.VITE_LASTFM_API_KEY;
const INTERVALO = 30000; // consulta de novo a cada 30 segundos
const CAPA_PADRAO_LASTFM = '2a96cbd8b46e442fc41c2b86b821562f'; // imagem de "sem capa" do Last.fm

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

        // Sem capa, o Last.fm manda uma estrela genérica: nesse caso deixamos vazio (o widget mostra o ícone do Spotify)
        const urlCapa = faixa.image?.find((img) => img.size === 'large')?.['#text'] || '';
        const capa = urlCapa.includes(CAPA_PADRAO_LASTFM) ? '' : urlCapa;

        setMusica({
          nome: faixa.name,
          artista: faixa.artist?.['#text'],
          capa,
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
