export default function Aviso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center border-l-8"
        style={{ borderColor: '#546c4a' }}
      >
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-[#546c4a]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856C18.07 18.165 19 16.21 19 14c0-3.866-3.582-7-8-7S3 10.134 3 14c0 2.21.93 4.165 2.062 5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Recurso em construção
        </h2>
        <p className="text-gray-600 mb-4">
          Ainda estamos trabalhando para construir este recurso. <br />
          Mas por enquanto ele está indisponível.
        </p>
        <button
          className="mt-4 px-6 py-2 rounded-full text-white font-medium shadow-md hover:shadow-lg transition bg-[#546c4a]"
          onClick={() => window.location.href = '/Home'}
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}
