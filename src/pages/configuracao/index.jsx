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

    if (!token) {
      setErro('Token não encontrado')
      return
    }

    // Substituindo URL para o link da API no Railway
    axios.get('https://api-ecoprof-production.up.railway.app/perfil', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPerfil(res.data)
        setNome(res.data.nome)
        setEmail(res.data.email)
      })
      .catch(err => {
        console.error(err)
        setErro('Erro ao buscar perfil')
      })
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      setErro('Token não encontrado')
      return
    }

    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('senha', senha)
    if (foto) formData.append('foto', foto)

    // Substituindo URL para o link da API no Railway
    axios.put('https://api-ecoprof-production.up.railway.app/atualizar-perfil', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        router.push('/perfil')
      })
      .catch(err => {
        console.error(err)
        setErro('Erro ao atualizar perfil')
      })
  }

  const handleDelete = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setErro('Token não encontrado')
      return
    }

    // Substituindo URL para o link da API no Railway
    axios.delete('https://api-ecoprof-production.up.railway.app/destruir-perfil', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        localStorage.removeItem('token')
        router.push('/')
      })
      .catch(err => {
        console.error(err)
        setErro('Erro ao excluir perfil')
      })
  }

  const abrirSeletor = () => {
    if (inputRef.current) inputRef.current.click()
  }

  const aoSelecionarImagem = (e) => {
    const arquivo = e.target.files[0]
    if (arquivo) setFoto(arquivo)
  }

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-500 text-lg">
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f5f2] p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center relative">
        <div className="relative inline-block">
          <img
            src={foto ? URL.createObjectURL(foto) : `https://api-ecoprof-production.up.railway.app${perfil.foto}`}
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-[#546c4a]"
          />
          <button
            type="button"
            onClick={abrirSeletor}
            className="absolute bottom-2 right-2 bg-[#546c4a] text-white w-8 h-8 rounded-full flex items-center justify-center text-xl"
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

        <h2 className="mt-4 text-2xl font-semibold text-[#546c4a]">{perfil.nome}</h2>

        <form onSubmit={handleUpdate} className="mt-6">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="w-full p-2 mb-4 border rounded-xl"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full p-2 mb-4 border rounded-xl"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Nova senha"
            className="w-full p-2 mb-4 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#546c4a] text-white rounded-xl hover:bg-[#40533f]"
          >
            Atualizar Perfil
          </button>
        </form>

        <button
          onClick={handleDelete}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 focus:outline-none"
        >
          Excluir Conta
        </button>
      </div>
    </div>
  )
}
