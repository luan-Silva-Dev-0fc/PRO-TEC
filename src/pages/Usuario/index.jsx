import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Usuario() {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário já está salvo no localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      router.push("/Home"); // Redireciona para a página inicial se já houver um usuário salvo
    }
  }, [router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file)); // Exibe a imagem selecionada
    }
  };

  const handleSave = () => {
    if (!nome || !foto) {
      setErro("Por favor, preencha seu nome e adicione uma foto.");
      setModalVisible(true);
      return;
    }

    // Salva as informações no localStorage
    const usuario = { nome, foto };
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redireciona para a página inicial
    router.push("/");
  };

  const closeModal = () => {
    setModalVisible(false);
    setErro("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#546c4a] mb-6">
          Complete seu Perfil
        </h2>

        {/* Modal de Erro */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <p className="text-red-500 font-semibold text-center">{erro}</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-[#546c4a] text-white rounded-lg hover:bg-[#7b9f77] transition duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        <form className="flex flex-col items-center">
          {/* Foto de Perfil (Bolinha no topo) */}
          <div className="mb-6">
            <input
              type="file"
              id="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="foto"
              className="cursor-pointer"
            >
              <div
                className="w-32 h-32 rounded-full bg-[#546c4a] border-4 border-white shadow-xl overflow-hidden flex justify-center items-center"
              >
                {foto ? (
                  <img
                    src={foto}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-3xl">+</span>
                )}
              </div>
            </label>
          </div>

          {/* Nome do Usuário */}
          <div className="mb-4 w-full">
            <label className="block text-sm font-semibold mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
          </div>

          {/* Botão de Salvar */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 bg-[#546c4a] text-white font-semibold rounded-lg hover:bg-[#7b9f77] transition duration-300 shadow-lg mt-4"
          >
            Salvar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}
