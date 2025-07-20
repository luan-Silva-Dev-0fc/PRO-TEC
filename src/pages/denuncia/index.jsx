"use client";

import { useState } from "react";

export default function DenunciaPage() {
  const [motivoSelecionado, setMotivoSelecionado] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalSucessoVisivel, setModalSucessoVisivel] = useState(false);
  const [modalErroVisivel, setModalErroVisivel] = useState(false);

  const motivos = [
    "Conteúdo fora do tema",
    "Conteúdo impróprio",
    "Racismo / Homofobia / Preconceito",
    "Fake news ou desinformação",
    "Incentivo ao desmatamento",
    "Discurso de ódio",
    "Outro",
  ];

  const handleEnviar = () => {
    if (!motivoSelecionado) {
      setModalErroVisivel(true); // Exibe modal de erro caso o motivo não seja selecionado
      return;
    }

    // Exibe o modal de confirmação
    setModalVisivel(true);
  };

  const handleConfirmarEnvio = () => {
    // Envio da denúncia (pode integrar com API ou banco depois)
    setModalVisivel(false); // Fecha o modal de confirmação
    setModalSucessoVisivel(true); // Exibe o modal de sucesso

    // Limpa os campos após o envio
    setMotivoSelecionado("");
    setDetalhes("");
  };

  const handleFecharModal = () => {
    setModalVisivel(false);
    setModalErroVisivel(false);
  };

  const handleFecharModalSucesso = () => {
    setModalSucessoVisivel(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-6 border">
        <h1 className="text-2xl font-bold text-[#61a183] mb-4 text-center">Denunciar Publicação</h1>

        <p className="text-gray-700 mb-4 text-center">Selecione um motivo para a denúncia:</p>

        <div className="space-y-3 mb-6">
          {motivos.map((motivo, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                motivoSelecionado === motivo
                  ? "bg-[#61a183] text-white border-[#61a183]"
                  : "bg-white border-gray-300 hover:bg-[#f0fdf7]"
              }`}
              onClick={() => setMotivoSelecionado(motivo)}
            >
              {motivo}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Adicione mais detalhes (opcional)..."
          className="w-full h-32 p-3 border border-gray-300 rounded-xl mb-6 resize-none focus:ring-2 focus:ring-[#61a183] outline-none"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
        />

        <button
          onClick={handleEnviar}
          className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-bold py-3 rounded-xl transition-all"
        >
          Enviar Denúncia
        </button>
      </div>

      {/* Modal de Confirmação */}
      {modalVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#61a183] mb-4">Confirmação</h2>
            <p className="mb-4">Tem certeza de que deseja enviar a denúncia?</p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmarEnvio}
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

      {/* Modal de Erro (Caso o motivo não seja selecionado) */}
      {modalErroVisivel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Erro</h2>
            <p className="mb-4">Por favor, selecione um motivo para a denúncia antes de enviar.</p>
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
            <h2 className="text-xl font-semibold text-green-500 mb-4">Sucesso!</h2>
            <p className="mb-4">Sua denúncia foi registrada com sucesso. Obrigado!</p>
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
