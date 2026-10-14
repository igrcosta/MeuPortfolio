import { useEffect, useState } from 'react';
import { SiWakatime } from 'react-icons/si';
import { cor, vidro, raio, fonte, escalaCinza } from '../theme/tokens';
import { TituloApp, TituloSecao } from '../theme/ui';

const CORES = escalaCinza;

// Estatísticas de código dos últimos 7 dias (WakaTime), vindas da nossa função serverless /api/wakatime
export default function WakaTime() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch('/api/wakatime')
      .then((resposta) => {
        if (!resposta.ok) throw new Error();
        return resposta.json();
      })
      .then(setDados)
      .catch(() => setErro(true));
  }, []);

  const estilo = { color: cor.texto, fontFamily: fonte.familia, height: '100%', overflowY: 'auto', padding: '24px' };

  if (erro) {
    return (
      <div style={estilo}>
        <p style={{ color: cor.textoSecundario }}>
          As estatísticas do WakaTime ficam disponíveis no site publicado (elas vêm de uma função serverless da Vercel).
        </p>
      </div>
    );
  }
  if (!dados) return <div style={estilo}>Carregando estatísticas...</div>;

  return (
    <div style={estilo}>
      <TituloApp Icone={SiWakatime} titulo="Tempo programando" subtitulo="Últimos 7 dias, medido automaticamente pelo WakaTime no meu editor." />

      {dados.calculando ? (
        <p style={{ color: cor.textoSecundario }}>O WakaTime ainda está calculando as estatísticas. Volte daqui a pouco!</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {[['Total na semana', dados.total], ['Média por dia', dados.mediaDiaria]].map(([rotulo, valor]) => (
              <div key={rotulo} style={{ flex: '1 1 150px', ...vidro.cartao, borderRadius: raio.lg, padding: '16px' }}>
                <div style={{ fontSize: fonte.xl, fontWeight: fonte.negrito, letterSpacing: '-0.02em' }}>{valor}</div>
                <div style={{ fontSize: fonte.xs, color: cor.textoSecundario }}>{rotulo}</div>
              </div>
            ))}
          </div>

          <TituloSecao>Linguagens</TituloSecao>
          {dados.linguagens.map((lang, i) => (
            <div key={lang.nome} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fonte.sm, marginBottom: '6px' }}>
                <span>{lang.nome}</span>
                <span style={{ color: cor.textoSecundario }}>{lang.texto}</span>
              </div>
              <div style={{ height: '8px', background: cor.superficieHover, borderRadius: raio.pilula, overflow: 'hidden' }}>
                <div style={{ width: `${lang.porcentagem}%`, height: '100%', background: CORES[i % CORES.length] }} />
              </div>
            </div>
          ))}

          {dados.editores.length > 0 && (
            <p style={{ marginTop: '18px', fontSize: fonte.xs, color: cor.textoTerciario }}>
              Editores: {dados.editores.map((e) => e.nome).join(', ')}
            </p>
          )}
        </>
      )}
    </div>
  );
}
