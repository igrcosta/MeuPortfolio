import { certificados } from '../data/certificados';
import { cor, raio, fonte, sombra } from '../theme/tokens';
import { TelaApp, TituloApp } from '../theme/ui';

// Grade de cards: cada card mostra a prévia do certificado e abre o PDF ao clicar
export default function Certificados() {
  return (
    <TelaApp>
      <TituloApp titulo="Certificados" subtitulo="Clique em um certificado para abrir o PDF." />
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
              borderRadius: raio.lg,
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'block',
              border: `1px solid ${cor.borda}`,
              boxShadow: sombra.icone
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
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', color: cor.texto }}>
              <h4 style={{ margin: 0, fontSize: fonte.md, fontWeight: fonte.semi }}>{cert.titulo}</h4>
              <p style={{ margin: '3px 0 0', fontSize: fonte.xs, color: cor.textoSecundario }}>{cert.instituicao}</p>
            </div>
          </a>
        ))}
      </div>
    </TelaApp>
  );
}
