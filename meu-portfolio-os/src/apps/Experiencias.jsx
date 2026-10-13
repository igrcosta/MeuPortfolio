import { FaBriefcase, FaGraduationCap, FaQuoteLeft } from 'react-icons/fa';
import { experiencias, depoimentos } from '../data/experiencias';
import Icone from '../components/Icone';
import { cor, fonte, espaco } from '../theme/tokens';
import { TelaApp, TituloApp, TituloSecao, Cartao } from '../theme/ui';

// Cada seção da tela: título, ícone e qual categoria ela filtra
const SECOES = [
  { categoria: 'profissional', titulo: 'Experiência profissional', IconeSecao: FaBriefcase },
  { categoria: 'formacao', titulo: 'Formação & conquistas', IconeSecao: FaGraduationCap }
];

// Uma linha da lista (estilo Ajustes do iPhone): ícone-ladrilho + textos + período
function ItemExperiencia({ exp, IconeSecao, primeiro }) {
  return (
    <div style={{
      display: 'flex',
      gap: espaco[4],
      padding: espaco[4],
      borderTop: primeiro ? 'none' : `1px solid ${cor.divisoria}`
    }}>
      <Icone icone={IconeSecao} tamanho={36} ladrilho />

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

// Cartão de depoimento: aspas, texto e quem escreveu
function Depoimento({ dep }) {
  return (
    <Cartao destaque style={{ padding: espaco[5], marginBottom: espaco[3] }}>
      <FaQuoteLeft color={cor.roxoClaro} size={18} />
      <p style={{ margin: `${espaco[3]} 0 ${espaco[4]}`, fontSize: fonte.md, lineHeight: 1.7, color: cor.texto, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
        {dep.texto}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: espaco[3] }}>
        {dep.foto ? (
          <img src={dep.foto} alt={dep.nome} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <span style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: cor.roxoSuave,
            border: `1px solid ${cor.roxoBorda}`,
            color: cor.roxoClaro,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: fonte.negrito
          }}>
            {dep.nome.charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <div style={{ fontSize: fonte.sm, fontWeight: fonte.semi }}>{dep.nome}</div>
          <div style={{ fontSize: fonte.xs, color: cor.textoSecundario }}>{dep.cargo} · {dep.empresa}</div>
        </div>
      </div>
    </Cartao>
  );
}

export default function Experiencias() {
  // Só mostra depoimentos que já têm texto
  const depoimentosPublicados = depoimentos.filter((dep) => dep.texto.trim());

  return (
    <TelaApp>
      <TituloApp titulo="Experiências" subtitulo="Onde trabalhei, estudei e o que conquistei pelo caminho." />

      {/* Para cada seção, filtra só as experiências daquela categoria */}
      {SECOES.map(({ categoria, titulo, IconeSecao }) => (
        <section key={categoria}>
          <TituloSecao>{titulo}</TituloSecao>
          <Cartao>
            {experiencias
              .filter((exp) => exp.categoria === categoria)
              .map((exp, i) => (
                <ItemExperiencia key={exp.id} exp={exp} IconeSecao={IconeSecao} primeiro={i === 0} />
              ))}
          </Cartao>
        </section>
      ))}

      {/* Depoimentos: a seção só aparece quando existe pelo menos um com texto */}
      {depoimentosPublicados.length > 0 && (
        <section>
          <TituloSecao>O que dizem sobre mim</TituloSecao>
          {depoimentosPublicados.map((dep) => (
            <Depoimento key={dep.id} dep={dep} />
          ))}
        </section>
      )}
    </TelaApp>
  );
}
