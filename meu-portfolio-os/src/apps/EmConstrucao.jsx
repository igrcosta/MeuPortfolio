// Tela provisória para apps que ainda vão ser construídos
export default function EmConstrucao({ nome }) {
  return (
    <div style={{
      background: '#1e293b',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      color: '#94a3b8',
      textAlign: 'center',
      padding: '20px'
    }}>
      <span style={{ fontSize: '40px' }}>🚧</span>
      <strong style={{ color: '#e2e8f0' }}>{nome}</strong>
      <span style={{ fontSize: '13px' }}>Em construção...</span>
    </div>
  );
}
