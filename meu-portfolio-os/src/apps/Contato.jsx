import { useState } from 'react';
import emailjs from '@emailjs/browser';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { redes } from '../data/contato';

// Chaves do EmailJS: vêm do arquivo .env (veja o .env.example).
// São chaves PÚBLICAS, feitas para ficar no navegador.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const FORM_VAZIO = { nome: '', email: '', mensagem: '' };

// Validações básicas: devolve um objeto { campo: 'mensagem de erro' }
function validar(form) {
  const erros = {};
  if (form.nome.trim().length < 2) erros.nome = 'Digite seu nome';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) erros.email = 'Digite um e-mail válido';
  if (form.mensagem.trim().length < 10) erros.mensagem = 'A mensagem precisa ter pelo menos 10 caracteres';
  return erros;
}

export default function Contato() {
  const [form, setForm] = useState(FORM_VAZIO);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState(null); // { tipo: 'success' | 'error', texto }

  // Um único handler para os 3 campos: usa o "name" do input para saber qual atualizar
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novosErros = validar(form);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setAviso({ tipo: 'error', texto: 'Envio ainda não configurado. Use os ícones acima!' });
      return;
    }

    setEnviando(true);
    try {
      // Os nomes name/email/message precisam ser iguais às variáveis do template no EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: form.nome, email: form.email, message: form.mensagem },
        { publicKey: PUBLIC_KEY }
      );
      setAviso({ tipo: 'success', texto: 'Mensagem enviada! Respondo em breve 🚀' });
      setForm(FORM_VAZIO);
    } catch {
      setAviso({ tipo: 'error', texto: 'Não consegui enviar. Tente pelos ícones acima.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ background: '#111827', color: '#e2e8f0', height: '100%', overflowY: 'auto', padding: '24px' }}>
      <h2 style={{ margin: '0 0 4px' }}>Vamos conversar?</h2>
      <p style={{ margin: '0 0 20px', color: '#94a3b8', fontSize: '14px' }}>
        Me chame por qualquer canal abaixo ou mande uma mensagem pelo formulário.
      </p>

      {/* Ícones clicáveis (itens sem link ficam de fora) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
        {redes
          .filter((rede) => rede.link)
          .map(({ nome, Icone, cor, link }) => (
            <a
              key={nome}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title={nome}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                width: '76px',
                padding: '12px 4px',
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '11px'
              }}
            >
              <Icone size={26} color={cor} />
              {nome}
            </a>
          ))}
      </div>

      {/* Formulário (componentes da Material UI) */}
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          error={!!erros.nome}
          helperText={erros.nome}
          size="small"
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={!!erros.email}
          helperText={erros.email}
          size="small"
        />
        <TextField
          label="Mensagem"
          name="mensagem"
          value={form.mensagem}
          onChange={handleChange}
          error={!!erros.mensagem}
          helperText={erros.mensagem}
          multiline
          minRows={4}
        />
        <Button type="submit" variant="contained" disabled={enviando} sx={{ alignSelf: 'flex-start' }}>
          {enviando ? 'Enviando...' : 'Enviar mensagem'}
        </Button>
      </form>

      {/* Aviso de sucesso/erro que aparece embaixo e some sozinho */}
      <Snackbar
        open={!!aviso}
        autoHideDuration={5000}
        onClose={() => setAviso(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: '64px !important' }}
      >
        {aviso ? (
          <Alert severity={aviso.tipo} variant="filled" onClose={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        ) : undefined}
      </Snackbar>
    </div>
  );
}
