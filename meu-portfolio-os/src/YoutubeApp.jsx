import { useState } from 'react';

export default function YoutubeApp() {
    const [likes, setLikes] = useState(128);
    const [liked, setLiked] = useState(false);
    const [comentarios, setComentarios] = useState([
        { id: 1, usuario: '@UsuarioDaSilva', tempo: 'há 10 dias', texto: 'Muito top! 🔥🔥', avatar: '👤' },
        { id: 2, usuario: '@JalinRabei', tempo: 'há 2 semanas', texto: 'Incrível explicação cara, parabéns pelo projeto!', avatar: '👨‍💻' }
    ]);
    const [novoComentario, setNovoComentario] = useState('');

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(Likes + 1);
            setLiked(true);
        }
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!novoComentario.trim()) return;

        setComentarios([
            {
                id: Date.now(),
                usuario: '@VisitanteDev',
                tempo: 'agora mesmo',
                texto: novoComentario,
                avatar: '6️⃣7️⃣'
            },
            ...comentarios
        ]);
        setNovoComentario('');
    };

    return (
        <div style={{ backgroundColor: '#0f0f0f', color: '#f1f1f1', height: '100%', overflowY: 'auto', fontFamily: 'Roboto, Arial, sans-serif' }}>

            {/* 1. BARRA SUPERIOR (HEADER) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', backgroundColor: '#0f0f0f', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #272727' }}>

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <span style={{ color: '#ff0000', fontSize: '20px', fontWeight: 'bold' }}>▶</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>YouTube</span>
                </div>

                {/* Campo de Busca */}
                <div style={{ display: 'flex', alignItems: 'center', width: '40%', maxWidth: '400px' }}>
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #303030', color: '#fff', padding: '6px 12px', borderRadius: '20px 0 0 20px', fontSize: '13px', outline: 'none' }}
                    />
                    <button style={{ backgroundColor: '#222222', border: '1px solid #303030', borderLeft: 'none', color: '#fff', padding: '6px 14px', borderRadius: '0 20px 20px 0', cursor: 'pointer' }}>
                        🔍
                    </button>
                </div>

                {/* Perfil */}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                    U
                </div>
            </div>

            {/* 2. CORPO PRINCIPAL (VÍDEO + RECOMENDADOS) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', padding: '16px' }}>

                {/* COLUNA DA ESQUERDA (VÍDEO, TÍTULO, AÇÕES, COMENTÁRIOS) */}
                <div>
                    {/* Player de Vídeo Embed */}
                    <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/xckdE-H2auY"
                            title="Cyberleek O HERÓI QUE SE TORNOU VILÃO"
                            style={{ border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Título */}
                    <h1 style={{ fontSize: '16px', margin: '12px 0 8px', fontWeight: 'bold', color: '#f1f1f1' }}>
                        Cyberleek O HERÓI QUE SE TORNOU VILÃO #gta6 #gaming #hacker
                    </h1>

                    {/* Canal, Inscrever-se e Ações */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>

                        {/* Infos do Canal */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                C
                            </div>
                            <div>
                                <strong style={{ fontSize: '13px', display: 'block' }}>Cyberleek</strong>
                                <span style={{ fontSize: '11px', color: '#aaa' }}>12,4 mil inscritos</span>
                            </div>
                            <button style={{ backgroundColor: '#f1f1f1', color: '#0f0f0f', border: 'none', padding: '8px 14px', borderRadius: '18px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginLeft: '10px' }}>
                                Inscrever-se
                            </button>
                        </div>

                        {/* Botões Like / Share */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ backgroundColor: '#272727', borderRadius: '18px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                <button
                                    onClick={handleLike}
                                    style={{ backgroundColor: 'transparent', color: liked ? '#38bdf8' : '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    👍 {likes}
                                </button>
                                <span style={{ color: '#555' }}>|</span>
                                <button style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}>
                                    👎
                                </button>
                            </div>

                            <button style={{ backgroundColor: '#272727', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '18px', fontSize: '12px', cursor: 'pointer' }}>
                                ↗ Compartilhar
                            </button>
                        </div>
                    </div>

                    {/* Descrição do Vídeo */}
                    <div style={{ backgroundColor: '#272727', borderRadius: '12px', padding: '12px', fontSize: '12px', color: '#d9d9d9', marginBottom: '20px' }}>
                        <strong>134 mil visualizações • há 1 mês</strong>
                        <p style={{ margin: '6px 0 0' }}>
                            Análise completa sobre a trajetória do Cyberleek no universo gamer e a transição histórica envolvida no caso do GTA 6.
                        </p>
                    </div>

                    {/* SEÇÃO DE COMENTÁRIOS */}
                    <div>
                        <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>{comentarios.length} comentários</h3>

                        {/* Adicionar Comentário */}
                        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                U
                            </div>
                            <input
                                type="text"
                                placeholder="Adicione um comentário..."
                                value={novoComentario}
                                onChange={(e) => setNovoComentario(e.target.value)}
                                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #303030', color: '#fff', fontSize: '12px', outline: 'none' }}
                            />
                            <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer' }}>
                                Comentar
                            </button>
                        </form>

                        {/* Lista de Comentários */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {comentarios.map((c) => (
                                <div key={c.id} style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                                    <span>{c.avatar}</span>
                                    <div>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                            <strong style={{ fontSize: '11px' }}>{c.usuario}</strong>
                                            <span style={{ fontSize: '10px', color: '#aaa' }}>{c.tempo}</span>
                                        </div>
                                        <p style={{ margin: '2px 0 0', color: '#d9d9d9' }}>{c.texto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COLUNA DA DIREITA (RECOMENDADOS) */}
                <div>
                    <h4 style={{ fontSize: '12px', margin: '0 0 10px', color: '#aaa' }}>Recomendados</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                            <div style={{ width: '100px', height: '56px', backgroundColor: '#272727', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                                🎮
                            </div>
                            <div>
                                <strong style={{ fontSize: '11px', display: 'block', color: '#fff' }}>Game Launcher OS</strong>
                                <span style={{ fontSize: '10px', color: '#aaa' }}>Meu Portfólio</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                            <div style={{ width: '100px', height: '56px', backgroundColor: '#272727', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                                📜
                            </div>
                            <div>
                                <strong style={{ fontSize: '11px', display: 'block', color: '#fff' }}>Meus Certificados</strong>
                                <span style={{ fontSize: '10px', color: '#aaa' }}>Formação Dev</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}