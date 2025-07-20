import { useState, useCallback } from 'react';
import { Particles } from '@tsparticles/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    // Enviar para o back-end aqui (futuramente com Axios)
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-white relative overflow-hidden">
      <Particles init={particlesInit} options={particlesOptions} />

      <div className="bg-white rounded-4xl shadow-xl max-w-3xl w-full flex flex-col md:flex-row z-10 animate-[fadeIn_0.6s_ease-out] border border-[#d4eadd]">
        <div className="w-full p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#61a183] mb-6 text-center">Criar conta no Ecoprof</h2>

          {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[{ label: 'Nome completo', value: nome, setter: setNome },
              { label: 'Email', value: email, setter: setEmail }]
              .map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={label === 'Email' ? 'email' : 'text'}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={`Digite seu ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183] transition"
                  />
                </div>
              ))}

            {[{ label: 'Senha', value: senha, setter: setSenha },
              { label: 'Confirmar senha', value: confirmarSenha, setter: setConfirmarSenha }]
              .map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
                      value={value}
                      onChange={e => setter(e.target.value)}
                      placeholder={`Digite sua ${label.toLowerCase()}`}
                      className="w-full px-4 py-3 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183] transition"
                    />
                    <span
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {mostrarSenha ? <FaEyeSlash className="w-5 h-5 text-gray-500" /> : <FaEye className="w-5 h-5 text-gray-500" />}
                    </span>
                  </div>
                </div>
              ))}

            <button
              type="submit"
              className="w-full bg-[#61a183] text-white py-3 rounded-2xl font-semibold hover:bg-[#4f8b6b] shadow-md transition"
            >
              Criar Conta
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">Já tem uma conta?</p>
            <a
              href="/login"
              className="inline-block mt-2 px-6 py-3 bg-[#61a183] text-white font-semibold rounded-2xl hover:bg-[#4f8b6b] transition shadow"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
