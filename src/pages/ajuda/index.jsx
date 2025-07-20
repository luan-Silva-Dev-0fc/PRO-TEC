"use client";

import { useState } from "react";

export default function AjudaPage() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);
  const [modalErroVisivel, setModalErroVisivel] = useState(false);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  const opcoesDeAjuda = [
    "Problemas com login",
    "Dúvidas sobre como fazer uma publicação",
    "Como denunciar conteúdo impróprio",
    "Problemas técnicos no site",
    "Outras dúvidas",
  ];

  const handleSelecionarAjuda = () => {
    if (!opcaoSelecionada) {
      setModalErroVisivel(true); // Exibe modal de erro caso não tenha selecionado opção
      return;
    }

    // Exibe o modal de sucesso ou para continuar o processo de ajuda
    setModalVisivel(true);
  };

  const handleConfirmarAjuda = () => {
    setModalVisivel(false);
    setModalSucessoVisivel(true); // Exibe o modal de sucesso
  };

  const handleFecharModal = () => {
    setModalVisivel(false);
    setModalErroVisivel(false);
  };

  const handleFecharModalSucesso = () => {
    setModalSucessoVisivel(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center relative">
      {/* Fundo com animação SVG */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#61a183] to-[#7abf98] opacity-70 z-0">
        <img
          src="/planeta.svg"
          alt="Animação SVG"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50 animate-pulse"
        />
      </div>

      <div className="relative z-10 w-full max-w-xl bg-white shadow-xl rounded-3xl p-6 border bg-opacity-90">
        <h1 className="text-3xl font-semibold text-[#61a183] mb-4 text-center">Página de Ajuda</h1>

        <p className="text-gray-700 mb-6 text-center">
          Como podemos ajudar você? Selecione uma opção para saber mais.
        </p>

        <div className="space-y-4 mb-6">
          {opcoesDeAjuda.map((opcao, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-xl border transition-all hover:bg-[#f0fdf7] focus:outline-none ${
                opcaoSelecionada === opcao
                  ? "bg-[#61a183] text-white border-[#61a183]"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => setOpcaoSelecionada(opcao)}
            >
              {opcao}
            </button>
          ))}
        </div>

        <button
          onClick={handleSelecionarAjuda}
          className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-semibold py-3 rounded-xl transition-all"
        >
          Obter Ajuda
        </button>
      </div>

      {/* Modal de Confirmação */}
      {modalVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#61a183] mb-4">Confirmação de Ajuda</h2>
            <p className="mb-4">Você selecionou a opção: {opcaoSelecionada}. Gostaria de continuar?</p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmarAjuda}
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

      {/* Modal de Erro (Caso o usuário não selecione uma opção) */}
      {modalErroVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Erro</h2>
            <p className="mb-4">Por favor, selecione uma opção de ajuda antes de prosseguir.</p>
            <button
              onClick={handleFecharModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {modalSucessoVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Ajuda Confirmada!</h2>
            <p className="mb-4">Sua solicitação de ajuda para "{opcaoSelecionada}" foi registrada com sucesso. Em breve, você receberá mais informações.</p>
            <button
              onClick={handleFecharModalSucesso}
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
