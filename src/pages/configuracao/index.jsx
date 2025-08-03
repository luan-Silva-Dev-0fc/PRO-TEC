'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Perfil() {
  const [perfil, setPerfil] = useState(null)
  const [erro, setErro] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [foto, setFoto] = useState(null)
  const [modal, setModal] = useState(null) // null | 'confirm' | 'loading' | 'success'
  const router = useRouter()
  const inputRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return setErro('Você precisa estar logado para acessar o perfil.')

    axios.get('https://api-ecoprof-production.up.railway.app/perfil', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setPerfil(res.data)
        setNome(res.data.nome || '')
        setEmail(res.data.email || '')
      })
      .catch(() => setErro('Erro ao buscar perfil'))
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!nome || !email || !senha) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }
    setModal('confirm')
  }

  const confirmarAtualizacao = () => {
    const token = localStorage.getItem('token')
    if (!token) return setErro('Token não encontrado')

    setModal('loading')

    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('senha', senha)
    if (foto) formData.append('foto', foto)

    axios.put('https://api-ecoprof-production.up.railway.app/atualizar-perfil', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        setModal('success')
        setTimeout(() => router.push('/Home'), 2000)
      })
      .catch(() => {
        setErro('Erro ao atualizar perfil')
        setModal(null)
      })
  }

  const abrirSeletor = () => inputRef.current?.click()
  const aoSelecionarImagem = (e) => setFoto(e.target.files[0])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f0f5f2] p-4 sm:p-6 overflow-hidden">
      {/* Animação de fundo com gradiente */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-[#546c4a] via-[#7a9b67] to-[#cfe5d2] opacity-10 z-0" />

      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center">
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={foto ? URL.createObjectURL(foto) : `https://api-ecoprof-production.up.railway.app${perfil?.foto}`}
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#546c4a]"
          />
          <button
            type="button"
            onClick={abrirSeletor}
            className="absolute bottom-0 right-0 bg-[#546c4a] text-white w-8 h-8 rounded-full text-lg flex items-center justify-center"
          >
            +
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={aoSelecionarImagem}
            className="hidden"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-[#546c4a]">{perfil?.nome}</h2>
        <p className="text-gray-500 text-sm mb-6">{perfil?.email}</p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4 text-left">
          <label className="text-sm font-semibold text-[#546c4a]">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-2 border rounded-xl focus:outline-[#546c4a]"
          />

          <label className="text-sm font-semibold text-[#546c4a]">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-xl focus:outline-[#546c4a]"
          />

          <label className="text-sm font-semibold text-[#546c4a]">Nova senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-2 border rounded-xl focus:outline-[#546c4a]"
          />

          <button
            type="submit"
            className="mt-2 py-2 bg-[#546c4a] text-white rounded-xl hover:bg-[#3c4e38] transition"
          >
            Atualizar Perfil
          </button>
        </form>
      </div>

      {/* Modal de confirmação */}
      {modal === 'confirm' && (
        <Modal>
          <p className="text-lg font-medium mb-4 text-[#546c4a]">
             tem certeza que você deseja atualizar?
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setModal(null)}
              className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={confirmarAtualizacao}
              className="px-4 py-2 bg-[#546c4a] text-white rounded-xl hover:bg-[#3c4e38]"
            >
              Sim
            </button>
          </div>
        </Modal>
      )}

      {/* Modal de carregamento */}
      {modal === 'loading' && (
        <Modal>
          <p className="text-lg font-medium text-[#546c4a]">Aguarde um momento enquanto estamos atualizando...</p>
          <div className="mt-4 w-6 h-6 border-4 border-[#546c4a] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </Modal>
      )}

      {/* Modal de sucesso */}
      {modal === 'success' && (
        <Modal>
          <p className="text-lg font-medium text-green-600">Perfil atualizado com sucesso!</p>
        </Modal>
      )}

      {erro && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg z-20">
          {erro}
        </div>
      )}

      {/* Keyframes para animação gradiente */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  )
}

// Componente Modal
function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center animate-fadeIn">
        {children}
      </div>
    </div>
  )
}
