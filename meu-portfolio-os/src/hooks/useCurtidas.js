import { useEffect, useState } from 'react';
import { supabase, idDoVisitante } from '../lib/supabase';

// Curtidas de um vídeo, salvas no Supabase.
// Devolve { disponivel, total, curtido, alternar }. Sem Supabase configurado, disponivel = false.
export default function useCurtidas(videoId) {
  const [total, setTotal] = useState(0);
  const [curtido, setCurtido] = useState(false);

  // Sempre que o vídeo muda, busca o total e se este visitante já curtiu
  useEffect(() => {
    if (!supabase || !videoId) return;
    let ativo = true; // evita atualizar o estado se o vídeo trocar antes da resposta chegar
    supabase
      .rpc('ver_curtidas', { p_video: videoId, p_visitante: idDoVisitante() })
      .then(({ data, error }) => {
        if (!ativo || error || !data?.[0]) return;
        setTotal(Number(data[0].total));
        setCurtido(!!data[0].curtido);
      });
    return () => {
      ativo = false;
    };
  }, [videoId]);

  const alternar = async () => {
    if (!supabase) return;
    // Atualização otimista: muda na tela na hora e depois confirma com o banco
    setCurtido(!curtido);
    setTotal(total + (curtido ? -1 : 1));
    const { data, error } = await supabase.rpc('alternar_curtida', { p_video: videoId, p_visitante: idDoVisitante() });
    if (!error && data?.[0]) {
      setTotal(Number(data[0].total));
      setCurtido(!!data[0].curtido);
    }
  };

  return { disponivel: !!supabase, total, curtido, alternar };
}
