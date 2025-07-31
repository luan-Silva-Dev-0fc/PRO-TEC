import React, { useState, useEffect } from 'react';

// 🟢 Estilos movidos para o topo — importante!
const containerEstilo = {
  maxWidth: 600,
  margin: '0 auto',
  padding: 20,
  position: 'relative',
};

const tituloModal = {
  marginBottom: 10,
  textAlign: 'center',
  color: '#61a183',
};

const publicacaoEstilo = {
  border: '1px solid #ccc',
  borderRadius: 10,
  padding: 15,
  marginBottom: 20,
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const cabecalhoEstilo = {
  display: 'flex',
  alignItems: 'center',
};

const textoEstilo = {
  marginTop: 10,
  fontSize: '16px',
  color: '#333',
};

const imagemEstilo = {
  borderRadius: 10,
  marginTop: 10,
  cursor: 'zoom-in',
};

const acoesEstilo = {
  marginTop: 10,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const curtirBotaoEstilo = isCurtido => ({
  backgroundColor: isCurtido ? '#61a183' : '#f1f1f1',
  border: 'none',
  borderRadius: '30px',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const compartilharBotaoEstilo = {
  backgroundColor: '#61a183',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
};

const infoIdEstilo = {
  fontSize: 12,
  color: '#666',
  marginTop: 5,
};

const botaoNovaPublicacaoEstilo = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  backgroundColor: '#61a183',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: 60,
  height: 60,
  fontSize: 24,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
};

const modalStyle = {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  zIndex: 999,
};

const botaoModal = {
  display: 'block',
  width: '100%',
  padding: 10,
  marginTop: 10,
  backgroundColor: '#61a183',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
};

const botaoFechar = {
  display: 'block',
  width: '100%',
  padding: 10,
  marginTop: 10,
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: 8,
};

const inputEstilo = {
  marginTop: 10,
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

const textareaEstilo = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

const telaCheiaEstilo = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const botaoFecharTelaCheia = {
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'rgba(0,0,0,0.6)',
  color: 'white',
  border: 'none',
  fontSize: 24,
  borderRadius: '50%',
  width: 40,
  height: 40,
  cursor: 'pointer',
  zIndex: 10000,
};

// 🟢 Componente Principal
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
    fetch('https://api-ecoprof-production.up.railway.app/publicacao') // Usando o link da API no Railway
      .then(res => res.json())
      .then(data => {
        setPublicacoes(data);
      });
  }, []);

  const handleArquivo = e => {
    const file = e.target.files[0];
    setArquivo(file);
    setTipo(file.type.startsWith('image') ? 'foto' : 'video');
    setMostrarModalTipo(false);
    setMostrarModalLegenda(true);
  };

  const handlePublicar = () => {
    const formData = new FormData();
    formData.append('conteudo', conteudo);
    formData.append('tipo', tipo);
    if (arquivo) formData.append('arquivo', arquivo);

    fetch('https://api-ecoprof-production.up.railway.app/publicacao', { // Usando o link da API no Railway
      method: 'POST',
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

  const abrirEmTelaCheia = (tipo, src) => {
    setMidiaTelaCheia({ tipo, src });
  };

  const fecharTelaCheia = () => {
    setMidiaTelaCheia(null);
  };

  return (
    <div style={containerEstilo}>
      {publicacoes.map(pub => (
        <div key={pub.id} style={publicacaoEstilo}>
          <div style={cabecalhoEstilo}>
            <img
              src={`https://api-ecoprof-production.up.railway.app${pub.Usuario?.foto || '/default-foto.jpg'}`}
              width={40}
              height={40}
              style={{ borderRadius: '50%', marginRight: 10 }}
              alt="Perfil"
            />
            <strong>{pub.Usuario?.nome || 'Usuário'}</strong>
          </div>

          <p style={textoEstilo}>{pub.conteudo}</p>

          {pub.tipo === 'foto' && pub.arquivoUrl && (
            <img
              src={`https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`}
              width="100%"
              style={imagemEstilo}
              alt=""
              onClick={() => abrirEmTelaCheia('foto', `https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`)}
            />
          )}

          {pub.tipo === 'video' && pub.arquivoUrl && (
            <video
              controls
              width="100%"
              style={imagemEstilo}
              onClick={() => abrirEmTelaCheia('video', `https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`)}
            >
              <source src={`https://api-ecoprof-production.up.railway.app${pub.arquivoUrl}`} />
            </video>
          )}

          <div style={acoesEstilo}>
            <button
              onClick={() => handleCurtir(pub.id)}
              style={curtirBotaoEstilo(curtidas[pub.id])}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/11600/11600148.png"
                alt="Curtir"
                width="20"
                height="20"
              />
            </button>
            <button style={compartilharBotaoEstilo}>🔗 Compartilhar</button>
            <p style={infoIdEstilo}>
              ID Usuário: {pub.usuarioId} | ID Publicação: {pub.id}
            </p>
          </div>
        </div>
      ))}

      <button onClick={() => setMostrarModalTipo(true)} style={botaoNovaPublicacaoEstilo}>
        +
      </button>

      {mostrarModalTipo && (
        <div style={modalStyle}>
          <h3 style={tituloModal}>Escolha uma mídia</h3>
          <button onClick={() => setMostrarModalTipo(false)} style={botaoModal}>Abrir a Galeria</button>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleArquivo}
            style={inputEstilo}
          />
          <button onClick={() => setMostrarModalTipo(false)} style={botaoFechar}>Cancelar</button>
        </div>
      )}

      {mostrarModalLegenda && (
        <div style={modalStyle}>
          <h3 style={tituloModal}>O que você está pensando?</h3>
          <textarea
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
            placeholder="Escreva sua legenda..."
            rows={3}
            style={textareaEstilo}
          />
          <div style={{ marginTop: 10 }}>
            {arquivo && tipo === 'foto' && (
              <img
                src={URL.createObjectURL(arquivo)}
                width="100%"
                style={imagemEstilo}
                alt="Prévia da publicação"
              />
            )}
            {arquivo && tipo === 'video' && (
              <video controls width="100%" style={imagemEstilo}>
                <source src={URL.createObjectURL(arquivo)} />
              </video>
            )}
          </div>
          <button onClick={handlePublicar} style={botaoModal}>Publicar</button>
        </div>
      )}

      {mostrarModalSucesso && (
        <div style={modalStyle}>
          <h3 style={tituloModal}>Publicado com sucesso!</h3>
        </div>
      )}

      {midiaTelaCheia && (
        <div style={telaCheiaEstilo}>
          <button onClick={fecharTelaCheia} style={botaoFecharTelaCheia}>✕</button>
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
