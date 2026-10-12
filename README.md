# 🖥️ IgorOS — Portfólio Web OS 👨‍💻

> [!NOTE]
> Um portfólio profissional em formato de **sistema operacional web**: cada seção da minha trajetória é um "app" que abre em janelas arrastáveis, como num desktop de verdade.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        O <b>IgorOS</b> é o meu portfólio profissional, desenvolvido no <b>Laboratório 01 da disciplina DIAW</b> (Engenharia de Software — PUC Minas). Em vez de um currículo em PDF, o visitante "liga" um computador: passa por uma tela de <i>boot</i>, é recebido por um vídeo de boas-vindas e explora <i>Sobre Mim</i>, <i>Projetos</i>, <i>Experiências</i>, <i>Contato</i> e meus conteúdos em janelas que podem ser <b>arrastadas, redimensionadas e empilhadas</b>. O formato foi escolhido para unir as duas coisas que mais me definem: <b>desenvolvimento de software</b> e <b>criação de conteúdo</b>.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="docs/screenshots/01-boot.png" alt="Tela de boot do IgorOS" width="160px"/>
      </div>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.3-007ec6?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-007ec6?style=for-the-badge&logo=vite&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-9.5-007ec6?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/igrcosta/Portfolio-PROJECT?style=for-the-badge&logo=clockify)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Testes](#-testes)
- [Documentações utilizadas](#-documentações-utilizadas)
- [Autores](#-autores)
- [Agradecimentos](#-agradecimentos)
- [Licença](#-licença)

---

## 🔗 Links Úteis
* 🌐 **Site no ar:** [igor-portfolio-eight.vercel.app](https://igor-portfolio-eight.vercel.app/)
  > 💻 Hospedado gratuitamente na **Vercel**, com deploy automático a cada `push` na branch `main`.
* 🔗 **Links diretos para apps:** o parâmetro `?abrir=` abre apps específicos ao entrar no site. Ex.: [`?abrir=projetos`](https://igor-portfolio-eight.vercel.app/?abrir=projetos) ou [`?abrir=sobre,contato`](https://igor-portfolio-eight.vercel.app/?abrir=sobre,contato).

---

## 📝 Sobre o Projeto

- **Por que existe:** o laboratório pede um portfólio com Sobre Mim, Projetos, Experiências e Contato. Eu queria que ele também **mostrasse quem eu sou**: alguém que programa, edita vídeos e quer viver de criar conteúdo.
- **Qual problema resolve:** currículos em PDF são estáticos e iguais. Aqui o recrutador ou visitante **explora** a trajetória no próprio ritmo, assiste a vídeos, joga e entra em contato sem sair da página.
- **Contexto:** acadêmico (LAB01 — DIAW, PUC Minas) e profissional. O site é o portfólio que uso no dia a dia, divulgado nas redes e no YouTube.
- **Diferencial:** a interface de sistema operacional (boot, janelas, barra de tarefas) e os links `?abrir=` para divulgação.

---

## ✨ Funcionalidades Principais

- 🖥️ **Desktop com janelas:** janelas arrastáveis e redimensionáveis (`react-rnd`), com foco (a janela clicada vem para a frente) e barra de tarefas com relógio.
- 🚀 **Tela de boot + boas-vindas:** animação de inicialização (exibida uma vez por visita) e janela com vídeo de boas-vindas que abre sozinha.
- 👤 **Sobre Mim bilíngue (PT/EN):** apresentação, objetivos, extras com links e habilidades, com troca de idioma em um clique.
- 🗂️ **Projetos em linha do tempo:** do mais antigo ao mais recente, com descrição, tecnologias, link do GitHub e imagem/trailer, usando o `Timeline` da Material UI.
- 💼 **Experiências:** experiência profissional, formação e conquistas, com empresa/instituição, cargo, período e descrição.
- ✉️ **Contato:** ícones clicáveis (e-mail, WhatsApp, YouTube, GitHub, itch.io) e formulário com **validação** e **envio por e-mail** (EmailJS).
- 🎮 **Jogos:** launcher com os jogos que desenvolvi, com trailer e botão para jogar no navegador (itch.io). Reaproveita os dados da timeline, filtrando `tipo: 'jogo'`.
- 📜 **Certificados:** galeria de certificados com prévia e abertura do PDF.
- 🐙 **GitHub Stats:** repositórios, estrelas, seguidores, linguagens mais usadas e repositórios recentes, buscados em tempo real na **API pública do GitHub** (com cache por sessão).
- 📱 **Responsivo:** em telas menores que 768px as janelas abrem em tela cheia e a barra de tarefas mostra só os ícones.

### 🛣️ Roadmap

- [ ] App **YouTube** redesenhado, com curtidas salvas no **Supabase**
- [ ] **Contador de visitas** (Supabase)
- [ ] Widgets: **Spotify / Last.fm** (tocando agora) e **WakaTime**

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

* **Biblioteca:** React 19
* **Linguagem:** JavaScript (ES6+), JSX
* **Build Tool:** Vite 8
* **Componentes de UI:** Material UI 9 (`@mui/material`, `@mui/lab` — Timeline, Chip, TextField, Button, Snackbar)
* **Estilização:** estilos inline em objetos JS + tema escuro da Material UI (`ThemeProvider`)
* **Janelas:** `react-rnd` (arrastar e redimensionar)
* **Ícones:** `react-icons`
* **Gerenciamento de estado:** `useState` / `useEffect` / `useCallback` do React (estado local, sem bibliotecas externas)

### 🖥️ Serviços (back-end como serviço)

* **E-mail:** EmailJS (`@emailjs/browser`) — envio do formulário de contato direto do front-end
* **Vídeos:** YouTube (embeds)
* **Dados do GitHub:** API REST pública do GitHub (`fetch`, sem token)

### ⚙️ Infraestrutura

* **Cloud / Hospedagem:** Vercel (deploy contínuo a partir do GitHub)
* **Qualidade de código:** ESLint

### 📦 Dependências

| Pacote | Versão | Uso |
| :--- | :--- | :--- |
| `react` / `react-dom` | 19.3 | Biblioteca de interface |
| `react-rnd` | 10.5 | Janelas arrastáveis e redimensionáveis |
| `@mui/material` | 9.5 | Componentes de UI e tema |
| `@mui/lab` | 9.0 (beta) | Componente `Timeline` |
| `@emotion/react` / `@emotion/styled` | 11.14 | Motor de estilos da Material UI |
| `@emailjs/browser` | 5.0 | Envio de e-mail do formulário |
| `react-icons` | 5.7 | Ícones |
| `@supabase/supabase-js` | 2.117 | Banco de dados (em integração — ver roadmap) |
| `vite` | 8.3 | Servidor de desenvolvimento e build (dev) |
| `eslint` | 10 | Análise estática de código (dev) |

---

## 🏗 Arquitetura

O projeto é uma **SPA (Single Page Application)** em React, sem rotas: toda a navegação acontece por **janelas**. A arquitetura separa **o sistema operacional** (janelas, ícones, barra de tarefas), **os apps** (cada seção do portfólio) e **os dados** (conteúdo em arquivos `.js`).

- **`App.jsx` — o "kernel":** contém a **lista de apps** (uma única fonte de verdade que gera ícones, botões da barra de tarefas e janelas) e o estado `janelasAbertas`, uma lista de ids em que **a ordem define quem fica na frente** (`zIndex = 10 + posição`).
- **`components/`:** peças reutilizáveis do OS. `Janela` recebe `titulo`, `onClose` e `children` (o app), e decide se renderiza como janela arrastável (PC) ou tela cheia (celular).
- **`apps/`:** cada seção do portfólio é um componente independente.
- **`data/`:** o conteúdo fica separado do código. Para adicionar um projeto, experiência ou certificado, basta editar o arquivo de dados — a interface se atualiza sozinha com `.map()`, `.filter()` e `.sort()`.

```mermaid
flowchart TD
    V[Visitante] -->|acessa| VERCEL[Vercel - CDN]
    VERCEL --> APP[App.jsx<br/>lista de apps + janelasAbertas]
    APP --> BOOT[BootScreen]
    APP --> DESK[IconeDesktop]
    APP --> TASK[Taskbar]
    APP --> JAN[Janela<br/>react-rnd]
    JAN --> APPS[Apps: Sobre Mim, Projetos,<br/>Experiências, Contato, ...]
    APPS --> DATA[(data/*.js<br/>conteúdo)]
    APPS -->|formulário| EMAILJS[EmailJS]
    APPS -->|embed| YT[YouTube]
    APPS -->|fetch| GH[API do GitHub]
```

**Decisões e trade-offs:**
- **Estilos inline** deixam cada componente com o próprio visual; o custo é alguma repetição. A **Material UI** foi usada onde ela agrega mais (timeline e formulário com validação).
- **EmailJS** envia e-mails sem servidor próprio; as chaves usadas são **públicas** por design.
- **Datas no formato `AAAA-MM`** permitem ordenar a timeline com uma simples comparação de texto.
- **Sem roteador:** links compartilháveis são feitos com o parâmetro `?abrir=` (lido com `URLSearchParams`).

---

## 🔧 Instalação e Execução

### Pré-requisitos

* **Node.js:** versão LTS (v20 ou superior)
* **Gerenciador de pacotes:** npm

### 🔑 Variáveis de Ambiente

Crie o arquivo **`meu-portfolio-os/.env`** a partir do exemplo (`meu-portfolio-os/.env.example`):

| Variável | Descrição | Onde encontrar |
| :--- | :--- | :--- |
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço de e-mail | EmailJS → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template (usa `{{name}}`, `{{email}}`, `{{message}}`) | EmailJS → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública da conta | EmailJS → Account → General |

> **Obs:** em projetos **Vite**, as variáveis precisam começar com `VITE_` para ficarem disponíveis no front-end. Sem elas o site funciona normalmente, apenas o envio do formulário fica desativado.

### 📦 Instalação de Dependências

```bash
git clone https://github.com/igrcosta/Portfolio-PROJECT.git
cd Portfolio-PROJECT/meu-portfolio-os
npm install
```

### ⚡ Como Executar a Aplicação

```bash
npm run dev       # servidor de desenvolvimento
```
🎨 *Disponível em **http://localhost:5173**.*

Outros scripts:

```bash
npm run build     # gera a versão de produção em /dist
npm run preview   # serve a versão de produção localmente
npm run lint      # verifica o código com o ESLint
```

---

## 🚀 Deploy

O site é hospedado na **Vercel**, conectada a este repositório:

1. **Add New → Project** na Vercel e importar o repositório `Portfolio-PROJECT`.
2. **Root Directory:** `meu-portfolio-os` (o projeto fica nessa subpasta).
3. **Framework Preset:** Vite (detectado automaticamente) — build `npm run build`, saída `dist`.
4. **Environment Variables:** cadastrar as três variáveis `VITE_EMAILJS_*`.
5. A cada `git push` na `main`, a Vercel faz um novo deploy automaticamente.

---

## 📂 Estrutura de Pastas

```
.
├── README.md                      # 📘 Esta documentação
├── docs/screenshots/              # 🖼️ Prints usados no README
└── meu-portfolio-os/              # 📁 Aplicação React (Vite)
    ├── .env.example               # 🧩 Variáveis de ambiente necessárias (sem valores)
    ├── index.html                 # 📄 HTML base
    ├── package.json               # 📦 Dependências e scripts
    ├── public/                    # 📂 Arquivos estáticos
    │   ├── certificates/          # 📜 PDFs e prévias dos certificados
    │   ├── images&Icons/          # 🖼️ Foto e ícones dos apps
    │   └── projetos/              # 🖼️ Prints dos projetos da timeline
    └── src/
        ├── main.jsx               # 🚪 Ponto de entrada + tema da Material UI
        ├── App.jsx                # 🧠 Lista de apps e controle das janelas
        ├── index.css              # 🎨 Reset global
        ├── components/            # 🧱 Peças do OS: Janela, Taskbar, IconeDesktop, Icone, BootScreen
        ├── apps/                  # 🪟 Um componente por app: SobreMim, Projetos, Experiencias, Contato...
        ├── data/                  # 🗃️ Conteúdo: sobre, projetos, experiencias, contato, certificados...
        └── hooks/                 # 🎣 useIsMobile (detecta tela de celular)
```

---

## 🎥 Demonstração

### 🌐 Aplicação Web

| Tela | Captura de Tela |
| :---: | :---: |
| **Boot** | **Desktop + Boas-vindas** |
| <img src="docs/screenshots/01-boot.png" alt="Tela de boot" width="400px"> | <img src="docs/screenshots/02-desktop.png" alt="Desktop com a janela de boas-vindas" width="400px"> |
| **Sobre Mim (PT/EN)** | **Projetos (timeline)** |
| <img src="docs/screenshots/03-sobre-mim.png" alt="App Sobre Mim" width="400px"> | <img src="docs/screenshots/04-projetos.png" alt="App Projetos" width="400px"> |
| **Experiências** | **Contato** |
| <img src="docs/screenshots/05-experiencias.png" alt="App Experiências" width="400px"> | <img src="docs/screenshots/06-contato.png" alt="App Contato" width="400px"> |

### 📱 Versão Mobile

<img src="docs/screenshots/07-mobile.png" alt="Timeline de projetos no celular" height="450px">

---

## 🧪 Testes

O projeto não possui testes automatizados. A qualidade é verificada com:

* **Análise estática:** `npm run lint` (ESLint, regras de React Hooks).
* **Build de produção:** `npm run build` sem erros.
* **Testes manuais:** abrir, focar, arrastar e fechar janelas; troca de idioma; ordenação da timeline; validação e envio do formulário; layout em 375px (DevTools) e no celular.

---

## 🔗 Documentações utilizadas

* 📖 [Documentação oficial do **React**](https://react.dev/reference/react)
* 📖 [Guia de configuração do **Vite**](https://vitejs.dev/config/)
* 📖 [**Material UI** — Timeline](https://mui.com/material-ui/react-timeline/) e [componentes](https://mui.com/material-ui/)
* 📖 [**react-rnd**](https://github.com/bokuweb/react-rnd)
* 📖 [**EmailJS** — SDK para navegador](https://www.emailjs.com/docs/sdk/installation/)
* 📖 [**Vercel** — deploy de projetos Vite](https://vercel.com/docs/frameworks/vite)
* 📖 Repositório de referência: [joaopauloaramuni-portfolio](https://github.com/joaopauloaramuni/joaopauloaramuni-portfolio)

---

## 👥 Autores

| 👤 Nome | 🖼️ Foto | :octocat: GitHub | 📺 YouTube | 📤 Gmail |
|---------|----------|-----------------|-------------|-----------|
| Igor Costa | <div align="center"><img src="meu-portfolio-os/public/images&Icons/Foto%20minha.jpeg" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/igrcosta"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.youtube.com/@Oigorxz">@Oigorxz</a></div> | <div align="center"><a href="mailto:igorcosta250705@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |

---

## 🙏 Agradecimentos

* [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/) — pelo apoio institucional e estrutura acadêmica.
* [**Prof. Dr. João Paulo Aramuni**](https://github.com/joaopauloaramuni) — pela proposta do laboratório, pelo template deste README e pelo portfólio de referência.

---

## 📄 Licença

Este projeto é distribuído sob a **[Licença MIT](LICENSE)**.

---
