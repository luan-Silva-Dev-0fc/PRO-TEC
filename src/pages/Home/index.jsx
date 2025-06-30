import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "escuro") {
      document.body.classList.add("dark-mode");
    }

    async function fetchFrases() {
      try {
        const frases = [
          "Bem-vindo ao EcoProf!",
          "Explore o conteúdo de várias áreas do conhecimento!",
        ];
        startTypingAnimation(frases);
      } catch (error) {
        console.error("Erro ao buscar as frases:", error);
      }
    }

    async function startTypingAnimation(frases) {
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
            setTimeout(() => callback(), 3500);
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
            setTimeout(erase, 100);
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

    fetchFrases();
  }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen transition-all duration-300">
      <div
        id="sidebar"
        className={`fixed top-0 right-[-260px] w-[250px] h-full bg-[#f5f5f5] shadow-lg transition-all duration-300 z-10 p-6 text-left ${sidebarOpen ? 'right-0' : ''}`}
      >
        <h2 className="text-xl mb-5 text-[#546c4a]">Menu</h2>
        <Link href="/denuncia-ambiental" className="block py-2 text-lg font-bold text-gray-800 hover:text-green-600">
          Canais de denúncia
        </Link>
      </div>

      <button
        id="menu-btn"
        className="fixed top-5 right-5 text-3xl z-20 text-[#546c4a] focus:outline-none"
        onClick={toggleSidebar}
      >
        ⋮
      </button>

      <header className="flex flex-col items-center pt-5">
        <img src="environment-animate.svg" alt="Animação" className="w-full max-w-[300px] mb-3 transition-opacity duration-1000 banner-svg" />
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-5 py-10 max-w-[1000px] mx-auto">
        <Link href="/matematica" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="matematica-unscreen.gif" alt="Matematica" className="w-15 h-15 mb-2" />
          Matemática
        </Link>
        <Link href="/portugues" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="portugues.gif" alt="Portugues" className="w-15 h-15 mb-2" />
          Português
        </Link>
        <Link href="/fisica" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="fisica.gif" alt="Fisica" className="w-15 h-15 mb-2" />
          Física
        </Link>
        <Link href="/quimica" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="quimica.gif" alt="Quimica" className="w-15 h-15 mb-2" />
          Química
        </Link>
        <Link href="/biologia" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="dna-unscreen.gif" alt="Biologia" className="w-15 h-15 mb-2" />
          Biologia
        </Link>
        <Link href="/historia" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="historia.gif" alt="Historia" className="w-15 h-15 mb-2" />
          História
        </Link>
        <Link href="/geografia" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="Geografia.gif" alt="Geografia" className="w-15 h-15 mb-2" />
          Geografia
        </Link>
        <Link href="/filosofia" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="filodofia.gif" alt="Filosofia" className="w-15 h-15 mb-2" />
          Filosofia
        </Link>
        <Link href="/sociologia" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="dociologia.gif" alt="Sociologia" className="w-15 h-15 mb-2" />
          Sociologia
        </Link>
        <Link href="/ingles" className="btn bg-[#546c4a] hover:bg-[#7b9f77] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105">
          <img src="ingles.gif" alt="Ingles" className="w-15 h-15 mb-2" />
          Inglês
        </Link>
      </div>
    </div>
  );
}
