import { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function App() {

  // 1. estados -> servem como nossos aplicativos
  const [janelaYoutube, setJanelaYoutube] = useState(false);
  const [janelaJogos, setJanelaJogos] = useState(false);
  const [janelaCertificados, setJanelaCertificados] = useState(false);

  return (
    // Área de trabalho, desktop
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0f172a', position: 'relative' }}>
      
      {/* Região onde fica os ícones*/}
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        
        {/* Ícone 1: YouTube */}
        <div 
          onClick={() => setJanelaYoutube(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}>📺</div>
          <span style={{ fontSize: '12px' }}>YouTube</span>
        </div>

        {/* Ícone 2: Jogos */}
        <div 
          onClick={() => setJanelaJogos(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}>🎮</div>
          <span style={{ fontSize: '12px' }}>Jogos</span>
        </div>

        {/* Ícone 3: Certificados */}
        <div 
          onClick={() => setJanelaCertificados(true)}
          style={{ textAlign: 'center', color: '#fff', cursor: 'pointer', width: '80px' }}
        >
          <div style={{ fontSize: '40px' }}>📜</div>
          <span style={{ fontSize: '12px' }}>Certificados</span>
        </div>

      </div>

      {/* 3. JANELAS (SÓ APARECEM SE O ESTADO FOR TRUE) */}

      {/* JANELA DO YOUTUBE */}
      {janelaYoutube && (
        <Rnd default={{ x: 100, y: 100, width: 400, height: 300 }} bounds="parent">
          <div style={{ background: '#1e293b', color: '#fff', height: '100%', padding: '10px' }}>
            <button onClick={() => setJanelaYoutube(false)}>X</button>
            <p>App do YouTube</p>
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
        <Rnd default={{ x: 200, y: 200, width: 400, height: 300 }} bounds="parent">
          <div style={{ background: '#1e293b', color: '#fff', height: '100%', padding: '10px' }}>
            <button onClick={() => setJanelaCertificados(false)}>X</button>
            <p>Meus Certificados</p>
          </div>
        </Rnd>
      )}

    </div>
  );
}