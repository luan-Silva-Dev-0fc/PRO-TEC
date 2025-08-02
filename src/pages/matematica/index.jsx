import { useEffect, useState } from 'react'
import ListaPublicacoes from '@/components/ListaPublicacoes'
import NovaPublicacaoButton from '@/components/NovaPublicacaoButton'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home() {
  const [usuario, setUsuario] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/') // Redireciona para login se não houver token
      return
    }

    axios.get('https://api-ecoprof-production.up.railway.app/usuario/15', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsuario(res.data))
      .catch(err => {
        console.error('Erro ao buscar usuário:', err)
        router.push('/') // Redireciona se a autenticação falhar
      })
  }, [])

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      {usuario && <NovaPublicacaoButton usuario={usuario} />}
      <ListaPublicacoes />
    </main>
  )
}
