'use client'
import React, { useState, useEffect } from 'react';
import { CiShare1 } from 'react-icons/ci';

const estilos = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '20px 10px',
    position: 'relative',
  },
  publicacao: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  },
  cabecalho: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  nome: {
    fontWeight: 600,
    fontSize: 16,
  },
  texto: {
    fontSize: 15,
    color: '#333',
    marginTop: 10,
    lineHeight: 1.5,
  },
  imagem: {
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    objectFit: 'cover',
  },
  acoes: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoCurtir: isCurtido => ({
    backgroundColor: isCurtido ? '#546c4a' : '#f4f4f4',
    border: 'none',
    borderRadius: '999px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: isCurtido ? '#fff' : '#546c4a',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: isCurtido ? '0 2px 5px rgba(0,0,0,0.15)' : 'none',
    transition: '0.3s',
  }),
  botaoCompartilhar: {
    backgroundColor: '#546c4a',
    color: '#fff',
    border: 'none',
    borderRadius: '999px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  idInfo: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
    textAlign: 'right',
  },
  botaoNovo: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    backgroundColor: '#546c4a',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 60,
    height: 60,
    fontSize: 30,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -30%)',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    zIndex: 999,
    width: '90%',
    maxWidth: 400,
  },
  tituloModal: {
    marginBottom: 12,
    textAlign: 'center',
    color: '#546c4a',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginTop: 10,
  },
  botaoModal: {
    width: '100%',
    padding: 12,
    marginTop: 10,
    backgroundColor: '#546c4a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  fechar: {
    backgroundColor: '#ccc',
    marginTop: 10,
    border: 'none',
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
  telaCheia: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  fecharTelaCheia: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: '#000',
    color: '#fff',
    border: 'none',
    fontSize: 20,
    borderRadius: '50%',
    width: 40,
    height: 40,
    cursor: 'pointer',
    zIndex: 1001,
  }
};

export default function ListaPublicacoes() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [mostrarModalTipo, setMostrarModalTipo] = useState(false);
  const [mostrarModalLegenda, setMostrarModalLegenda] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [conteudo, setConteudo] = useState('');
  const [tipo, setTipo] = useState('');
  const [curtidas, setCurtidas] = useState({});
  const [midiaTelaCheia, setMidiaTelaCheia] = useState(null);

  useEffect(() => {
    fetch('https://api-ecoprof-production.up.railway.app/publicacao')
      .then(res => res.json())
      .then(data => setPublicacoes(data));
  }, []);

  const handleArquivo = e => {
    const file = e.target.files[0];
    setArquivo(file);
    setTipo(file.type.startsWith('image') ? 'foto' : 'video');
    setMostrarModalTipo(false);
    setMostrarModalLegenda(true);
  };

  const handlePublicar = () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('conteudo', conteudo);
    formData.append('tipo', tipo);
    if (arquivo) formData.append('arquivo', arquivo);

    fetch('https://api-ecoprof-production.up.railway.app/publicacao', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        setPublicacoes([data, ...publicacoes]);
        setMostrarModalLegenda(false);
        setMostrarModalSucesso(true);
        setTimeout(() => {
          setMostrarModalSucesso(false);
          setConteudo('');
          setArquivo(null);
          setTipo('');
        }, 2000);
      });
  };

  const handleCurtir = id => {
    setCurtidas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCompartilhar = url => {
    if (navigator.share) {
      navigator.share({
        title: 'EcoProf',
        text: 'Confira essa publicação!',
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado!');
    }
  };

  const abrirEmTelaCheia = (tipo, src) => setMidiaTelaCheia({ tipo, src });
  const fecharTelaCheia = () => setMidiaTelaCheia(null);

  return (
    <div style={estilos.container}>
      {publicacoes.map(pub => (
        <div key={pub.id} style={estilos.publicacao}>
          <div style={estilos.cabecalho}>
            <img
              src={`https://api-ecoprof-production.up.railway.app${pub.Usuario?.foto || '/default-foto.jpg'}`}
              width={40}
              height={40}
              style={{ borderRadius: '50%', marginRight: 10 }}
              alt="Perfil"
            />
            <span style={estilos.nome}>{pub.Usuario?.nome || 'Usuário'}</span>
          </div>
          <p style={estilos.texto}>{pub.conteudo}</p>

          {pub.tipo === 'foto' && (
            <img
              src={`https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`}
              alt=""
              style={estilos.imagem}
              onClick={() => abrirEmTelaCheia('foto', `https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`)}
            />
          )}

          {pub.tipo === 'video' && (
            <video
              controls
              style={estilos.imagem}
              onClick={() => abrirEmTelaCheia('video', `https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`)}
            >
              <source src={`https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`} />
            </video>
          )}

          <div style={estilos.acoes}>
            <button
              onClick={() => handleCurtir(pub.id)}
              style={estilos.botaoCurtir(curtidas[pub.id])}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/10110/10110360.png"
                alt="Curtir"
                width={20}
                height={20}
                style={{ marginRight: 6 }}
              />
              Curtir
            </button>
            <button
              onClick={() => handleCompartilhar(window.location.href)}
              style={estilos.botaoCompartilhar}
            >
              <CiShare1 size={20} style={{ marginRight: 6 }} />
              Compartilhar
            </button>
          </div>

          <div style={estilos.idInfo}>
            ID Usuário: {pub.usuarioId} | ID Publicação: {pub.id}
          </div>
        </div>
      ))}

      <button onClick={() => setMostrarModalTipo(true)} style={estilos.botaoNovo}>+</button>

      {mostrarModalTipo && (
        <div style={estilos.modal}>
          <h3 style={estilos.tituloModal}>Escolha uma mídia</h3>
          <input type="file" accept="image/*,video/*" onChange={handleArquivo} style={estilos.input} />
          <button onClick={() => setMostrarModalTipo(false)} style={estilos.fechar}>Cancelar</button>
        </div>
      )}

      {mostrarModalLegenda && (
        <div style={estilos.modal}>
          <h3 style={estilos.tituloModal}>O que você está pensando?</h3>
          <textarea
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
            placeholder="Escreva sua legenda..."
            rows={3}
            style={estilos.textarea}
          />
          <div style={{ marginTop: 10 }}>
            {arquivo && tipo === 'foto' && (
              <img src={URL.createObjectURL(arquivo)} alt="Prévia" style={estilos.imagem} />
            )}
            {arquivo && tipo === 'video' && (
              <video controls style={estilos.imagem}>
                <source src={URL.createObjectURL(arquivo)} />
              </video>
            )}
          </div>
          <button onClick={handlePublicar} style={estilos.botaoModal}>Publicar</button>
        </div>
      )}

      {mostrarModalSucesso && (
        <div style={estilos.modal}>
          <h3 style={estilos.tituloModal}>Publicado com sucesso!</h3>
        </div>
      )}

      {midiaTelaCheia && (
        <div style={estilos.telaCheia}>
          <button onClick={fecharTelaCheia} style={estilos.fecharTelaCheia}>✕</button>
          {midiaTelaCheia.tipo === 'foto' ? (
            <img src={midiaTelaCheia.src} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          ) : (
            <video controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }}>
              <source src={midiaTelaCheia.src} />
            </video>
          )}
        </div>
      )}
    </div>
  );
}
