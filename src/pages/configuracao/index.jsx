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
  const router = useRouter()
  const inputRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return setErro('Token não encontrado')

    axios.get('https://api-ecoprof-production.up.railway.app/perfil', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setPerfil(res.data)
        setNome(res.data.nome)
        setEmail(res.data.email)
      })
      .catch(() => setErro('Erro ao buscar perfil'))
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) return setErro('Token não encontrado')

    if (!nome || !email || !senha) return setErro('Preencha todos os campos obrigatórios.')

    if (!confirm('Tem certeza que deseja atualizar seu perfil?')) return

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
      .then(() => router.push('/perfil'))
      .catch(() => setErro('Erro ao atualizar perfil'))
  }

  const handleDelete = () => {
    const token = localStorage.getItem('token')
    if (!token) return setErro('Token não encontrado')

    if (!confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.')) return

    axios.delete('https://api-ecoprof-production.up.railway.app/destruir-perfil', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem('token')
        router.push('/')
      })
      .catch(() => setErro('Erro ao excluir perfil'))
  }

  const abrirSeletor = () => inputRef.current?.click()
  const aoSelecionarImagem = (e) => setFoto(e.target.files[0])

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600 font-semibold">
        {erro}
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        Carregando perfil...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f5f2] p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={foto ? URL.createObjectURL(foto) : `https://api-ecoprof-production.up.railway.app${perfil.foto}`}
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

        <h2 className="mt-4 text-2xl font-bold text-[#546c4a]">{perfil.nome}</h2>
        <p className="text-gray-500 text-sm mb-6">{perfil.email}</p>

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

        <button
          onClick={handleDelete}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Excluir Conta
        </button>
      </div>
    </div>
  )
}
