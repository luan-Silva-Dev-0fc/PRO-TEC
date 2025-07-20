"use client";

import { useState } from "react";

export default function ConfiguracoesPage() {
  const [nomeUsuario, setNomeUsuario] = useState("João Silva");
  const [emailUsuario, setEmailUsuario] = useState("joao@email.com");
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [notificacoes, setNotificacoes] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalExclusaoVisivel, setModalExclusaoVisivel] = useState(false);
  const [modalEmailVisivel, setModalEmailVisivel] = useState(false);
  const [modalNomeVisivel, setModalNomeVisivel] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);

  const handleFotoChange = (e) => {
    setFotoUsuario(URL.createObjectURL(e.target.files[0]));
  };

  const handleNotificacoesChange = () => {
    setNotificacoes(!notificacoes);
  };

  const handleAlterarSenha = () => {
    setModalVisivel(true);
  };

  const handleAlterarEmail = () => {
    setModalEmailVisivel(true);
  };

  const handleAlterarNome = () => {
    setModalNomeVisivel(true);
  };

  const handleExcluirConta = () => {
    setModalExclusaoVisivel(true);
  };

  const handleFecharModal = () => {
    setModalVisivel(false);
    setModalExclusaoVisivel(false);
    setModalEmailVisivel(false);
    setModalNomeVisivel(false);
  };

  const handleConfirmarAlteracaoSenha = () => {
    setModalVisivel(false);
    setModalSucesso(true);
  };

  const handleConfirmarAlteracaoEmail = () => {
    setModalEmailVisivel(false);
    setModalSucesso(true);
  };

  const handleConfirmarAlteracaoNome = () => {
    setNomeUsuario(novoNome);
    setModalNomeVisivel(false);
    setModalSucesso(true);
  };

  const handleConfirmarExclusao = () => {
    alert("Conta excluída!");
    setModalExclusaoVisivel(false);
  };

  const handleIrParaSuporte = () => {
    window.location.href = "/suporte";
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-6 border">
        <h1 className="text-3xl font-semibold text-[#61a183] mb-4 text-center">Configurações</h1>

        {/* Dados de Perfil */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Dados de Perfil</h2>
          <div className="flex items-center space-x-4 mt-4">
            {fotoUsuario ? (
              <img
                src={fotoUsuario}
                alt="Foto de Perfil"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300" />
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="block w-full text-sm text-gray-500"
              />
              <p className="mt-2 text-gray-700">Nome de Usuário: {nomeUsuario}</p>
              <p className="mt-2 text-gray-700">E-mail: {emailUsuario}</p>
            </div>
          </div>
        </div>

        {/* Alterar Nome */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Alterar Nome</h2>
          <button
            onClick={handleAlterarNome}
            className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-semibold py-3 rounded-xl transition-all mt-4"
          >
            Alterar Nome
          </button>
        </div>

        {/* Alteração de E-mail */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Alterar E-mail</h2>
          <button
            onClick={handleAlterarEmail}
            className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-semibold py-3 rounded-xl transition-all mt-4"
          >
            Alterar E-mail
          </button>
        </div>

        {/* Configurações de Notificações */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Notificações</h2>
          <div className="flex items-center mt-4 space-x-4">
            <p className="text-gray-700">Ativar notificações:</p>
            <input
              type="checkbox"
              checked={notificacoes}
              onChange={handleNotificacoesChange}
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Alteração de Senha */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Alterar Senha</h2>
          <button
            onClick={handleAlterarSenha}
            className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-semibold py-3 rounded-xl transition-all mt-4"
          >
            Alterar Senha
          </button>
        </div>

        {/* Botão de Suporte */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Suporte</h2>
          <button
            onClick={handleIrParaSuporte}
            className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-semibold py-3 rounded-xl transition-all mt-4"
          >
            Ir para Suporte
          </button>
        </div>

        {/* Exclusão de Conta */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#61a183]">Excluir Conta</h2>
          <button
            onClick={handleExcluirConta}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all mt-4"
          >
            Excluir Conta
          </button>
        </div>
      </div>

      {/* Modal de Alteração de Nome */}
      {modalNomeVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#61a183] mb-4">Alterar Nome</h2>
            <input
              type="text"
              placeholder="Novo nome"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleConfirmarAlteracaoNome}
                className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white py-2 rounded-lg mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={handleFecharModal}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alteração de Senha */}
      {modalVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#61a183] mb-4">Alterar Senha</h2>
            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleConfirmarAlteracaoSenha}
                className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white py-2 rounded-lg mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={handleFecharModal}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alteração de E-mail */}
      {modalEmailVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#61a183] mb-4">Alterar E-mail</h2>
            <input
              type="email"
              placeholder="Novo e-mail"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleConfirmarAlteracaoEmail}
                className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white py-2 rounded-lg mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={handleFecharModal}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão de Conta */}
      {modalExclusaoVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Excluir Conta</h2>
            <p className="mb-4">Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.</p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmarExclusao}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={handleFecharModal}
                className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {modalSucesso && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Alteração bem-sucedida!</h2>
            <p className="mb-4">Suas alterações foram salvas com sucesso.</p>
            <button
              onClick={() => setModalSucesso(false)}
              className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
