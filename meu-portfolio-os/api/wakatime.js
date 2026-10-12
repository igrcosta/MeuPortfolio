// Função serverless da Vercel: GET /api/wakatime
// Fica no SERVIDOR, então a chave secreta do WakaTime nunca chega ao navegador do visitante.
// Ela busca as estatísticas dos últimos 7 dias e devolve só o que o site precisa.
export default async function handler(req, res) {
  const chave = process.env.WAKATIME_API_KEY;
  if (!chave) {
    return res.status(503).json({ erro: 'WAKATIME_API_KEY não configurada' });
  }

  try {
    const resposta = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: { Authorization: `Basic ${Buffer.from(chave).toString('base64')}` }
    });
    if (!resposta.ok) {
      return res.status(502).json({ erro: `WakaTime respondeu ${resposta.status}` });
    }

    const { data } = await resposta.json();

    // Cache na CDN da Vercel por 1h: o WakaTime não é consultado a cada visita
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({
      calculando: data.is_up_to_date === false && !data.total_seconds,
      total: data.human_readable_total_including_other_language || data.human_readable_total || '0 mins',
      mediaDiaria: data.human_readable_daily_average_including_other_language || data.human_readable_daily_average || '0 mins',
      linguagens: (data.languages || []).slice(0, 6).map((l) => ({ nome: l.name, porcentagem: l.percent, texto: l.text })),
      editores: (data.editors || []).slice(0, 3).map((e) => ({ nome: e.name, porcentagem: e.percent }))
    });
  } catch {
    return res.status(500).json({ erro: 'Falha ao consultar o WakaTime' });
  }
}
