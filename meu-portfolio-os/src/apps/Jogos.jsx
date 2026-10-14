import { FaGamepad, FaGithub, FaPlay } from 'react-icons/fa';
import { projetos } from '../data/projetos';
import { cor, fonte, espaco } from '../theme/tokens';
import { TelaApp, TituloApp, Cartao, Etiqueta, Botao } from '../theme/ui';

// Mesma lista do app Projetos, mas só os itens com tipo 'jogo' (do mais recente pro mais antigo)
const jogos = projetos
  .filter((projeto) => projeto.tipo === 'jogo')
  .sort((a, b) => b.data.localeCompare(a.data));

export default function Jogos() {
  return (
    <TelaApp>
      <TituloApp Icone={FaGamepad} titulo="Jogos" subtitulo="Jogos que desenvolvi na faculdade de Jogos Digitais." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: espaco[4] }}>
        {jogos.map((jogo) => (
          <Cartao key={jogo.id}>

            {/* Trailer (se tiver) ou capa provisória */}
            {jogo.video ? (
              <div style={{ aspectRatio: '16/9', background: '#000' }}>
                <iframe
                  src={jogo.video}
                  title={`Trailer de ${jogo.nome}`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', display: 'block' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={{
                aspectRatio: '16/9',
                background: `radial-gradient(ellipse at 30% 0%, ${cor.destaqueBrilho}, transparent 70%), ${cor.pretoProfundo}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fonte.xl,
                fontWeight: fonte.negrito,
                letterSpacing: '-0.02em'
              }}>
                {jogo.nome}
              </div>
            )}

            <div style={{ padding: espaco[4] }}>
              <h3 style={{ margin: `0 0 ${espaco[1]}`, fontSize: fonte.md, fontWeight: fonte.semi }}>{jogo.nome}</h3>
              <p style={{ margin: `0 0 ${espaco[3]}`, fontSize: fonte.sm, lineHeight: 1.55, color: cor.textoSecundario }}>{jogo.descricao}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: espaco[4] }}>
                {jogo.tecnologias.map((tec) => (
                  <Etiqueta key={tec}>{tec}</Etiqueta>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: espaco[2] }}>
                {jogo.link && (
                  <Botao href={jogo.link} variante="primario"><FaPlay size={10} /> Jogar</Botao>
                )}
                <Botao href={jogo.github}><FaGithub /> Código</Botao>
              </div>
            </div>
          </Cartao>
        ))}
      </div>
    </TelaApp>
  );
}
