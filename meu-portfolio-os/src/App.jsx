import { useState } from 'react';
import { Rnd } from 'react-rnd';

// Apps e props que fiz para serem importados
import Janela from './components/Janela';
import YoutubeApp from './YoutubeApp';

// Certificados que ficam dentro da janela de certificados
const meusCertificados = [
  {
    id: 1,
    titulo: 'Certificado de Inglês',
    instituicao: 'ILSC - Vancouver',
    imagem: '/certificates/EnglishCertificatePreview.png',
    linkPdf: '/certificates/ILSC - English certificate.pdf'
  },
  {
    id: 2,
    titulo: 'Certificado Gemini Academy',
    instituicao: 'Google For Education',
    imagem: '/certificates/GeminiDocPreview.png',
    linkPdf: '/certificates/Certificado-Gemini-Lab.pdf'
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
          <div style={{ fontSize: '40px' }}><img src="/images&Icons/YTlogo.webp" alt="YouTube" style={{ width: '60px', height: '40px' }} /></div>
          <span style={{ fontSize: '12px' }}>YouTube</span>
        </div>

        {/* Ícone 2: Jogos */}
        <div
          onClick={() => setJanelaJogos(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}><img src="/images&Icons/gameControllerIcon.png" alt="Jogos" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <span style={{ fontSize: '12px' }}>Jogos</span>
        </div>

        {/* Ícone 3: Certificados */}
        <div
          onClick={() => setJanelaCertificados(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}><img src="/images&Icons/documentICON.png" alt="Certificados" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
          <span style={{ fontSize: '12px' }}>Certificados</span>
        </div>

      </div>

      {/* JANELAS (SÓ APARECEM SE O ESTADO FOR TRUE) */}

      {/* JANELA YOUTUBE */}
      {janelaYoutube && (
        <Janela titulo="YouTube" onClose={() => setJanelaYoutube(false)}>
          <YoutubeApp />
        </Janela>
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
        <Rnd default={{ x: 150, y: 80, width: 620, height: 440 }} bounds="parent">
          <div style={{
            background: '#2a2d32',
            color: '#fff',
            height: '100%',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            border: '1px solid #3a3f47',
            padding: '10px',
            overflowY: 'hidden'
          }}>
            {/* Barra Título */}
            <div style={{
              background: '#2a2d32',
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#e2e8f0' }}>Certificados</span>

              <button
                onClick={() => setJanelaCertificados(false)}
                style={{
                  background: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  width: '22px',
                  height: '22px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                X
              </button>
            </div>

            {/* Conteúdo: Grade de Cards (2 por linha) */}
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px'
              }}>
                {meusCertificados.map((cert) => (
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
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      transition: 'transform 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Imagem de Fundo do Card */}
                    <img
                      src={cert.imagem}
                      alt={cert.titulo}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />

                    {/* Camada Transparente com Gradiente */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)'
                    }} />

                    {/* Informações Sobrepostas na Parte Inferior */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      color: '#ffffff',
                      zIndex: 2
                    }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>
                        {cert.titulo}
                      </h4>
                      <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#cbd5e1' }}>
                        {cert.instituicao}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </Rnd>
      )}

    </div>
  );
}