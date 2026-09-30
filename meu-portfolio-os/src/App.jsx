// Importa a função de estado 'useState' do coração do React
import { useState } from 'react';

// Importa o componente 'Rnd' da biblioteca externa 'react-rnd' que faz a mágica de arrastar/redimensionar
import { Rnd } from 'react-rnd';

// Define a função principal da tela. O 'export default' permite que o React execute este componente
export default function App() {

  // Cria a memória da tela:
  // 'janelaAberta' guarda o valor (true ou false)
  // 'setJanelaAberta' é a ÚNICA função que pode alterar esse valor
  // 'useState(false)' define que a janela começa FECHADA (false)
  const [janelaAberta, setJanelaAberta] = useState(false);

  // O 'return' entrega pro navegador tudo o que deve ser desenhado visualmente na tela
  return (

    // Div principal que serve de "Área de Trabalho" (Desktop)
    // style={{ ... }} passa propriedades de CSS em formato de objeto JavaScript
    // width: '100vw' = 100% da largura da tela | height: '100vh' = 100% da altura da tela
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0f172a' }}>
      
      {/* Botão que simula o Ícone do App */}
      {/* onClick={() => setJanelaAberta(true)} diz: ao clicar, chame a função e mude 'janelaAberta' para true */}
      <button onClick={() => setJanelaAberta(true)}>
        Abrir YouTube
      </button>

      {/* RENDERIZAÇÃO CONDICIONAL: O operador '&&' (E lógico) funciona como um "Se... então..." */}
      {/* Se 'janelaAberta' for true, o React executa e desenha o que está dentro dos parênteses () */}
      {janelaAberta && (

        // Componente do react-rnd que cria a caixa com física de drag-and-drop
        // 'default' define a posição inicial (x:100, y:100) e o tamanho inicial em pixels
        // 'bounds="parent"' impede que a janela seja arrastada para fora da div pai (a tela escura)
        <Rnd
          default={{ x: 100, y: 100, width: 400, height: 300 }}
          bounds="parent"
        >
          {/* Div interna para dar a cor escura, texto branco e padding para o conteúdo da janela */}
          <div style={{ background: '#1e293b', color: '#fff', height: '100%', padding: '10px' }}>
            
            {/* Botão de Fechar 'X' */}
            {/* Ao clicar, chama setJanelaAberta(false). O React percebe que mudou pra false e APAGA a janela da tela */}
            <button onClick={() => setJanelaAberta(false)}>X</button>
            
            {/* Texto simples exibido dentro da janela */}
            <p>Minha primeira janela interativa!</p>
          </div>
        </Rnd>
      )}

    </div>
  );
}