import { certificados } from '../data/certificados';

// Grade de cards: cada card mostra a prévia do certificado e abre o PDF ao clicar
export default function Certificados() {
  return (
    <div style={{ background: '#2a2d32', height: '100%', overflowY: 'auto', padding: '16px' }}>
      <div style={{
        display: 'grid',
        // auto-fill: cabem quantas colunas der (2 no PC, 1 no celular)
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {certificados.map((cert) => (
          <a
            key={cert.id}
            href={cert.linkPdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              height: '160px',
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'block',
              border: '1px solid #444',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {/* Imagem de Fundo do Card */}
            <img
              src={cert.imagem}
              alt={cert.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Camada Transparente com Gradiente */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)'
            }} />

            {/* Informações Sobrepostas na Parte Inferior */}
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', color: '#fff' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{cert.titulo}</h4>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#cbd5e1' }}>{cert.instituicao}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
