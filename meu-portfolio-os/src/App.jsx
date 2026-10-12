import { useState } from 'react';
import { FaUser, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa';

// Componentes do "sistema operacional"
import Janela from './components/Janela';
import IconeDesktop from './components/IconeDesktop';
import Taskbar from './components/Taskbar';
import useIsMobile from './hooks/useIsMobile';

// Apps
import YoutubeApp from './apps/YoutubeApp';
import Certificados from './apps/Certificados';
import SobreMim from './apps/SobreMim';
import Projetos from './apps/Projetos';
import Experiencias from './apps/Experiencias';
import Contato from './apps/Contato';
import EmConstrucao from './apps/EmConstrucao';

// LISTA DE APPS DO OS
// Para criar um app novo, basta adicionar um item aqui:
//   id        -> identificador único
//   nome      -> aparece no ícone, na Taskbar e no título da janela
//   icone     -> caminho de imagem em public/ OU ícone do react-icons
//   cor       -> cor do ícone (só para react-icons)
//   tamanho   -> tamanho inicial da janela no PC
//   conteudo  -> o que aparece dentro da janela
const apps = [
  { id: 'sobre', nome: 'Sobre Mim', icone: FaUser, cor: '#38bdf8', tamanho: { width: 700, height: 520 }, conteudo: < SobreMim /> },
  { id: 'projetos', nome: 'Projetos', icone: FaCode, cor: '#a78bfa', tamanho: { width: 800, height: 600 }, conteudo: <Projetos /> },
  { id: 'experiencias', nome: 'Experiências', icone: FaBriefcase, cor: '#fbbf24', tamanho: { width: 700, height: 520 }, conteudo: <Experiencias /> },
  { id: 'contato', nome: 'Contato', icone: FaEnvelope, cor: '#4ade80', tamanho: { width: 600, height: 560 }, conteudo: <Contato /> },
  { id: 'youtube', nome: 'YouTube', icone: '/images&Icons/YTlogo.webp', tamanho: { width: 1000, height: 700 }, conteudo: <YoutubeApp /> },
  { id: 'certificados', nome: 'Certificados', icone: '/images&Icons/documentICON.png', tamanho: { width: 620, height: 440 }, conteudo: <Certificados /> },
  { id: 'jogos', nome: 'Jogos', icone: '/images&Icons/gameControllerIcon.png', tamanho: { width: 400, height: 300 }, conteudo: <EmConstrucao nome="Launcher de Jogos" /> }
];

export default function App() {
  const isMobile = useIsMobile();

  // Lista com os ids das janelas abertas.
  // A ORDEM importa: a última da lista é a que está na frente.
  // Links como "?abrir=sobre,youtube" já abrem esses apps (bom para divulgar na bio/vídeos)
  const [janelasAbertas, setJanelasAbertas] = useState(() => {
    const pedidos = new URLSearchParams(window.location.search).get('abrir');
    if (!pedidos) return [];
    return pedidos.split(',').filter((id) => apps.some((app) => app.id === id));
  });

  // Abre o app (ou traz pra frente se já estiver aberto):
  // tira o id da lista e coloca de novo no final
  const abrir = (id) => {
    setJanelasAbertas((atual) => [...atual.filter((j) => j !== id), id]);
  };

  // Fecha o app: remove o id da lista
  const fechar = (id) => {
    setJanelasAbertas((atual) => atual.filter((j) => j !== id));
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 30% 20%, #4b5468 0%, #383f4e 45%, #252a35 100%)'
    }}>

      {/* ÁREA DE TRABALHO: tudo menos a Taskbar (as janelas ficam presas aqui dentro) */}
      <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 48px)' }}>

        {/* Ícones: em coluna no PC, em grade no celular */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '16px',
          height: isMobile ? 'auto' : '100%',
          alignContent: 'flex-start'
        }}>
          {apps.map((app) => (
            <IconeDesktop key={app.id} app={app} onAbrir={abrir} />
          ))}
        </div>

        {/* JANELAS ABERTAS
            Percorremos a lista "apps" (ordem fixa) e não "janelasAbertas" (ordem muda):
            se a ordem no HTML mudasse, o React moveria a janela e o vídeo do YouTube recarregaria.
            Quem fica na frente é decidido só pelo zIndex. */}
        {apps
          .filter((app) => janelasAbertas.includes(app.id))
          .map((app) => {
            const ordem = janelasAbertas.indexOf(app.id);
            return (
              <Janela
                key={app.id}
                titulo={app.nome}
                onClose={() => fechar(app.id)}
                onFocus={() => abrir(app.id)}
                zIndex={10 + ordem}
                isMobile={isMobile}
                tamanho={app.tamanho}
                posicao={{ x: 120 + ordem * 30, y: 30 + ordem * 30 }}
              >
                {app.conteudo}
              </Janela>
            );
          })}
      </div>

      <Taskbar apps={apps} janelasAbertas={janelasAbertas} onAbrir={abrir} compacta={isMobile} />
    </div>
  );
}
