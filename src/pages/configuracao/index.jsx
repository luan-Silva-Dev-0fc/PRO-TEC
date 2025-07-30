import React, { useState } from 'react';

export default function AtualizarUsuario({ usuarioId, fotoAtual, nomeAtual, emailAtual }) {
  const [nome, setNome] = useState(nomeAtual || '');
  const [foto, setFoto] = useState(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [fotoPreview, setFotoPreview] = useState(fotoAtual || '');
  const [mensagem, setMensagem] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleAtualizar = async () => {
    if (novaSenha && novaSenha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    const formData = new FormData();
    if (nome) formData.append('nome', nome);
    if (novaSenha) formData.append('novaSenha', novaSenha);
    if (foto) formData.append('foto', foto);

    try {
      const response = await fetch(`http://localhost:4028/usuario/${usuarioId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem('Usuário atualizado com sucesso!');
      } else {
        setMensagem(data.erro);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setMensagem('Erro ao atualizar usuário.');
    }
  };

  const handleDeletarConta = async () => {
    if (!window.confirm(`Tem certeza que deseja excluir sua conta?
    Este processo vai excluir:
    - Suas publicações
    - O seu e-mail
    - Todos os dados serão apagados do banco de dados
    E não será possível recuperar os dados depois!`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:4028/usuario/${usuarioId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMensagem('Conta excluída com sucesso.');
        // Redireciona ou faz logout automaticamente após excluir a conta
      } else {
        setMensagem('Erro ao excluir conta.');
      }
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      setMensagem('Erro ao excluir conta.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={containerEstilo}>
      <h2 style={tituloEstilo}>Atualizar Conta</h2>

      {mensagem && <p style={mensagemEstilo}>{mensagem}</p>}

      <div style={fotoContainerEstilo}>
        <img
          src={fotoPreview || 'https://via.placeholder.com/100'}
          alt="Foto de perfil"
          style={fotoEstilo}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          style={fotoInputEstilo}
        />
      </div>

      <div style={campoEstilo}>
        <label style={labelEstilo}>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu novo nome"
          style={inputEstilo}
        />
      </div>

      <div style={campoEstilo}>
        <label style={labelEstilo}>Nova Senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          placeholder="Digite sua nova senha"
          style={inputEstilo}
        />
      </div>

      <div style={campoEstilo}>
        <label style={labelEstilo}>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Confirme sua nova senha"
          style={inputEstilo}
        />
      </div>

      <div style={acoesEstilo}>
        <button
          onClick={handleAtualizar}
          style={botaoEstilo}
          disabled={isDeleting}
        >
          {isDeleting ? 'Excluindo...' : 'Atualizar'}
        </button>
        <button
          onClick={handleDeletarConta}
          style={botaoEstiloExcluir}
          disabled={isDeleting}
        >
          {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
        </button>
      </div>
    </div>
  );
}

const containerEstilo = {
  maxWidth: '90%',
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
};

const tituloEstilo = {
  fontSize: '24px',
  color: '#333',
  textAlign: 'center',
  marginBottom: '20px',
};

const campoEstilo = {
  marginBottom: '20px',
};

const labelEstilo = {
  fontSize: '16px',
  color: '#333',
  marginBottom: '5px',
  fontWeight: '600',
};

const inputEstilo = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  width: '100%',
  fontSize: '16px',
  backgroundColor: '#f9f9f9',
  color: '#333',
};

const fotoContainerEstilo = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  alignItems: 'center',
};

const fotoEstilo = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #ddd',
  marginRight: '15px',
};

const fotoInputEstilo = {
  padding: '8px',
  backgroundColor: '#61a183',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  width: 'auto',
};

const acoesEstilo = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
};

const botaoEstilo = {
  backgroundColor: '#61a183',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '12px 20px',
  fontSize: '16px',
  width: '48%',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const botaoEstiloExcluir = {
  backgroundColor: '#f44336',
};

const mensagemEstilo = {
  color: 'red',
  fontSize: '14px',
  marginBottom: '10px',
  textAlign: 'center',
};
