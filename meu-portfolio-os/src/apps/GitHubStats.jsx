import { useEffect, useState } from 'react';
import { FaGithub, FaStar, FaBook, FaUsers } from 'react-icons/fa';
import { cor, vidro, raio, fonte } from '../theme/tokens';
import { TituloSecao } from '../theme/ui';

const USUARIO = 'igrcosta';
const CHAVE_CACHE = 'githubStats';

// Busca perfil + repositórios na API pública do GitHub (sem token: até 60 consultas/hora por visitante).
// Guarda o resultado no sessionStorage para não gastar consultas toda vez que a janela abre.
async function buscarDados() {
  try {
    const cache = sessionStorage.getItem(CHAVE_CACHE);
    if (cache) return JSON.parse(cache);
  } catch {
    // sem sessionStorage: segue sem cache
  }

  const [respPerfil, respRepos] = await Promise.all([
    fetch(`https://api.github.com/users/${USUARIO}`),
    fetch(`https://api.github.com/users/${USUARIO}/repos?per_page=100&sort=pushed`)
  ]);
  if (!respPerfil.ok || !respRepos.ok) throw new Error('Falha na API do GitHub');

  const perfil = await respPerfil.json();
  const repos = await respRepos.json();

  // Conta quantos repositórios usam cada linguagem principal
  const contagem = {};
  repos.forEach((repo) => {
    if (repo.language) contagem[repo.language] = (contagem[repo.language] || 0) + 1;
  });
  const linguagens = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const dados = {
    avatar: perfil.avatar_url,
    nome: perfil.name || perfil.login,
    repos: perfil.public_repos,
    seguidores: perfil.followers,
    estrelas: repos.reduce((soma, repo) => soma + repo.stargazers_count, 0),
    linguagens,
    recentes: repos.filter((repo) => !repo.fork).slice(0, 5).map((repo) => ({
      nome: repo.name,
      url: repo.html_url,
      linguagem: repo.language,
      atualizado: repo.pushed_at
    }))
  };

  try {
    sessionStorage.setItem(CHAVE_CACHE, JSON.stringify(dados));
  } catch {
    // sem sessionStorage: tudo bem
  }
  return dados;
}

const CORES = [cor.roxo, cor.roxoClaro, cor.roxoEscuro, cor.indigo, cor.azul, cor.verde];

function Numero({ Icone, valor, rotulo }) {
  return (
    <div style={{ flex: '1 1 110px', ...vidro.cartao, borderRadius: raio.lg, padding: '16px', textAlign: 'center' }}>
      <Icone color={cor.roxoClaro} />
      <div style={{ fontSize: fonte.xl, fontWeight: fonte.negrito, letterSpacing: '-0.02em', margin: '4px 0 0' }}>{valor}</div>
      <div style={{ fontSize: '11px', color: cor.textoSecundario }}>{rotulo}</div>
    </div>
  );
}

export default function GitHubStats() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);

  // Busca os dados uma vez, quando a janela abre
  useEffect(() => {
    buscarDados().then(setDados).catch(() => setErro(true));
  }, []);

  const estilo = { color: cor.texto, fontFamily: fonte.familia, height: '100%', overflowY: 'auto', padding: '24px' };

  if (erro) {
    return (
      <div style={estilo}>
        <p>Não consegui falar com o GitHub agora 😕</p>
        <a href={`https://github.com/${USUARIO}`} target="_blank" rel="noopener noreferrer" style={{ color: cor.roxoClaro }}>
          Ver meu perfil direto no GitHub
        </a>
      </div>
    );
  }

  if (!dados) {
    return <div style={estilo}>Carregando dados do GitHub...</div>;
  }

  const totalLinguagens = dados.linguagens.reduce((soma, [, qtd]) => soma + qtd, 0);

  return (
    <div style={estilo}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
        <img src={dados.avatar} alt="" style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '17px' }}>{dados.nome}</div>
          <a href={`https://github.com/${USUARIO}`} target="_blank" rel="noopener noreferrer" style={{ color: cor.roxoClaro, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaGithub /> github.com/{USUARIO}
          </a>
        </div>
      </div>

      {/* Números */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <Numero Icone={FaBook} valor={dados.repos} rotulo="repositórios" />
        <Numero Icone={FaStar} valor={dados.estrelas} rotulo="estrelas" />
        <Numero Icone={FaUsers} valor={dados.seguidores} rotulo="seguidores" />
      </div>

      {/* Barra de linguagens */}
      <TituloSecao>Linguagens mais usadas</TituloSecao>
      <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '8px' }}>
        {dados.linguagens.map(([nome, qtd], i) => (
          <div key={nome} style={{ width: `${(qtd / totalLinguagens) * 100}%`, background: CORES[i] }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '12px', marginBottom: '20px' }}>
        {dados.linguagens.map(([nome, qtd], i) => (
          <span key={nome} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: CORES[i] }} />
            {nome} <span style={{ color: cor.textoTerciario }}>({qtd})</span>
          </span>
        ))}
      </div>

      {/* Repositórios recentes */}
      <TituloSecao>Mexi recentemente em</TituloSecao>
      {dados.recentes.map((repo) => (
        <a key={repo.nome} href={repo.url} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '8px 10px',
          borderBottom: `1px solid ${cor.divisoria}`,
          color: cor.texto,
          textDecoration: 'none',
          fontSize: '13px'
        }}>
          <span>{repo.nome}</span>
          <span style={{ color: cor.textoTerciario, whiteSpace: 'nowrap' }}>
            {repo.linguagem || '—'} · {new Date(repo.atualizado).toLocaleDateString('pt-BR')}
          </span>
        </a>
      ))}
    </div>
  );
}
