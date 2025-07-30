import { FiPhone, FiGlobe } from "react-icons/fi";

export default function CanaisDenuncia() {
  const canais = [
    {
      nome: "Disque Natureza (SEMA – Ceará)",
      descricao: "Denúncias ambientais em todo o estado do Ceará.",
      contato: "0800 275 2233",
      link: "https://www.semace.ce.gov.br/fiscalizacao-ambiental/denuncias/"
    },
    {
      nome: "Semace Mobile (App ou Online)",
      descricao: "Denúncias pelo aplicativo ou formulário digital.",
      link: "https://www.semace.ce.gov.br/fiscalizacao-ambiental/denuncias/"
    },
    {
      nome: "Ouvidoria da Semace",
      descricao: "Atendimento direto ao cidadão para questões ambientais.",
      contato: "(85) 3101-5520",
      link: "https://www.ouvidoria.ce.gov.br"
    },
    {
      nome: "DPMA – Delegacia Ambiental",
      descricao: "Delegacia especializada em crimes ambientais (Fortaleza).",
      contato: "(85) 3101-7596 | WhatsApp: (85) 98439-9110",
      link: "https://www.instagram.com/dpma_ce"
    },
    {
      nome: "SEUMA – Prefeitura de Fortaleza",
      descricao: "Secretaria de Urbanismo e Meio Ambiente.",
      contato: "(85) 3771-6612",
      link: "https://urbanismoemeioambiente.fortaleza.ce.gov.br/servicos/311-fale-com-a-seuma"
    },
    {
      nome: "Fiscalize Fortaleza (Agefis)",
      descricao: "Canal de denúncias da prefeitura.",
      link: "https://denuncia.agefis.fortaleza.ce.gov.br"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4fdf6] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#546c4a]">🌿 Denúncias Ambientais</h1>
          <p className="text-sm text-gray-500 mt-2">Canais oficiais do Ceará e Fortaleza</p>
        </div>
        <div className="space-y-5 max-h-[70vh] overflow-y-auto custom-scroll">
          {canais.map((canal, i) => (
            <div
              key={i}
              className="bg-[#f8fcf9] rounded-2xl p-4 border border-[#cfe7d6] shadow-sm"
            >
              <h2 className="text-base font-semibold text-[#2f4f2f] mb-1">
                {canal.nome}
              </h2>
              <p className="text-sm text-gray-700">{canal.descricao}</p>
              {canal.contato && (
                <p className="flex items-center text-sm mt-2 text-[#3d5c3d]">
                  <FiPhone className="mr-1" />
                  {canal.contato}
                </p>
              )}
              <a
                href={canal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center w-full bg-[#546c4a] text-white text-sm font-medium py-2 px-4 rounded-xl transition hover:bg-[#3e5237] active:scale-95"
              >
                <FiGlobe className="mr-2" />
                Acessar Canal
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
