"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegCommentDots, FaShare, FaReply, FaEllipsisH } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate, MdOndemandVideo } from "react-icons/md";

export default function Publicacao() {
  const [comentario, setComentario] = useState("");
  const [publicacoes, setPublicacoes] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [video, setVideo] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeData, setYoutubeData] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [mostrarInputComentario, setMostrarInputComentario] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);
  const [carregando, setCarregando] = useState(false);

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
      setYoutubeData(null);
    }
  };

  useEffect(() => {
    const usuariosData = localStorage.getItem("usuarios");
    const usuarios = usuariosData ? JSON.parse(usuariosData) : [];

    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      setNomeUsuario(usuario.nome);
      setFotoUsuario(usuario.foto);
    }
  }, []);

  const handlePublicar = () => {
    if (!comentario && !imagem && !video && !youtubeLink) return;

    setCarregando(true);

    setTimeout(() => {
      setPublicacoes([
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
        ...publicacoes,
      ]);

      setComentario("");
      setImagem(null);
      setVideo(null);
      setYoutubeLink("");
      setYoutubeData(null);
      setCarregando(false);
    }, 2000);
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
    window.location.href = "/denuncia";
  };

  const handleAjuda = () => {
    window.location.href = "/ajuda";
  };

  const extractYouTubeID = (url) => {
    const reg = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(reg);
    return match ? match[1] : "";
  };

  const handleAddComentario = (pubIndex, texto) => {
    const novasPublicacoes = [...publicacoes];
    novasPublicacoes[pubIndex].comentarios.push({ texto, respostas: [] });
    setPublicacoes(novasPublicacoes);
  };

  const handleAddResposta = (pubIndex, comIndex, texto) => {
    const novasPublicacoes = [...publicacoes];
    novasPublicacoes[pubIndex].comentarios[comIndex].respostas.push(texto);
    setPublicacoes(novasPublicacoes);
  };

  return (
    <div className="bg-white min-h-screen p-4 text-gray-800 relative">
      <div className="relative w-full h-56 mb-10 rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#61a183] to-[#7abf98] opacity-90" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#61a183] rounded-full mix-blend-multiply blur-2xl opacity-30 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <img src="/animacao.svg" alt="Animação" className="w-32 h-32 animate-bounce" />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white shadow-md px-6 py-2 rounded-lg bg-[#61a183]">
          Matemática
        </div>
      </div>

      <div className={`${carregando ? "blur-sm" : ""} max-w-2xl mx-auto`}>
        <div className="bg-white border rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <h2 className="text-2xl font-bold text-[#61a183] mb-4">Criar publicação</h2>

          <textarea
            placeholder="O que você está pensando?"
            className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:ring-2 focus:ring-[#61a183] outline-none"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />

          <div className="mt-4">
            <input
              type="url"
              placeholder="Adicione o link do vídeo do YouTube"
              className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-[#61a183]"
              value={youtubeLink}
              onChange={(e) => {
                setYoutubeLink(e.target.value);
                fetchYouTubeData(e.target.value);
              }}
            />
          </div>

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

        {carregando && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#61a183] border-solid"></div>
          </div>
        )}

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
