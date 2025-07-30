import axios from 'axios';

// Criação de uma instância do axios
const api = axios.create({
  baseURL: 'http://localhost:4028', // URL base do seu backend (ajuste conforme necessário)
  headers: {
    'Content-Type': 'multipart/form-data', // Tipo de conteúdo para upload de arquivos
  },
});

// Configuração de interceptors, se necessário
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Você pode adicionar tratamento global de erros aqui
    console.error('Erro na requisição', error);
    return Promise.reject(error);
  }
);

export default api;
