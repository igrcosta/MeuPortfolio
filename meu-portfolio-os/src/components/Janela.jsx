import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { FaMinus, FaRegSquare, FaRegClone, FaTimes } from 'react-icons/fa';
import Icone from './Icone';

// Altura da Taskbar, para a janela não ficar por baixo dela
const ALTURA_TASKBAR = 56;

// Botão da barra de título (minimizar / maximizar / fechar)
function BotaoJanela({ onClick, titulo, perigo = false, children }) {
    const [hover, setHover] = useState(false);
    return (
        <button
            onClick={onClick}
            title={titulo}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: hover ? (perigo ? '#e81123' : 'rgba(255,255,255,0.1)') : 'transparent',
                color: '#e2e8f0',
                border: 'none',
                width: '36px',
                height: '30px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px'
            }}
        >
            {children}
        </button>
    );
}

export default function Janela({
    titulo,
    icone,                                    // ícone do app, aparece na barra de título
    cor,                                      // cor do ícone (react-icons)
    onClose,
    onMinimize,
    children,
    zIndex,                                   // quem tem o maior fica na frente
    ativa = false,                            // true = janela da frente (barra destacada)
    minimizada = false,                       // true = escondida (continua na Taskbar)
    onFocus,                                  // chamado ao clicar na janela (traz pra frente)
    isMobile = false,                         // no celular: tela cheia, sem arrastar
    tamanho = { width: 800, height: 600 },    // tamanho inicial no PC
    posicao = { x: 100, y: 60 }               // posição inicial no PC
}) {
    // Posição e tamanho ficam guardados aqui (Rnd "controlado"), para poder maximizar e restaurar
    // sem recriar a janela (recriar faria o vídeo do YouTube recarregar)
    const [pos, setPos] = useState(posicao);
    const [tam, setTam] = useState({
        width: Math.min(tamanho.width, window.innerWidth - 40),
        height: Math.min(tamanho.height, window.innerHeight - ALTURA_TASKBAR - posicao.y - 10)
    });
    const [maximizada, setMaximizada] = useState(false);

    const telaCheia = isMobile || maximizada;

    const moldura = (
        <div style={{
            background: '#0f0f0f',
            color: '#fff',
            height: '100%',
            borderRadius: telaCheia ? 0 : '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: ativa ? '0 20px 50px rgba(0,0,0,0.6)' : '0 8px 20px rgba(0,0,0,0.4)',
            border: `1px solid ${ativa ? 'rgba(167,139,250,0.45)' : '#272727'}`
        }}>
            {/* className usado pelo Rnd: só dá pra arrastar pela barra de título. Duplo clique maximiza. */}
            <div
                className="janela-barra"
                onDoubleClick={() => !isMobile && setMaximizada(!maximizada)}
                style={{
                    background: ativa ? '#1f1f2e' : '#18181b',
                    padding: '4px 4px 4px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #2a2a35',
                    cursor: telaCheia ? 'default' : 'move',
                    userSelect: 'none'
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: ativa ? '#f1f5f9' : '#94a3b8' }}>
                    {icone && <Icone icone={icone} tamanho={16} cor={cor} />}
                    {titulo}
                </span>

                <div style={{ display: 'flex', gap: '2px' }}>
                    <BotaoJanela onClick={onMinimize} titulo="Minimizar"><FaMinus /></BotaoJanela>
                    {!isMobile && (
                        <BotaoJanela onClick={() => setMaximizada(!maximizada)} titulo={maximizada ? 'Restaurar' : 'Maximizar'}>
                            {maximizada ? <FaRegClone /> : <FaRegSquare />}
                        </BotaoJanela>
                    )}
                    <BotaoJanela onClick={onClose} titulo="Fechar" perigo><FaTimes /></BotaoJanela>
                </div>
            </div>

            {/* Conteúdo do app */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {children}
            </div>
        </div>
    );

    // CELULAR: janela ocupa a tela toda, acima da Taskbar
    if (isMobile) {
        return (
            <div
                onMouseDown={onFocus}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: ALTURA_TASKBAR,
                    zIndex,
                    display: minimizada ? 'none' : 'block'
                }}
            >
                {moldura}
            </div>
        );
    }

    // PC: janela arrastável e redimensionável (ou maximizada ocupando a área de trabalho)
    return (
        <Rnd
            position={maximizada ? { x: 0, y: 0 } : pos}
            size={maximizada ? { width: '100%', height: '100%' } : tam}
            onDragStop={(_evento, d) => setPos({ x: d.x, y: d.y })}
            onResizeStop={(_evento, _direcao, ref, _delta, novaPos) => {
                setTam({ width: ref.offsetWidth, height: ref.offsetHeight });
                setPos(novaPos);
            }}
            disableDragging={maximizada}
            enableResizing={!maximizada}
            minWidth={320}
            minHeight={240}
            bounds="parent"
            dragHandleClassName="janela-barra"
            onMouseDown={onFocus}
            style={{ zIndex, display: minimizada ? 'none' : 'block' }}
        >
            {moldura}
        </Rnd>
    );
}
