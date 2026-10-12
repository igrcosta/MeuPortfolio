import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { experiencias } from '../data/experiencias';
import { cor, raio, fonte, espaco } from '../theme/tokens';
import { TelaApp, TituloApp, TituloSecao, Cartao } from '../theme/ui';

// Cada seção da tela: título, ícone, cor do ladrilho e qual categoria ela filtra
const SECOES = [
  { categoria: 'profissional', titulo: 'Experiência profissional', Icone: FaBriefcase, corIcone: cor.laranja },
  { categoria: 'formacao', titulo: 'Formação & conquistas', Icone: FaGraduationCap, corIcone: cor.azul }
];

// Uma linha da lista (estilo Ajustes do iPhone): ícone colorido + textos + período
function ItemExperiencia({ exp, Icone, corIcone, primeiro }) {
  return (
    <div style={{
      display: 'flex',
      gap: espaco[4],
      padding: espaco[4],
      borderTop: primeiro ? 'none' : `1px solid ${cor.divisoria}`
    }}>
      <span style={{
        width: '36px',
        height: '36px',
        flexShrink: 0,
        borderRadius: raio.md,
        background: `linear-gradient(145deg, ${corIcone}, ${corIcone}B3)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icone color="#fff" size={16} />
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: `${espaco[1]} ${espaco[3]}` }}>
          <strong style={{ fontSize: fonte.md, fontWeight: fonte.semi }}>{exp.instituicao}</strong>
          <span style={{ fontSize: fonte.xs, color: cor.textoTerciario, fontWeight: fonte.medio }}>{exp.periodo}</span>
        </div>
        <div style={{ fontSize: fonte.sm, color: cor.roxoClaro, margin: `2px 0 ${espaco[2]}` }}>{exp.cargo}</div>
        <p style={{ margin: 0, fontSize: fonte.sm, lineHeight: 1.6, color: cor.textoSecundario }}>{exp.descricao}</p>
      </div>
    </div>
  );
}

export default function Experiencias() {
  return (
    <TelaApp>
      <TituloApp titulo="Experiências" subtitulo="Onde trabalhei, estudei e o que conquistei pelo caminho." />

      {/* Para cada seção, filtra só as experiências daquela categoria */}
      {SECOES.map(({ categoria, titulo, Icone, corIcone }) => (
        <section key={categoria}>
          <TituloSecao>{titulo}</TituloSecao>
          <Cartao>
            {experiencias
              .filter((exp) => exp.categoria === categoria)
              .map((exp, i) => (
                <ItemExperiencia key={exp.id} exp={exp} Icone={Icone} corIcone={corIcone} primeiro={i === 0} />
              ))}
          </Cartao>
        </section>
      ))}
    </TelaApp>
  );
}
