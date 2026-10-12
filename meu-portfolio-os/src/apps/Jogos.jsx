import Chip from '@mui/material/Chip';
import { FaGamepad, FaGithub } from 'react-icons/fa';
import { projetos } from '../data/projetos';

// Mesma lista do app Projetos, mas só os itens com tipo 'jogo' (do mais recente pro mais antigo)
const jogos = projetos
  .filter((projeto) => projeto.tipo === 'jogo')
  .sort((a, b) => b.data.localeCompare(a.data));

export default function Jogos() {
  return (
    <div style={{ background: '#0b0b12', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '20px' }}>
      <h2 style={{ margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaGamepad color="#f472b6" /> Launcher de Jogos
      </h2>
      <p style={{ margin: '0 0 18px', color: '#94a3b8', fontSize: '14px' }}>
        Jogos que desenvolvi na faculdade de Jogos Digitais.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {jogos.map((jogo) => (
          <div key={jogo.id} style={{ background: '#1a1a2e', border: '1px solid #312e81', borderRadius: '12px', overflow: 'hidden' }}>

            {/* Trailer (se tiver) ou capa provisória */}
            {jogo.video ? (
              <div style={{ aspectRatio: '16/9', background: '#000' }}>
                <iframe
                  src={jogo.video}
                  title={`Trailer de ${jogo.nome}`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', display: 'block' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={{
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #831843, #1e1b4b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold'
              }}>
                {jogo.nome}
              </div>
            )}

            <div style={{ padding: '12px 14px' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '16px' }}>{jogo.nome}</h3>
              <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5, color: '#cbd5e1' }}>{jogo.descricao}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {jogo.tecnologias.map((tec) => (
                  <Chip key={tec} label={tec} size="small" variant="outlined" sx={{ color: '#f9a8d4', borderColor: '#9d174d' }} />
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {jogo.link && (
                  <a href={jogo.link} target="_blank" rel="noopener noreferrer" style={{
                    background: '#db2777',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}>
                    ▶ Jogar
                  </a>
                )}
                <a href={jogo.github} target="_blank" rel="noopener noreferrer" style={{
                  color: '#e2e8f0',
                  padding: '6px 10px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaGithub /> Código
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
