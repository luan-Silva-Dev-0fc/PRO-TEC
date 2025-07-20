"use client";

import { useState } from "react";

export default function SuportePage() {
  const [mensagemUsuario, setMensagemUsuario] = useState("");
  const [conversa, setConversa] = useState([
    { texto: "Olá, sou seu assistente virtual. Como posso ajudar?", tipo: "bot" },
  ]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [aguardandoAtendente, setAguardandoAtendente] = useState(false);

  const opcaoProblema = [
    "Problema técnico",
    "Dúvidas sobre conta",
    "Dúvidas sobre produtos",
    "Outros",
  ];

  const handleEnviarMensagem = () => {
    if (mensagemUsuario.trim() === "") return;

    const novaConversa = [
      ...conversa,
      { texto: mensagemUsuario, tipo: "usuario" },
    ];

    // Aqui a lógica de integração com API ou resposta automática do bot
    let respostaBot = "Desculpe, não entendi sua dúvida.";

    if (opcaoSelecionada === "Problema técnico") {
      respostaBot = "Você está com um problema técnico? Tente reiniciar o sistema.";
    } else if (opcaoSelecionada === "Dúvidas sobre conta") {
      respostaBot = "Você deseja alterar sua conta? Se sim, por favor, escolha uma opção.";
    } else if (opcaoSelecionada === "Dúvidas sobre produtos") {
      respostaBot = "Temos muitas opções de produtos. Qual categoria você precisa de ajuda?";
    }

    novaConversa.push({ texto: respostaBot, tipo: "bot" });

    setConversa(novaConversa);
    setMensagemUsuario("");
  };

  const handleEscolherOpcao = (opcao) => {
    setOpcaoSelecionada(opcao);
    setConversa([
      ...conversa,
      { texto: `Você escolheu: ${opcao}`, tipo: "usuario" },
    ]);

    // Mensagem do bot antes de encaminhar para o atendente
    setConversa((prevConversa) => [
      ...prevConversa,
      { texto: "Iremos encaminhar você para um atendente. Ela poderá atender você o mais rápido possível. Aguarde um momento.", tipo: "bot" },
    ]);

    // Simulando o tempo de espera antes de encaminhar
    setTimeout(() => {
      setAguardandoAtendente(true);
      setConversa((prevConversa) => [
        ...prevConversa,
        { texto: "Estamos encaminhando você para o atendente. Por favor, aguarde...", tipo: "bot" },
      ]);
    }, 2000); // Espera de 2 segundos antes de mostrar a mensagem de encaminhamento
  };

  const handleEncaminharAtendente = () => {
    setAguardandoAtendente(true);
    setConversa([
      ...conversa,
      { texto: "Estamos encaminhando você para um atendente...", tipo: "bot" },
    ]);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-6 border">
        <h1 className="text-3xl font-semibold text-[#61a183] mb-4 text-center">Suporte</h1>
        
        {/* Exibição da conversa */}
        <div className="space-y-4 mb-6 overflow-y-auto max-h-80">
          {conversa.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                msg.tipo === "usuario"
                  ? "bg-[#61a183] text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {msg.texto}
            </div>
          ))}
        </div>

        {/* Opções para o usuário escolher */}
        {!opcaoSelecionada && !aguardandoAtendente && (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">Por favor, escolha um problema:</p>
            <div className="flex flex-wrap gap-4">
              {opcaoProblema.map((opcao, index) => (
                <button
                  key={index}
                  onClick={() => handleEscolherOpcao(opcao)}
                  className="px-6 py-3 bg-[#61a183] text-white font-semibold rounded-lg shadow-md hover:bg-[#4c866a] transition-all"
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Caso o usuário tenha escolhido uma opção */}
        {opcaoSelecionada && !aguardandoAtendente && (
          <div className="mt-4">
            <p className="text-lg text-gray-700">Descreva seu problema:</p>
            <textarea
              value={mensagemUsuario}
              onChange={(e) => setMensagemUsuario(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg mt-2"
              placeholder="Digite sua mensagem"
            />
            <button
              onClick={handleEnviarMensagem}
              className="w-full bg-[#61a183] hover:bg-[#4c866a] text-white font-semibold py-3 rounded-lg mt-4"
            >
              Enviar
            </button>
          </div>
        )}

        {/* Caso o bot esteja aguardando o atendente */}
        {aguardandoAtendente && (
          <div className="mt-4">
            <p className="text-lg text-gray-700">Aguardando o atendente...</p>
          </div>
        )}

        {/* Botão para encaminhar para o atendente */}
        {!aguardandoAtendente && (
          <button
            onClick={handleEncaminharAtendente}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg mt-6"
          >
            Encaminhar para um atendente
          </button>
        )}
      </div>

      {/* Modal de Sucesso (Encaminhamento para atendente) */}
      {aguardandoAtendente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#61a183] mb-4">Encaminhamento para o atendente</h2>
            <p className="mb-4">Você será atendido em breve.</p>
            <button
              onClick={() => setAguardandoAtendente(false)}
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
