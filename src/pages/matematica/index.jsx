import { useEffect, useState } from 'react'
import ListaPublicacoes from '@/components/ListaPublicacoes'
import NovaPublicacaoButton from '@/components/NovaPublicacaoButton'
import axios from 'axios'

export default function Home() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    // Atualizando a URL para o link da API no Railway
    axios.get('https://api-ecoprof-production.up.railway.app/usuario/10', {
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
