import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LinkPage() {
  const [links, setLinks] = useState([]);
  const [novoLink, setNovoLink] = useState('');
  const [token, setToken] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarErro, setMostrarErro] = useState(false);
  const [usuario, setUsuario] = useState({ nome: '' });

  // UseEffect para carregar o token do localStorage e fazer as requisições
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const t = localStorage.getItem('token');
      if (t) {
        setToken(t);
        buscarPerfil(t); // Busca perfil com o token
        buscarLinks(t);   // Busca os links com o token
      }
    }
  }, []);

  // Função para buscar o perfil do usuário com o token JWT
  async function buscarPerfil(t) {
    try {
      const response = await axios.get('https://api-ecoprof-production.up.railway.app/perfil', {  // Link atualizado para a API no Railway
        headers: {
          Authorization: `Bearer ${t}`, // Envia o TokenJWT no cabeçalho
        },
      });
      console.log(response.data);  // Verifique a resposta no console
      // Supondo que a resposta contenha apenas o nome
      if (response.data) {
        setUsuario({
          nome: response.data.nome,  // Nome do usuário
        });
      }
    } catch (err) {
      console.error('Erro ao buscar perfil', err);
    }
  }

  // Função para buscar os links com o token JWT
  async function buscarLinks(t) {
    try {
      const response = await axios.get('https://api-ecoprof-production.up.railway.app/link', {  // Link atualizado para a API no Railway
        headers: {
          Authorization: `Bearer ${t}`, // Envia o TokenJWT no cabeçalho
        },
      });
      setLinks(response.data);
    } catch (err) {
      console.error('Erro ao buscar links', err);
    }
  }

  // Função para publicar um link com o token JWT
  async function publicarLink() {
    if (!novoLink.trim()) return;

    try {
      const res = await axios.post(
        'https://api-ecoprof-production.up.railway.app/link',  // Link atualizado para a API no Railway
        { arquivoUrl: novoLink },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Envia o TokenJWT no cabeçalho
          },
        }
      );

      setNovoLink(''); // Limpa o campo de input após publicação
      buscarLinks(token); // Atualiza a lista de links após publicação
    } catch (err) {
      setErro('Erro ao publicar link');
      setMostrarErro(true);
    }
  }

  // Função para deletar um link com o token JWT
  async function deletarLink(id) {
    try {
      const res = await axios.delete(`https://api-ecoprof-production.up.railway.app/link/${id}`, {  // Link atualizado para a API no Railway
        headers: {
          Authorization: `Bearer ${token}`, // Envia o TokenJWT no cabeçalho
        },
      });

      if (res.status === 200) {
        setLinks(links.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error('Erro ao deletar link', err);
    }
  }

  // Função para fechar o erro exibido
  function fecharErro() {
    setMostrarErro(false);
    setErro('');
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Cole o link do YouTube aqui"
          value={novoLink}
          onChange={(e) => setNovoLink(e.target.value)}
          style={{
            padding: 12,
            width: 'calc(100% - 90px)',
            marginRight: 10,
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16,
          }}
        />
        <button
          onClick={publicarLink}
          style={{
            padding: 12,
            backgroundColor: '#546c4a',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
            width: 80,
          }}
        >
          Publicar
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {links.map((link) => (
          <div
            key={link.id}
            style={{
              marginBottom: 30,
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div style={{ padding: 10, backgroundColor: '#eee' }}>
              <h2 style={{ margin: 0, color: '#546c4a' }}>{usuario.nome}</h2>
            </div>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${extrairVideoId(link.arquivoUrl)}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: 8 }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: '#eee',
              }}
            >
              <button
                onClick={() => deletarLink(link.id)}
                style={{
                  backgroundColor: '#ccc',
                  padding: 8,
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {mostrarErro && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
              width: '90%',
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <p style={{ marginBottom: 20, fontWeight: 'bold', color: '#cc0000' }}>{erro}</p>
            <button
              onClick={fecharErro}
              style={{
                padding: 8,
                borderRadius: 4,
                backgroundColor: '#546c4a',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Função para extrair o ID do vídeo do YouTube a partir da URL
function extrairVideoId(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|@[^/]+\/))([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
