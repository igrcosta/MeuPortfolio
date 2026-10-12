import { useEffect, useState } from 'react';
import { supabase, idDoVisitante } from '../lib/supabase';

const COLUNAS = 'id, video_id, apelido, texto, criado_em';

// Comentários de um vídeo, salvos no Supabase e atualizados em tempo real.
// Devolve { disponivel, comentarios, enviar(apelido, texto), erro }.
export default function useComentarios(videoId) {
  const [comentarios, setComentarios] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!supabase || !videoId) return;
    let ativo = true;

    // 1) Carrega os 50 comentários mais recentes deste vídeo
    supabase
      .from('comentarios')
      .select(COLUNAS)
      .eq('video_id', videoId)
      .order('criado_em', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (ativo && !error) setComentarios(data);
      });

    // 2) Tempo real: quando alguém comenta neste vídeo, aparece na hora para todo mundo
    const canal = supabase
      .channel(`comentarios-${videoId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comentarios', filter: `video_id=eq.${videoId}` },
        ({ new: novo }) => {
          setComentarios((atual) => (atual.some((c) => c.id === novo.id) ? atual : [novo, ...atual]));
        }
      )
      .subscribe();

    return () => {
      ativo = false;
      supabase.removeChannel(canal);
    };
  }, [videoId]);

  // Envia um comentário (a função no banco valida tamanho e limita spam)
  const enviar = async (apelido, texto) => {
    setErro('');
    const { data, error } = await supabase.rpc('comentar', {
      p_video: videoId,
      p_visitante: idDoVisitante(),
      p_apelido: apelido,
      p_texto: texto
    });
    if (error) {
      setErro(error.message.includes('Calma') ? error.message : 'Não consegui publicar. Tente de novo.');
      return false;
    }
    // Mostra na hora (se o tempo real também entregar, o "some" acima evita duplicar)
    setComentarios((atual) => (atual.some((c) => c.id === data.id) ? atual : [data, ...atual]));
    return true;
  };

  return { disponivel: !!supabase, comentarios, enviar, erro };
}
