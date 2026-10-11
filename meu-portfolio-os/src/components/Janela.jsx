import { Rnd } from 'react-rnd';

// Altura da Taskbar, para a janela não ficar por baixo dela
const ALTURA_TASKBAR = 48;

export default function Janela({
    titulo,
    onClose,
    children,
    zIndex,                                   // quem tem o maior fica na frente
    onFocus,                                  // chamado ao clicar na janela (traz pra frente)
    isMobile = false,                         // no celular: tela cheia, sem arrastar
    tamanho = { width: 800, height: 600 },    // tamanho inicial no PC
    posicao = { x: 100, y: 60 }               // posição inicial no PC
}) {

    // A moldura e a barra são as mesmas no PC e no celular
    const moldura = (
        <div style={{
            background: '#0f0f0f',
            color: '#fff',
            height: '100%',
            borderRadius: isMobile ? 0 : '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            border: '1px solid #272727'
        }}>
            {/* className usado pelo Rnd: só dá pra arrastar pela barra de título */}
            <div className="janela-barra" style={{
                background: '#1f1f1f',
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #333',
                cursor: isMobile ? 'default' : 'move'
            }}>

                <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#e2e8f0' }}>{titulo}</span>
                <button
                    onClick={onClose}
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
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: ALTURA_TASKBAR, zIndex }}
            >
                {moldura}
            </div>
        );
    }

    // PC: janela arrastável e redimensionável.
    // Math.min garante que a janela nunca nasce maior que a tela.
    return (
        <Rnd
            default={{
                x: posicao.x,
                y: posicao.y,
                width: Math.min(tamanho.width, window.innerWidth - 40),
                height: Math.min(tamanho.height, window.innerHeight - ALTURA_TASKBAR - posicao.y - 10)
            }}
            minWidth={320}
            minHeight={240}
            bounds="parent"
            dragHandleClassName="janela-barra"
            onMouseDown={onFocus}
            style={{ zIndex }}
        >
            {moldura}
        </Rnd>
    );
}
