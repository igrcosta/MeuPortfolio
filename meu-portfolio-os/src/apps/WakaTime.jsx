import { useEffect, useState } from 'react';
import { SiWakatime } from 'react-icons/si';

const CORES = ['#a78bfa', '#38bdf8', '#4ade80', '#fbbf24', '#f472b6', '#fb923c'];

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

  const estilo = { background: '#0d1117', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '20px' };

  if (erro) {
    return (
      <div style={estilo}>
        <p style={{ color: '#94a3b8' }}>
          As estatísticas do WakaTime ficam disponíveis no site publicado (elas vêm de uma função serverless da Vercel).
        </p>
      </div>
    );
  }
  if (!dados) return <div style={estilo}>Carregando estatísticas...</div>;

  return (
    <div style={estilo}>
      <h2 style={{ margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <SiWakatime /> Tempo programando
      </h2>
      <p style={{ margin: '0 0 18px', color: '#94a3b8', fontSize: '13px' }}>Últimos 7 dias, medido automaticamente pelo WakaTime no meu editor.</p>

      {dados.calculando ? (
        <p style={{ color: '#94a3b8' }}>O WakaTime ainda está calculando as estatísticas. Volte daqui a pouco!</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {[['Total na semana', dados.total], ['Média por dia', dados.mediaDiaria]].map(([rotulo, valor]) => (
              <div key={rotulo} style={{ flex: '1 1 150px', background: '#1f2937', border: '1px solid #374151', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{valor}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{rotulo}</div>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '0 0 10px', color: '#94a3b8' }}>Linguagens</h4>
          {dados.linguagens.map((lang, i) => (
            <div key={lang.nome} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>{lang.nome}</span>
                <span style={{ color: '#94a3b8' }}>{lang.texto}</span>
              </div>
              <div style={{ height: '8px', background: '#1f2937', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${lang.porcentagem}%`, height: '100%', background: CORES[i % CORES.length] }} />
              </div>
            </div>
          ))}

          {dados.editores.length > 0 && (
            <p style={{ marginTop: '18px', fontSize: '12px', color: '#64748b' }}>
              Editores: {dados.editores.map((e) => e.nome).join(', ')}
            </p>
          )}
        </>
      )}
    </div>
  );
}
