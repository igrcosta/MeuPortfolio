import { useState } from 'react';
import { FaArrowRight, FaGlobeAmericas } from 'react-icons/fa';
import { sobre, habilidades } from '../data/sobre';
import { cor, fonte, espaco } from '../theme/tokens';
import { TelaApp, TituloSecao, Cartao, Etiqueta, Botao } from '../theme/ui';

export default function SobreMim() {

  //da lista de idiomas que definimos, escolhemos PT de padrão
  const [idioma, setIdioma] = useState('pt');

  const texto = sobre[idioma];

  const handleIdioma = () => {
    if (idioma === 'pt') {
      setIdioma('en');
    } else {
      setIdioma('pt');
    }
  }

  //por algum motivo de meu Deus, o JS só compara sem dar bug com === e eu sempre confundo com == 💀

  return (
    <TelaApp>

      {/* Botão de idioma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Botao onClick={handleIdioma}>
          <FaGlobeAmericas /> {texto.botaoIdioma}
        </Botao>
      </div>

      {/* Cabeçalho: foto + nome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: espaco[5], flexWrap: 'wrap', margin: `${espaco[2]} 0 ${espaco[6]}` }}>
        <img
          src="/images&Icons/Foto minha.jpeg"
          alt="Foto de Igor Costa"
          style={{
            width: '112px',
            height: '112px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: `3px solid ${cor.destaque}`,
            boxShadow: `0 0 40px ${cor.destaqueBrilho}`
          }}
        />
        <div>
          <span style={{ color: cor.textoSecundario, fontSize: fonte.sm }}>{texto.saudacao}</span>
          <h1 style={{ margin: '2px 0 4px', fontSize: fonte.xxl, fontWeight: fonte.negrito, letterSpacing: '-0.03em' }}>{texto.nome}</h1>
          <span style={{ color: cor.destaqueClaro, fontSize: fonte.md, fontWeight: fonte.medio }}>{texto.cargo}</span>
        </div>
      </div>

      {/* Parágrafos */}

      {texto.paragrafos.map((paragrafo, i) => (
        <p style={{ lineHeight: 1.7, fontSize: fonte.md, color: cor.textoSecundario, margin: `0 0 ${espaco[3]}` }}
          key={i}>{paragrafo}</p>
      ))}

      {/* Objetivos */}
      <TituloSecao>{texto.tituloInteresses}</TituloSecao>
      <Cartao>
        {texto.interesses.map((item, i) => (
          <div key={i} style={{
            padding: `${espaco[3]} ${espaco[4]}`,
            fontSize: fonte.sm,
            borderTop: i > 0 ? `1px solid ${cor.divisoria}` : 'none',
            display: 'flex',
            gap: espaco[3]
          }}>
            <span style={{ color: cor.destaqueClaro }}>✦</span> {item}
          </div>
        ))}
      </Cartao>

      {/* Meu lado Pessoal */}
      <TituloSecao>{texto.tituloMyself}</TituloSecao>
      <Cartao>
        {texto.myself.map((item, i) => (
          <div key={i} style={{
            padding: `${espaco[3]} ${espaco[4]}`,
            fontSize: fonte.sm,
            lineHeight: 1.55,
            borderTop: i > 0 ? `1px solid ${cor.divisoria}` : 'none'
          }}>
            {item.texto}
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                color: cor.destaqueClaro,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '6px',
                fontWeight: fonte.semi,
                textDecoration: 'none'
              }}>
                {item.textoLink} <FaArrowRight size={10} />
              </a>
            )}
          </div>
        ))}
      </Cartao>

      {/* Habilidades em "chips" */}
      <TituloSecao>{texto.tituloHabilidades}</TituloSecao>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: espaco[2], paddingBottom: espaco[2] }}>
        {habilidades.map((hab) => (
          <Etiqueta key={hab}>{hab}</Etiqueta>
        ))}
      </div>

    </TelaApp>
  );
}
