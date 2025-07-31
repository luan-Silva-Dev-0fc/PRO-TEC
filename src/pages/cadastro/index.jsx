import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [foto, setFoto] = useState(null);
  const [genero, setGenero] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('confirmarSenha', confirmarSenha);
    formData.append('genero', genero);
    if (foto) formData.append('foto', foto);

    try {
      const response = await axios.post('https://api-ecoprof-production.up.railway.app/usuario/cadastro', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSucesso('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => router.push('/'), 3000);
      } else {
        setErro('Erro ao criar a conta, tente novamente.');
      }
    } catch (err) {
      setErro('Erro ao criar a conta, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f8f9] p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-[#61a183] mb-6 text-center">Criar Conta no EcoProf</h2>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
        {sucesso && <p className="text-green-500 text-center mb-4">{sucesso}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-2 mb-6">
            <label className="cursor-pointer">
              <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-[#61a183] flex items-center justify-center overflow-hidden">
                {foto ? (
                  <img src={URL.createObjectURL(foto)} alt="Foto do usuário" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#61a183] text-3xl">+</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} className="hidden" />
            </label>
            <p className="text-center text-sm text-gray-500">Foto (opcional)</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Nome completo <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-4 py-3 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full px-4 py-3 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
            />
          </div>

          {[{ label: 'Senha', value: senha, setter: setSenha }, { label: 'Confirmar senha', value: confirmarSenha, setter: setConfirmarSenha }].map(({ label, value, setter }) => (
            <div key={label}>
              <label className="block text-gray-700 font-medium mb-1">{label} <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={`Digite sua ${label.toLowerCase()}`}
                  className="w-full px-4 py-3 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
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

          <div>
            <label className="block text-gray-700 font-medium mb-1">Gênero</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full px-4 py-3 border border-[#61a183]/30 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Não-binário">Não-binário</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#61a183] text-white py-3 rounded-2xl font-semibold hover:bg-[#4f8b6b] transition duration-300 shadow-md"
          >
            Criar Conta
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Já tem uma conta?</p>
          <a href="/" className="inline-block mt-2 px-6 py-3 bg-[#61a183] text-white font-semibold rounded-2xl hover:bg-[#4f8b6b] transition duration-300 shadow">
            Entrar
          </a>
        </div>
      </div>
    </div>
  );
}
