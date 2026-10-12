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

-- ---------- COMENTÁRIOS DOS VÍDEOS ----------
-- (pode rodar este arquivo inteiro de novo: tudo aqui é "se não existir" / "substituir")
create table if not exists public.comentarios (
  id         bigint      generated always as identity primary key,
  video_id   text        not null,
  visitante  uuid        not null,
  apelido    text        not null check (char_length(apelido) between 2 and 24),
  texto      text        not null check (char_length(texto) between 1 and 500),
  criado_em  timestamptz not null default now()
);
create index if not exists comentarios_video_idx on public.comentarios (video_id, criado_em desc);

alter table public.comentarios enable row level security;

-- Qualquer visitante pode LER os comentários (mas não escrever direto na tabela)
drop policy if exists "comentarios visiveis para todos" on public.comentarios;
create policy "comentarios visiveis para todos" on public.comentarios
  for select to anon using (true);

-- Escrever só por esta função: limpa espaços, valida tamanhos e limita 3 comentários por minuto por visitante
create or replace function public.comentar(p_video text, p_visitante uuid, p_apelido text, p_texto text)
returns public.comentarios
language plpgsql
security definer
set search_path = public
as $$
declare
  novo comentarios;
begin
  if (select count(*) from comentarios c
      where c.visitante = p_visitante and c.criado_em > now() - interval '1 minute') >= 3 then
    raise exception 'Calma! Espere um pouco antes de comentar de novo.';
  end if;

  insert into comentarios (video_id, visitante, apelido, texto)
  values (p_video, p_visitante, trim(p_apelido), trim(p_texto))
  returning * into novo;

  return novo;
end;
$$;

-- Leitura só das colunas públicas (o id anônimo do visitante fica escondido)
revoke select on public.comentarios from anon;
grant select (id, video_id, apelido, texto, criado_em) on public.comentarios to anon;
grant execute on function public.comentar(text, uuid, text, text) to anon;

-- Tempo real: avisa o site quando chega comentário novo (todo mundo vê na hora)
do $$
begin
  alter publication supabase_realtime add table public.comentarios;
exception when duplicate_object then null;
end $$;
