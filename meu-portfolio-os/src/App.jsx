import { useState } from 'react';
import { Rnd } from 'react-rnd';

// Certificados que ficam dentro da janela de certificados
const meusCertificados = [
  {
    id: 1,
    titulo: 'Certificado de Inglês',
    instituicao: 'ILSC - Vancouver🇨🇦',
    imagem: '/images&Icons/canada-flag.png',
    linkPdf: '/certificates/ILSC - English certificate.pdf'
  }
];

export default function App() {

  // Estados -> servem como nossos aplicativos
  const [janelaYoutube, setJanelaYoutube] = useState(false);
  const [janelaJogos, setJanelaJogos] = useState(false);
  const [janelaCertificados, setJanelaCertificados] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#383f4e', position: 'relative' }}>

      {/* Área de trabalho, desktop - Região dos Ícones */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>

        {/* Ícone 1: YouTube */}
        <div
          onClick={() => setJanelaYoutube(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}><img src="/images&Icons/YTlogo.webp" style={{ width: '60px', height: '40px' }}></img></div>
          <span style={{ fontSize: '12px' }}>YouTube</span>
        </div>

        {/* Ícone 2: Jogos */}
        <div
          onClick={() => setJanelaJogos(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}> <img src="/images&Icons/gameControllerIcon.png" style={{ width: '40px', height: '40px', objectFit: 'contain' }}></img></div>
          <span style={{ fontSize: '12px' }}>Jogos</span>
        </div>

        {/* Ícone 3: Certificados */}
        <div
          onClick={() => setJanelaCertificados(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}><img src="/images&Icons/documentICON.png" style={{ width: '40px', height: '40px', objectFit: 'contain' }}></img></div>
          <span style={{ fontSize: '12px' }}>Certificados</span>
        </div>

      </div>

      {/* JANELAS (SÓ APARECEM SE O ESTADO FOR TRUE) */}

      {/* JANELA DO YOUTUBE */}
      {janelaYoutube && (
        <Rnd default={{ x: 100, y: 100, width: 400, height: 300 }} bounds="parent">
          <div style={{ background: '#22262c', color: '#fff', height: '100%', padding: '10px' }}>
            <button onClick={() => setJanelaYoutube(false)}>X</button>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/xckdE-H2auY?si=CHk1pBx81wvSNTdy"
              title="YouTube video player"
              style={{ border: 'none', borderRadius: '8px' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Rnd>
      )}

      {/* JANELA DE JOGOS */}
      {janelaJogos && (
        <Rnd default={{ x: 150, y: 150, width: 400, height: 300 }} bounds="parent">
          <div style={{ background: '#1e293b', color: '#fff', height: '100%', padding: '10px' }}>
            <button onClick={() => setJanelaJogos(false)}>X</button>
            <p>Launcher de Jogos</p>
          </div>
        </Rnd>
      )}

      {/* JANELA DE CERTIFICADOS */}
      {janelaCertificados && (
        <Rnd default={{ x: 200, y: 200, width: 400, height: 350 }} bounds="parent">
          <div style={{ background: '#1e293b', color: '#fff', height: '100%', padding: '10px', overflowY: 'auto' }}>
            <button onClick={() => setJanelaCertificados(false)}>X</button>

            {/* Renderizando a lista dos certificados por meio do map abaixo */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '10px' }}>
              {meusCertificados.map((cert) => (
                <div key={cert.id} style={{ background: '#0f172a', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>

                  {/* Imagem de Preview */}
                  <img
                    src={cert.imagem}
                    alt={cert.titulo}
                    style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }}
                  />

                  {/* Título e Instituição */}
                  <h4 style={{ margin: '8px 0 4px', fontSize: '14px' }}>{cert.titulo}</h4>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px' }}>{cert.instituicao}</p>

                  {/* Link para abrir o PDF */}
                  <a
                    href={cert.linkPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '12px' }}
                  >
                    📄 Ver PDF
                  </a>

                </div>
              ))}
            </div>

          </div>
        </Rnd>
      )}

    </div>
  );
}