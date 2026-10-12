import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { experiencias } from '../data/experiencias';

// Cada seção da tela: título, ícone, cor e qual categoria ela filtra
const SECOES = [
  { categoria: 'profissional', titulo: 'Experiência Profissional', Icone: FaBriefcase, cor: '#fbbf24' },
  { categoria: 'formacao', titulo: 'Formação & Conquistas', Icone: FaGraduationCap, cor: '#38bdf8' }
];

function CardExperiencia({ exp, cor }) {
  return (
    <div style={{
      background: '#1f2937',
      border: '1px solid #374151',
      borderLeft: `4px solid ${cor}`,
      borderRadius: '10px',
      padding: '14px 16px',
      marginBottom: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px 12px' }}>
        <strong style={{ fontSize: '15px' }}>{exp.instituicao}</strong>
        <span style={{ fontSize: '12px', color: cor }}>{exp.periodo}</span>
      </div>
      <div style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 8px' }}>{exp.cargo}</div>
      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#cbd5e1' }}>{exp.descricao}</p>
    </div>
  );
}

export default function Experiencias() {
  return (
    <div style={{ background: '#111827', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '24px' }}>
      {/* Para cada seção, filtra só as experiências daquela categoria */}
      {SECOES.map(({ categoria, titulo, Icone, cor }) => (
        <section key={categoria} style={{ marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: cor, margin: '0 0 12px' }}>
            <Icone /> {titulo}
          </h3>
          {experiencias
            .filter((exp) => exp.categoria === categoria)
            .map((exp) => (
              <CardExperiencia key={exp.id} exp={exp} cor={cor} />
            ))}
        </section>
      ))}
    </div>
  );
}
