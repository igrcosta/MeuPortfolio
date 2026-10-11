import { useState } from 'react';
import { sobre, habilidades } from '../data/sobre';

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
    <div style={{ background: '#111827', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '24px' }}>

      {/* Botão de idioma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleIdioma}
          // TODO 4: ao clicar, troque o idioma: se for 'pt' vira 'en', se for 'en' vira 'pt'
          style={{
            background: '#1f2937',
            color: '#38bdf8',
            border: '1px solid #38bdf8',
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          {texto.botaoIdioma}
        </button>
      </div>

      {/* Cabeçalho: foto + nome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', margin: '12px 0 24px' }}>
        <img
          src="/images&Icons/Foto minha.jpeg"
          alt="Foto de Igor Costa"
          style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #38bdf8' }}
        />
        <div>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>{texto.saudacao}</span>
          <h1 style={{ margin: '2px 0', fontSize: '28px' }}>{texto.nome}</h1>
          <span style={{ color: '#38bdf8', fontSize: '15px' }}>{texto.cargo}</span>
        </div>
      </div>

      {/* Parágrafos */}

      {texto.paragrafos.map((paragrafo, i) => (
        <p style={{ lineHeight: 1.7, fontSize: '15px' }}
          key={i}>{paragrafo}</p>
      ))}

      {/* Objetivos */}
      <h3 style={{ color: '#38bdf8', marginTop: '24px' }}>{texto.tituloInteresses}</h3>
      <ul style={{ lineHeight: 1.7, fontSize: '14px', paddingLeft: '20px' }}>
        {texto.interesses.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Habilidades em "chips" */}
      <h3 style={{ color: '#38bdf8', marginTop: '24px' }}>{texto.tituloHabilidades}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {habilidades.map((hab) => (
          <span key={hab} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '14px', padding: '4px 12px', fontSize: '12px' }}>
            {hab}
          </span>
        ))}
      </div>

    </div>
  );
}
