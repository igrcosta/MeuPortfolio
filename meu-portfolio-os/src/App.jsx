import { useCallback, useState } from 'react';
import { FaUser, FaCode, FaBriefcase, FaEnvelope, FaPlayCircle, FaGithub, FaYoutube, FaCertificate, FaGamepad } from 'react-icons/fa';
import { SiWakatime } from 'react-icons/si';

// Componentes do "sistema operacional"
import Janela from './components/Janela';
import IconeDesktop from './components/IconeDesktop';
import Taskbar from './components/Taskbar';
import BootScreen from './components/BootScreen';
import Widgets from './components/Widgets';
import useIsMobile from './hooks/useIsMobile';

// Apps
import YoutubeApp from './apps/YoutubeApp';
import Certificados from './apps/Certificados';
import SobreMim from './apps/SobreMim';
import Projetos from './apps/Projetos';
import Experiencias from './apps/Experiencias';
import Contato from './apps/Contato';
import Jogos from './apps/Jogos';
import GitHubStats from './apps/GitHubStats';
import WakaTime from './apps/WakaTime';
import BoasVindas from './apps/BoasVindas';

// Altura da Taskbar (a área de trabalho ocupa o resto da tela)
const ALTURA_TASKBAR = 56;

// LISTA DE APPS DO OS
// Para criar um app novo, basta adicionar um item aqui:
//   id        -> identificador único
//   nome      -> aparece no ícone, na Taskbar e no título da janela
//   icone     -> caminho de imagem em public/ OU ícone do react-icons
//   cor       -> cor do ícone (só para react-icons)
//   tamanho   -> tamanho inicial da janela no PC
//   conteudo  -> o que aparece dentro da janela
const apps = [
  { id: 'boasvindas', nome: 'Boas-vindas', icone: FaPlayCircle, cor: '#f472b6', tamanho: { width: 760, height: 560 }, conteudo: <BoasVindas /> },
  { id: 'sobre', nome: 'Sobre Mim', icone: FaUser, cor: '#38bdf8', tamanho: { width: 700, height: 520 }, conteudo: <SobreMim /> },
  { id: 'projetos', nome: 'Projetos', icone: FaCode, cor: '#a78bfa', tamanho: { width: 800, height: 600 }, conteudo: <Projetos /> },
  { id: 'experiencias', nome: 'Experiências', icone: FaBriefcase, cor: '#fbbf24', tamanho: { width: 700, height: 520 }, conteudo: <Experiencias /> },
  { id: 'contato', nome: 'Contato', icone: FaEnvelope, cor: '#4ade80', tamanho: { width: 600, height: 560 }, conteudo: <Contato /> },
  { id: 'youtube', nome: 'YouTube', icone: FaYoutube, cor: '#ff0033', tamanho: { width: 1000, height: 680 }, conteudo: <YoutubeApp /> },
  { id: 'certificados', nome: 'Certificados', icone: FaCertificate, cor: '#fb923c', tamanho: { width: 620, height: 440 }, conteudo: <Certificados /> },
  { id: 'jogos', nome: 'Jogos', icone: FaGamepad, cor: '#f472b6', tamanho: { width: 820, height: 560 }, conteudo: <Jogos /> },
  { id: 'github', nome: 'GitHub', icone: FaGithub, cor: '#e2e8f0', tamanho: { width: 560, height: 600 }, conteudo: <GitHubStats /> },
  { id: 'wakatime', nome: 'WakaTime', icone: SiWakatime, cor: '#e2e8f0', tamanho: { width: 520, height: 560 }, conteudo: <WakaTime /> }
];

export default function App() {
  const isMobile = useIsMobile();

  // Lista com os ids das janelas abertas.
  // A ORDEM importa: a última da lista é a que está na frente.
  // Links como "?abrir=sobre,youtube" já abrem esses apps (bom para divulgar na bio/vídeos)
  // Sem "?abrir=", o OS já começa com a janela de boas-vindas aberta
  const [janelasAbertas, setJanelasAbertas] = useState(() => {
    const pedidos = new URLSearchParams(window.location.search).get('abrir');
    if (!pedidos) return ['boasvindas'];
    return pedidos.split(',').filter((id) => apps.some((app) => app.id === id));
  });

  // Janelas minimizadas: continuam abertas (e na Taskbar), mas escondidas
  const [minimizadas, setMinimizadas] = useState([]);

  // Tela de boot: aparece só na primeira vez de cada visita (sessionStorage dura até fechar a aba)
  const [bootando, setBootando] = useState(() => {
    try {
      return !sessionStorage.getItem('bootVisto');
    } catch {
      return false;
    }
  });

  // useCallback: a função não muda entre renderizações, assim o BootScreen não reinicia os timers
  const terminarBoot = useCallback(() => {
    try {
      sessionStorage.setItem('bootVisto', 'sim');
    } catch {
      // navegador bloqueou o sessionStorage: sem problema, só mostra o boot de novo na próxima vez
    }
    setBootando(false);
  }, []);

  // Abre o app (ou traz pra frente se já estiver aberto):
  // tira o id da lista e coloca de novo no final, e garante que não está minimizado
  const abrir = (id) => {
    setJanelasAbertas((atual) => [...atual.filter((j) => j !== id), id]);
    setMinimizadas((atual) => atual.filter((j) => j !== id));
  };

  // Fecha o app: remove o id das listas
  const fechar = (id) => {
    setJanelasAbertas((atual) => atual.filter((j) => j !== id));
    setMinimizadas((atual) => atual.filter((j) => j !== id));
  };

  const minimizar = (id) => {
    setMinimizadas((atual) => (atual.includes(id) ? atual : [...atual, id]));
  };

  // App ativo = o da frente que não está minimizado
  const visiveis = janelasAbertas.filter((id) => !minimizadas.includes(id));
  const ativo = visiveis[visiveis.length - 1];

  // Clique na Taskbar, igual ao Windows: se o app já é o ativo, minimiza; senão, abre/traz pra frente
  const clicarNaTaskbar = (id) => {
    if (id === ativo) minimizar(id);
    else abrir(id);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(ellipse at 15% 10%, rgba(124, 58, 237, 0.35) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 90%, rgba(56, 189, 248, 0.25) 0%, transparent 50%),
        linear-gradient(160deg, #1a1b2e 0%, #11121c 100%)`
    }}>

      {/* ÁREA DE TRABALHO: tudo menos a Taskbar (as janelas ficam presas aqui dentro) */}
      <div style={{ position: 'relative', width: '100%', height: `calc(100% - ${ALTURA_TASKBAR}px)`, overflowY: isMobile ? 'auto' : 'hidden' }}>

        {/* Marca d'água no fundo */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '32px',
            fontSize: '64px',
            fontWeight: 800,
            letterSpacing: '-2px',
            color: 'rgba(255,255,255,0.04)',
            userSelect: 'none',
            pointerEvents: 'none'
          }}>
            IgorOS
          </div>
        )}

        {/* Ícones: em colunas no PC, em grade no celular */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '16px',
          height: isMobile ? 'auto' : '100%',
          alignContent: 'flex-start',
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}>
          {apps.map((app) => (
            <IconeDesktop key={app.id} app={app} onAbrir={abrir} />
          ))}
        </div>

        {/* Widgets: relógio, música tocando e visitas */}
        <Widgets isMobile={isMobile} />

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
                icone={app.icone}
                cor={app.cor}
                onClose={() => fechar(app.id)}
                onMinimize={() => minimizar(app.id)}
                onFocus={() => abrir(app.id)}
                zIndex={10 + ordem}
                ativa={app.id === ativo}
                minimizada={minimizadas.includes(app.id)}
                isMobile={isMobile}
                tamanho={app.tamanho}
                posicao={{ x: 130 + ordem * 30, y: 24 + ordem * 30 }}
              >
                {app.conteudo}
              </Janela>
            );
          })}
      </div>

      <Taskbar
        apps={apps}
        janelasAbertas={janelasAbertas}
        minimizadas={minimizadas}
        onClicarApp={clicarNaTaskbar}
        compacta={isMobile}
      />

      {/* Tela de boot por cima de tudo (só na primeira vez da visita) */}
      {bootando && <BootScreen onFim={terminarBoot} />}
    </div>
  );
}
