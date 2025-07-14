import { useState, useCallback } from 'react';
import { Particles } from '@tsparticles/react';
import { FaFacebookF, FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setError('');
  };

  const particlesInit = useCallback(async (engine) => {
    const { loadFull } = await import('tsparticles');
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "#61a183" } },
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
    },
    particles: {
      shape: {
        type: 'image',
        image: {
          src: 'https://cdn-icons-png.flaticon.com/512/427/427735.png',
          width: 20,
          height: 20
        }
      },
      number: { value: 50, density: { enable: true, area: 800 } },
      size: { value: { min: 10, max: 20 } },
      move: { enable: true, direction: 'top', speed: { min: 1, max: 3 }, outModes: { default: 'out' } },
      opacity: { value: { min: 0.4, max: 0.8 } }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
      <Particles init={particlesInit} options={particlesOptions} />
      <div className="bg-white rounded-4xl shadow-xl max-w-7xl w-full flex flex-col md:flex-row z-10 animate-[fadeIn_0.6s_ease-out] border border-[#d4eadd]">
        <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#61a183] mb-6 text-center">Entrar no Ecoprof</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {[{ label: 'Email', type: 'email', value: email, setter: setEmail }]
              .map(({ label, type, value, setter }) => (
                <div key={label}>
                  <label className="block text-gray-700 mb-1 font-medium">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={type}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={`Digite seu ${label.toLowerCase()}`}
                    className="w-full px-5 py-4 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183] transition"
                  />
                </div>
            ))}
            {[{ label: 'Senha', type: showPassword ? 'text' : 'password', value: password, setter: setPassword }]
              .map(({ label, type, value, setter }) => (
                <div key={label}>
                  <label className="block text-gray-700 mb-1 font-medium">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={type}
                      value={value}
                      onChange={e => setter(e.target.value)}
                      placeholder={`Digite sua ${label.toLowerCase()}`}
                      className="w-full px-5 py-4 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183] transition"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash className="w-5 h-5 text-gray-500" /> : <FaEye className="w-5 h-5 text-gray-500" />}
                    </span>
                  </div>
                </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#61a183] text-white py-4 rounded-2xl font-semibold hover:bg-[#4f8b6b] shadow-md transition"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 gap-4 w-full">
            {[{
              icon: <FaGoogle />, text: "Google"
            }, {
              icon: <FaFacebookF />, text: "Facebook"
            }, {
              icon: <FaGithub />, text: "GitHub"
            }, {
              icon: <RiTwitterXLine />, text: "X"
            }].map(({ icon, text }) => (
              <button key={text} className="flex items-center justify-center w-full border border-[#61a183]/30 py-3 rounded-2xl hover:bg-[#f0fef8] text-[#61a183] font-medium shadow-sm transition">
                {icon}
                <span className="ml-2">Entrar com {text}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center md:hidden w-full">
            <h2 className="text-3xl font-bold text-[#61a183] mb-4 text-center">
              Novo por aqui?
            </h2>
            <p className="mb-6 text-center">
              Crie sua conta e comece a usar o Ecoprof agora mesmo.
            </p>
            <a
              href="#"
              className="px-8 py-4 bg-[#61a183] text-white font-semibold rounded-2xl hover:bg-[#4f8b6b] transition shadow"
            >
              Cadastre-se
            </a>
          </div>
        </div>

        {/* Lado direito com SVG animado */}
        <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center relative animate-[slideInRight_0.6s_ease-out]">
          <img
            src="/animado.svg"
            alt="Animação"
            className="w-[80%] h-auto animate-float"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
