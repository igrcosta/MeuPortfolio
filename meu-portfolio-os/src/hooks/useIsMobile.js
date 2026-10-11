import { useEffect, useState } from 'react';

// Hook: devolve true quando a tela é menor que o limite (padrão 768px).
// Usado para abrir as janelas em tela cheia no celular, sem arrastar.
export default function useIsMobile(limite = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < limite);

  useEffect(() => {
    // Toda vez que a janela do navegador muda de tamanho, recalcula
    const aoRedimensionar = () => setIsMobile(window.innerWidth < limite);
    window.addEventListener('resize', aoRedimensionar);

    // Limpeza: remove o "ouvinte" quando o componente sai da tela
    return () => window.removeEventListener('resize', aoRedimensionar);
  }, [limite]);

  return isMobile;
}
