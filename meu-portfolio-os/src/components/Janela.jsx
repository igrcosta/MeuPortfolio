import { Rnd } from 'react-rnd';

export default function Janela({ titulo, onClose, children }) {
    return (
        <Rnd default={{ x: 100, y: 100, width: 1000, height: 700 }} bounds="parent">
            <div style={{
                background: '#0f0f0f',
                color: '#fff',
                height: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                border: '1px solid #272727'
            }}>
                <div style={{
                    background: '#1f1f1f',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #333'
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

                {/* Conteúdo da Aplicação do YouTube */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {children}
                </div>

            </div>
        </Rnd >
    );
}