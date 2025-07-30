'use client';
import Head from 'next/head';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Particles } from '@tsparticles/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos obrigatórios.');
      setSuccess('');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4028/usuario/login', {
        email,
        senha: password
      });

      const { token, usuario } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setError('');
      setSuccess('Login bem-sucedido!');
      
      setTimeout(() => {
        router.push('/Home');
      }, 1500);
    } catch (err) {
      setSuccess('');
      if (err.response?.data?.mensagem === 'Senha incorreta') {
        setError('As informações estão incorretas. Caso não tenha conta, é necessário criar uma.');
      } else {
        setError(err.response?.data?.mensagem || 'Erro ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
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
    <>
      <Head>
        <meta name="theme-color" content="#546c4a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192x192.png" />
      </Head>

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
        <Particles init={particlesInit} options={particlesOptions} />
        <div className="bg-white rounded-4xl shadow-xl max-w-7xl w-full flex flex-col md:flex-row z-10 animate-[fadeIn_0.6s_ease-out] border border-[#d4eadd]">
          <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#61a183] mb-6 text-center">Entrar no Ecoprof</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className="w-full px-5 py-4 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183] transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Senha <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
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
              <button
                type="submit"
                className="w-full bg-[#61a183] text-white py-4 rounded-2xl font-semibold hover:bg-[#4f8b6b] shadow-md transition"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-10 flex flex-col items-center w-full">
              <h2 className="text-3xl font-bold text-[#61a183] mb-4 text-center">
                Novo por aqui?
              </h2>
              <p className="mb-6 text-center">
                Crie sua conta e comece a usar o Ecoprof agora mesmo.
              </p>
              <a
                href="/cadastro"
                className="px-8 py-4 bg-[#61a183] text-white font-semibold rounded-2xl hover:bg-[#4f8b6b] transition shadow"
              >
                Cadastre-se
              </a>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center relative animate-[slideInRight_0.6s_ease-out]">
            <img
              src="/animado.svg"
              alt="Animação"
              className="w-[80%] h-auto animate-float"
            />
          </div>
        </div>
      </div>
    </>
  );
}
