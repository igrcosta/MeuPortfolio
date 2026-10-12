-- =====================================================================
-- Banco de dados do IgorOS (Supabase / PostgreSQL)
-- Como usar: Supabase > SQL Editor > New query > cole TUDO e clique em "Run".
--
-- Segurança: o site usa só a chave pública (publishable/anon). Por isso as
-- tabelas ficam TRANCADAS (RLS sem políticas de escrita) e o site só mexe
-- nelas através de funções "security definer", que fazem exatamente uma coisa.
-- =====================================================================

-- ---------- CURTIDAS DOS VÍDEOS ----------
create table if not exists public.curtidas (
  video_id   text        not null,
  visitante  uuid        not null,          -- id aleatório guardado no navegador do visitante
  criado_em  timestamptz not null default now(),
  primary key (video_id, visitante)         -- cada visitante curte cada vídeo no máximo 1 vez
);

alter table public.curtidas enable row level security;
-- (nenhuma política = ninguém lê/escreve direto pela API; só pelas funções abaixo)

-- Curte ou descurte (alterna) e devolve o total atualizado + se ficou curtido
create or replace function public.alternar_curtida(p_video text, p_visitante uuid)
returns table (total bigint, curtido boolean)
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (select 1 from curtidas c where c.video_id = p_video and c.visitante = p_visitante) then
    delete from curtidas c where c.video_id = p_video and c.visitante = p_visitante;
  else
    insert into curtidas (video_id, visitante) values (p_video, p_visitante);
  end if;

  return query
    select count(*)::bigint,
           exists (select 1 from curtidas c where c.video_id = p_video and c.visitante = p_visitante)
    from curtidas c where c.video_id = p_video;
end;
$$;

-- Só consulta: total de curtidas do vídeo + se este visitante já curtiu
create or replace function public.ver_curtidas(p_video text, p_visitante uuid)
returns table (total bigint, curtido boolean)
language sql
security definer
set search_path = public
as $$
  select count(*)::bigint,
         bool_or(c.visitante = p_visitante)
  from curtidas c where c.video_id = p_video;
$$;

-- ---------- CONTADOR DE VISITAS ----------
create table if not exists public.visitas (
  id    int    primary key default 1 check (id = 1),  -- tabela de uma linha só
  total bigint not null default 0
);
insert into public.visitas (id, total) values (1, 0) on conflict (id) do nothing;

alter table public.visitas enable row level security;

-- Soma 1 visita e devolve o novo total
create or replace function public.registrar_visita()
returns bigint
language sql
security definer
set search_path = public
as $$
  update visitas set total = total + 1 where id = 1 returning total;
$$;

-- Só consulta o total (sem somar)
create or replace function public.ver_visitas()
returns bigint
language sql
security definer
set search_path = public
as $$
  select total from visitas where id = 1;
$$;

-- Permite que o site (papel "anon") chame SOMENTE essas funções
grant execute on function public.alternar_curtida(text, uuid) to anon;
grant execute on function public.ver_curtidas(text, uuid)     to anon;
grant execute on function public.registrar_visita()           to anon;
grant execute on function public.ver_visitas()                to anon;
