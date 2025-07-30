import { useEffect, useState } from 'react'
import ListaPublicacoes from '@/components/ListaPublicacoes'
import NovaPublicacaoButton from '@/components/NovaPublicacaoButton'
import axios from 'axios'

export default function Home() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    axios.get('http://localhost:4028/usuario/10', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsuario(res.data))
      .catch(err => console.error('Erro ao buscar usuário:', err))
  }, [])

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      {usuario && <NovaPublicacaoButton usuario={usuario} />}
      <ListaPublicacoes />
    </main>
  )
}
