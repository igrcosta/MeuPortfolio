import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Contador de visitas (Supabase): soma 1 na primeira abertura da sessão e só consulta nas próximas.
// Devolve o total, ou null enquanto carrega / se o Supabase não estiver configurado.
export default function useVisitas() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    let jaContou = false;
    try {
      jaContou = !!sessionStorage.getItem('visitaContada');
      // Marca ANTES de chamar o banco: no modo dev o React roda o efeito 2x e contaria em dobro
      sessionStorage.setItem('visitaContada', 'sim');
    } catch {
      // sem sessionStorage: conta normalmente
    }

    supabase.rpc(jaContou ? 'ver_visitas' : 'registrar_visita').then(({ data, error }) => {
      if (!error && data != null) setTotal(Number(data));
    });
  }, []);

  return total;
}
