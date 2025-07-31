const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Ou o ponto de entrada do seu app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    // Adicionando o Workbox para gerar o service worker
    new GenerateSW({
      swDest: 'public/service-worker.js',  // Caminho do Service Worker gerado
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',  // Estratégia de cache para navegação
          handler: 'NetworkFirst',  // Estratégia de cache
          options: {
            cacheName: 'pages',
            expiration: {
              maxEntries: 50,  // Limita o número de páginas em cache
            },
          },
        },
      ],
    }),
  ],
};
