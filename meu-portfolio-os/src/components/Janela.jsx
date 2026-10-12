import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { FaMinus, FaRegSquare, FaRegClone, FaTimes } from 'react-icons/fa';
import Icone from './Icone';
import { cor, vidro, raio, sombra, fonte, transicao, ALTURA_DOCK } from '../theme/tokens';

// Botão da barra de título (minimizar / maximizar / fechar)
function BotaoJanela({ onClick, titulo, perigo = false, children }) {
    const [hover, setHover] = useState(false);
    return (
        <button
            onClick={onClick}
            title={titulo}
            aria-label={titulo}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: hover ? (perigo ? cor.vermelho : cor.superficieHover) : 'transparent',
                color: hover ? '#fff' : cor.textoSecundario,
                border: 'none',
                width: '34px',
                height: '28px',
                borderRadius: raio.sm,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                transition: `background ${transicao.rapida}, color ${transicao.rapida}`
            }}
        >
            {children}
        </button>
    );
}

export default function Janela({
    titulo,
    icone,                                    // ícone do app, aparece na barra de título
    cor: corApp,                              // cor do app (gradiente do ícone)
    onClose,
    onMinimize,
    children,
    zIndex,                                   // quem tem o maior fica na frente
    ativa = false,                            // true = janela da frente (brilho roxo)
    minimizada = false,                       // true = escondida (continua no dock)
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
        height: Math.min(tamanho.height, window.innerHeight - ALTURA_DOCK - posicao.y - 10)
    });
    const [maximizada, setMaximizada] = useState(false);

    const telaCheia = isMobile || maximizada;

    const moldura = (
        <div style={{
            ...vidro.janela,
            height: '100%',
            borderRadius: telaCheia ? 0 : raio.xl,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: `${vidro.janela.boxShadow}, ${ativa ? sombra.janelaAtiva : sombra.janela}`,
            borderColor: ativa ? cor.roxoBorda : cor.borda,
            color: cor.texto,
            fontFamily: fonte.familia,
            transition: `border-color ${transicao.media}, box-shadow ${transicao.media}`
        }}>
            {/* className usado pelo Rnd: só dá pra arrastar pela barra de título. Duplo clique maximiza. */}
            <div
                className="janela-barra"
                onDoubleClick={() => !isMobile && setMaximizada(!maximizada)}
                style={{
                    padding: '8px 8px 8px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${cor.divisoria}`,
                    background: 'rgba(255,255,255,0.03)',
                    cursor: telaCheia ? 'default' : 'grab',
                    userSelect: 'none'
                }}
            >
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: fonte.sm,
                    fontWeight: fonte.semi,
                    color: ativa ? cor.texto : cor.textoSecundario
                }}>
                    {icone && <Icone icone={icone} tamanho={20} cor={corApp} ladrilho />}
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
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
                {children}
            </div>
        </div>
    );

    // CELULAR: janela ocupa a tela toda, acima do dock
    if (isMobile) {
        return (
            <div
                onMouseDown={onFocus}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: ALTURA_DOCK,
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
