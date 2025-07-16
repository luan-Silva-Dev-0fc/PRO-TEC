"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegCommentDots, FaShare, FaReply, FaEllipsisH } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate, MdOndemandVideo } from "react-icons/md";
import { PiYoutubeLogo } from "react-icons/pi";

export default function Publicacao() {
  const [comentario, setComentario] = useState("");
  const [publicacoes, setPublicacoes] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [video, setVideo] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeData, setYoutubeData] = useState(null);  // Armazena as informações do YouTube
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [mostrarInputComentario, setMostrarInputComentario] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioSalvo, setUsuarioSalvo] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Função para buscar informações do vídeo do YouTube a partir do link
  const fetchYouTubeData = async (link) => {
    const videoId = extractYouTubeID(link);
    if (!videoId) return;

    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=YOUR_YOUTUBE_API_KEY`);
    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const videoData = data.items[0].snippet;
      setYoutubeData({
        title: videoData.title,
        thumbnail: videoData.thumbnails.high.url,
      });
    } else {
      setYoutubeData(null);  // Caso o link não seja válido
    }
  };

  // Verificar se o usuário já existe no localStorage
  useEffect(() => {
    const usuariosData = localStorage.getItem("usuarios");
    const usuarios = usuariosData ? JSON.parse(usuariosData) : [];

    if (usuarios.length > 0) {
      // Definindo o usuário com base no primeiro da lista (simulação)
      const usuario = usuarios[0];
      setNomeUsuario(usuario.nome);
      setFotoUsuario(usuario.foto);
      setUsuarioSalvo(true);
    } else {
      setModalVisivel(true);  // Se o usuário não estiver salvo, mostra o modal
    }
  }, []);

  const handlePublicar = () => {
    if (!comentario && !imagem && !video && !youtubeLink) return;

    setCarregando(true);  // Ativa o carregamento enquanto a publicação é "enviada"

    setTimeout(() => {
      setPublicacoes([
        ...publicacoes,
        {
          nome: nomeUsuario,
          foto: fotoUsuario,
          texto: comentario,
          imagem,
          video,
          youtube: youtubeLink,
          comentarios: [], 
          id: Date.now(),
        },
      ]);

      setComentario("");
      setImagem(null);
      setVideo(null);
      setYoutubeLink("");
      setYoutubeData(null);  // Reseta os dados do vídeo após a publicação
      setCarregando(false);  // Desativa o carregamento após a "publicação"
    }, 2000);  // Simula o tempo de carregamento da publicação
  };

  const handleFecharModal = () => {
    if (nomeUsuario.trim() === "") {
      alert("O nome é obrigatório!");
      return;
    }

    const usuarioData = {
      nome: nomeUsuario,
      foto: fotoUsuario,
    };
    const usuariosData = localStorage.getItem("usuarios");
    const usuarios = usuariosData ? JSON.parse(usuariosData) : [];

    usuarios.push(usuarioData);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setModalVisivel(false);
    setUsuarioSalvo(true);
  };

  const handleDeletarPublicacao = (pubIndex) => {
    setCarregando(true);

    setTimeout(() => {
      const atualizadas = [...publicacoes];
      atualizadas.splice(pubIndex, 1);
      setPublicacoes(atualizadas);
      setCarregando(false);
    }, 1000);
    setMenuAberto(null);
  };

  const handleDenunciarPublicacao = () => {
    alert("Publicação denunciada!");
    setMenuAberto(null);
  };

  const handleAjuda = () => {
    alert("Aguarde, em breve vamos adicionar mais funcionalidades de ajuda.");
    setMenuAberto(null);
  };

  const extractYouTubeID = (url) => {
    const reg = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(reg);
    return match ? match[1] : "";
  };

  return (
    <div className="bg-white min-h-screen p-4 text-gray-800 relative">
      {/* Modal de Configuração Inicial */}
      {modalVisivel && !usuarioSalvo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-[#61a183] mb-4">Configuração de Perfil</h2>

            <input
              type="text"
              placeholder="Nome de usuário"
              className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-[#61a183]"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />

            <label className="cursor-pointer text-xl mb-4 text-[#61a183] block">
              Adicionar Foto (opcional)
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFotoUsuario(URL.createObjectURL(e.target.files[0]))}
              />
            </label>

            <button
              onClick={handleFecharModal}
              className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* Interface de publicação */}
      <div className={`${modalVisivel ? "blur-sm" : ""} max-w-2xl mx-auto`}>
        <div className="bg-white border rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <h2 className="text-2xl font-bold text-[#61a183] mb-4">Criar publicação</h2>

          <textarea
            placeholder="O que você está pensando?"
            className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:ring-2 focus:ring-[#61a183] outline-none"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />

          {/* Adicionar YouTube */}
          <div className="mt-4">
            <input
              type="url"
              placeholder="Adicione o link do vídeo do YouTube"
              className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-[#61a183]"
              value={youtubeLink}
              onChange={(e) => {
                setYoutubeLink(e.target.value);
                fetchYouTubeData(e.target.value); // Chama a função para buscar dados do vídeo
              }}
            />
          </div>

          {/* Exibir título e miniatura do YouTube se o link for válido */}
          {youtubeData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#61a183]">{youtubeData.title}</h3>
              <img src={youtubeData.thumbnail} alt="YouTube Thumbnail" className="w-full rounded-lg mt-2" />
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-4 text-[#61a183] text-2xl">
            <label className="cursor-pointer hover:scale-110 transition-transform">
              <MdOutlineAddPhotoAlternate />
              <input type="file" accept="image/*" hidden onChange={(e) => setImagem(URL.createObjectURL(e.target.files[0]))} />
            </label>
            <label className="cursor-pointer hover:scale-110 transition-transform">
              <MdOndemandVideo />
              <input type="file" accept="video/*" hidden onChange={(e) => setVideo(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </div>

          <button
            onClick={handlePublicar}
            className="mt-4 w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Publicar
          </button>
        </div>

        {/* Carregamento */}
        {carregando && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#61a183] border-solid"></div>
          </div>
        )}

        {/* Publicações */}
        <div className="mt-10 space-y-6">
          {publicacoes.map((pub, pubIndex) => (
            <div key={pub.id} className="bg-white border rounded-2xl p-4 shadow-md hover:shadow-xl transition-all relative">
              <div className="flex items-center gap-4 mb-3">
                {pub.foto && <img src={pub.foto} className="w-10 h-10 rounded-full" />}
                <h3 className="text-lg font-semibold text-[#61a183] gradient-text">{pub.nome}</h3>
                <FaEllipsisH
                  className="absolute top-3 right-3 cursor-pointer hover:text-[#61a183]"
                  onClick={() => setMenuAberto(menuAberto === pubIndex ? null : pubIndex)}
                />
              </div>

              {menuAberto === pubIndex && (
                <div className="absolute top-12 right-4 bg-white border rounded-lg shadow-lg py-2 px-4">
                  <button onClick={() => handleDeletarPublicacao(pubIndex)} className="block text-red-500 mb-2">
                    Deletar Publicação
                  </button>
                  <button onClick={handleDenunciarPublicacao} className="block text-yellow-500 mb-2">
                    Denunciar
                  </button>
                  <button onClick={handleAjuda} className="block text-blue-500">
                    Ajuda
                  </button>
                </div>
              )}

              {pub.texto && <p className="mb-3">{pub.texto}</p>}
              {pub.imagem && <img src={pub.imagem} className="w-full rounded-lg mb-3" />}
              {pub.video && <video src={pub.video} controls className="w-full rounded-lg mb-3" />}
              {pub.youtube && (
                <iframe
                  className="w-full rounded-lg mb-3 aspect-video"
                  src={`https://www.youtube.com/embed/${extractYouTubeID(pub.youtube)}`}
                  allowFullScreen
                />
              )}

              <div className="flex justify-between text-[#61a183] text-xl mb-3">
                <FaHeart />
                <button onClick={() => setMostrarInputComentario(!mostrarInputComentario)}>
                  <FaRegCommentDots />
                </button>
                <FaShare />
              </div>

              {mostrarInputComentario && (
                <ComentarioInput
                  onEnviar={(texto) => handleAddComentario(pubIndex, texto)}
                />
              )}

              <div className="mt-4 space-y-3">
                {(pub.comentarios || []).map((com, comIndex) => (
                  <div key={comIndex} className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p>{com.texto}</p>
                      <span className="text-[#61a183]">
                        <FaReply />
                      </span>
                    </div>
                    <ComentarioInput
                      placeholder="Responder comentário..."
                      onEnviar={(texto) => handleAddResposta(pubIndex, comIndex, texto)}
                    />
                    <div className="ml-4 mt-2 space-y-2">
                      {com.respostas.map((res, i) => (
                        <div key={i} className="text-sm bg-gray-200 rounded px-3 py-1">
                          {res}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de input de comentário
function ComentarioInput({ onEnviar, placeholder = "Comentar..." }) {
  const [texto, setTexto] = useState("");

  const enviar = () => {
    if (texto.trim()) {
      onEnviar(texto);
      setTexto("");
    }
  };

  return (
    <div className="mt-2">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#61a183] outline-none"
        placeholder={placeholder}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button
        onClick={enviar}
        className="mt-2 text-sm text-white bg-[#61a183] px-4 py-1 rounded hover:bg-[#4c866a] transition-all"
      >
        Enviar
      </button>
    </div>
  );
}
