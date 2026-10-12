import { createClient } from '@supabase/supabase-js';

// Cliente do Supabase. Se as variáveis não estiverem configuradas, fica null
// e os recursos que dependem do banco (curtidas, visitas) simplesmente não aparecem.
const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && chave ? createClient(url, chave) : null;

// Id anônimo do visitante, guardado no navegador (serve para cada pessoa curtir só uma vez)
export function idDoVisitante() {
  try {
    let id = localStorage.getItem('visitanteId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('visitanteId', id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}
