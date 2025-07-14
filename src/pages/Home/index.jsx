import { useState, useEffect } from "react";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { TbSettingsSearch } from "react-icons/tb";
import { useRouter } from "next/router";  // Para navegação programática

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();  // Instancia o roteador do Next.js

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Limpa os dados de autenticação (se houver)
    localStorage.removeItem("user"); // Se você tiver guardado os dados do usuário no localStorage
    router.push("/"); // Redireciona para a página inicial
  };

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "escuro") {
      document.body.classList.add("dark-mode");
    }

    const frases = [
      "Bem-vindo ao EcoProf!",
      "Explore o conteúdo de várias áreas do conhecimento!",
    ];
    startTypingAnimation(frases);

    function startTypingAnimation(frases) {
      const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
      let i = 0;
      const typingEl = document.getElementById("typing-text");

      function typeText(text, callback) {
        function type() {
          if (i <= text.length) {
            typingEl.textContent = text.substring(0, i);
            i++;
            setTimeout(type, 100);
          } else {
            setTimeout(() => callback(), 3000);
          }
        }
        type();
      }

      function eraseText(callback) {
        let text = typingEl.textContent;
        let i = text.length;
        function erase() {
          if (i >= 0) {
            typingEl.textContent = text.substring(0, i);
            i--;
            setTimeout(erase, 50);
          } else {
            callback();
          }
        }
        erase();
      }

      typeText(fraseAleatoria, () => {
        eraseText(() => {
          const bannerSvg = document.querySelector(".banner-svg");
          if (bannerSvg) {
            bannerSvg.style.opacity = "0";
            setTimeout(() => {
              bannerSvg.style.display = "none";
              const bannerLogo = document.querySelector(".banner-logo");
              if (bannerLogo) {
                bannerLogo.style.display = "block";
                bannerLogo.style.opacity = "1";
                typeText("Bem-vindo ao EcoProf", () => {
                  const dot = document.querySelector(".dot");
                  if (dot) {
                    dot.style.display = "none";
                  }
                });
              }
            }, 1000);
          }
        });
      });
    }
  }, []);

  const botoes = [
    { href: "/matematica", label: "Matemática", img: "matematica-unscreen.gif" },
    { href: "/portugues", label: "Português", img: "portugues.gif" },
    { href: "/fisica", label: "Física", img: "fisica.gif" },
    { href: "/quimica", label: "Química", img: "quimica.gif" },
    { href: "/biologia", label: "Biologia", img: "dna-unscreen.gif" },
    { href: "/historia", label: "História", img: "historia.gif" },
    { href: "/geografia", label: "Geografia", img: "Geografia.gif" },
    { href: "/filosofia", label: "Filosofia", img: "filodofia.gif" },
    { href: "/sociologia", label: "Sociologia", img: "dociologia.gif" },
    { href: "/ingles", label: "Inglês", img: "ingles.gif" },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen relative overflow-x-hidden">
      {/* Botão menu ☰ / ✕ */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 text-3xl text-[#546c4a] focus:outline-none transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-[260px]' : ''}`}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Gaveta lateral esquerda */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-[#546c4a] text-white p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } rounded-r-lg`}
      >
        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <Link
          href="/denuncia-ambiental"
          className="block py-2 mb-4 text-lg font-semibold hover:text-green-200 transition-colors"
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

      {/* Conteúdo principal */}
      <header className="flex flex-col items-center pt-5">
        <img
          src="environment-animate.svg"
          alt="Animação"
          className="w-full max-w-[300px] mb-3 transition-opacity duration-1000 banner-svg"
        />
        <img
          src="https://raw.githubusercontent.com/luanzinho0fc/feira-de-ciencias/refs/heads/main/LogoMakerCa-1745319933968.png"
          alt="Logo EcoProf"
          className="hidden opacity-0 transition-opacity duration-1000 banner-logo w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
        <div className="flex items-center justify-center gap-2 mt-2 min-h-[30px] text-2xl font-bold text-[#546c4a]">
          <span id="typing-text"></span>
          <div className="w-2.5 h-2.5 rounded-full bg-[#546c4a] animate-blinkDot dot"></div>
        </div>
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
    </div>
  );
}
