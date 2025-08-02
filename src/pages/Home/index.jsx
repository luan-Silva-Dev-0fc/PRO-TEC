import { useEffect, useState } from "react";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { TbSettingsSearch } from "react-icons/tb";
import { useRouter } from "next/router";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redireciona para a tela de login se não estiver autenticado
    }
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const botoes = [
    { href: "/matematica", label: "Matemática", img: "/gifs/matematica-unscreen.gif" },
    { href: "/portugues", label: "Português", img: "/gifs/portugues.gif" },
    { href: "/fisica", label: "Física", img: "/gifs/fisica.gif" },
    { href: "/quimica", label: "Química", img: "/gifs/quimica.gif" },
    { href: "/biologia", label: "Biologia", img: "/gifs/biologia.gif" },
    { href: "/historia", label: "História", img: "/gifs/historia.gif" },
    { href: "/geografia", label: "Geografia", img: "/gifs/Geografia.gif" },
    { href: "/filosofia", label: "Filosofia", img: "/gifs/filodofia.gif" },
    { href: "/sociologia", label: "Sociologia", img: "/gifs/dociologia.gif" },
    { href: "/ingles", label: "Inglês", img: "/gifs/ingles.gif" },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen relative overflow-x-hidden">
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 text-3xl text-[#546c4a] focus:outline-none transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-[260px]" : ""}`}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-[#546c4a] text-white p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} rounded-r-lg`}
      >
        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <Link
          href="/denuncia"
          className="flex items-center justify-center gap-2 py-3 mb-4 text-white font-semibold text-lg bg-[#546c4a] border-2 border-[#7b9f77] hover:bg-[#7b9f77] hover:border-[#546c4a] rounded-lg transition-all duration-300"
        >
          Canais de denúncia
        </Link>

        <Link
          href="/configuracao"
          className="flex items-center gap-2 w-full py-2 mb-4 hover:text-green-200 transition-colors"
        >
          <TbSettingsSearch size={20} />
          <span>Configurações</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full py-2 hover:text-red-300 transition-colors"
        >
          <IoLogOutOutline size={20} />
          <span>Sair</span>
        </button>
      </div>

      <header className="flex flex-col items-center pt-5">
        <img
          src="/animacao.svg"
          alt="Animação"
          className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-3 transition-opacity duration-1000 banner-svg"
        />
        <img
          src="/logo/logo.png"
          alt="Logo EcoProf"
          className="hidden opacity-0 transition-opacity duration-1000 banner-logo w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
        />
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6 py-12 max-w-[1200px] mx-auto">
        {botoes.map(({ href, label, img }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-110 hover:rotate-1 hover:shadow-2xl"
          >
            <img src={img} alt={label} className="w-16 h-16 mb-3" />
            <span className="text-center font-semibold">{label}</span>
          </Link>
        ))}
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-[#546c4a] bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-[400px] md:w-[500px]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Deseja sair?</h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={confirmLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Sim
              </button>
              <button
                onClick={cancelLogout}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
