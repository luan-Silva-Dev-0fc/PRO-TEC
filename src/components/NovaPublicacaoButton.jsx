'use client'
import { useState } from 'react'

export default function NovaPublicacaoButton({ usuario }) {
  const [mostrarModalLegenda, setMostrarModalLegenda] = useState(false)
  const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false)
  const [arquivo, setArquivo] = useState(null)
  const [legenda, setLegenda] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const abrirGaleria = () => {
    document.getElementById('input-galeria').click()
  }

  const handleArquivoSelecionado = (e) => {
    const file = e.target.files[0]
    if (file) {
      setArquivo(file)
      setPreviewUrl(URL.createObjectURL(file))
      setMostrarModalLegenda(true)
    }
  }

  const publicar = async () => {
    const token = localStorage.getItem('token') // <-- recupera o token JWT
    const tipo = arquivo.type.startsWith('video') ? 'video' : 'foto'
    const formData = new FormData()
    formData.append('conteudo', legenda)
    formData.append('tipo', tipo)
    formData.append('usuarioId', usuario.id)
    formData.append('arquivo', arquivo)

    const res = await fetch('http://localhost:4028/publicacao', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}` // <-- envia o token no header
      },
      body: formData
    })

    if (res.ok) {
      setMostrarModalLegenda(false)
      setMostrarModalConfirmacao(true)
      setTimeout(() => {
        setMostrarModalConfirmacao(false)
        setLegenda('')
        setArquivo(null)
        setPreviewUrl('')
        window.location.reload()
      }, 2000)
    }
  }

  return (
    <>
      <button
        onClick={abrirGaleria}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#61a183',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          fontSize: 30,
          zIndex: 1000
        }}
      >
        +
      </button>

      <input
        id="input-galeria"
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={handleArquivoSelecionado}
      />

      {mostrarModalLegenda && (
        <div style={modalEstilo}>
          <h3 style={{ marginBottom: 10 }}>O que você está pensando?</h3>
          <textarea
            placeholder="Digite sua legenda..."
            value={legenda}
            onChange={(e) => setLegenda(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          {previewUrl &&
            (arquivo.type.startsWith('image') ? (
              <img
                src={previewUrl}
                alt="preview"
                style={{ width: '100%', marginBottom: 10, borderRadius: 8 }}
              />
            ) : (
              <video
                src={previewUrl}
                controls
                style={{ width: '100%', marginBottom: 10, borderRadius: 8 }}
              />
            ))}
          <button onClick={publicar} style={botaoPublicar}>
            Publicar
          </button>
          <button onClick={() => setMostrarModalLegenda(false)} style={botaoCancelar}>
            Cancelar
          </button>
        </div>
      )}

      {mostrarModalConfirmacao && (
        <div style={modalEstilo}>
          <h3>Publicado com sucesso!</h3>
        </div>
      )}
    </>
  )
}

const modalEstilo = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  zIndex: 1000,
  width: '90%',
  maxWidth: 400
}

const botaoPublicar = {
  backgroundColor: '#61a183',
  color: 'white',
  border: 'none',
  padding: 10,
  width: '100%',
  borderRadius: 5,
  marginBottom: 10
}

const botaoCancelar = {
  backgroundColor: '#ccc',
  border: 'none',
  padding: 10,
  width: '100%',
  borderRadius: 5
}
