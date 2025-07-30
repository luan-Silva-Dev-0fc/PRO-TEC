const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /_next\/static\/chunks\/.*\.(js|css)/,  // Arquivos de chunks estáticos
      handler: 'CacheFirst',  // Tenta carregar do cache primeiro
      options: {
        cacheName: 'static-chunks-cache',  // Nome do cache
        expiration: {
          maxEntries: 100,  // Número máximo de entradas no cache
          maxAgeSeconds: 60 * 60 * 24 * 30,  // Expiração após 30 dias
        },
      },
    },
    {
      urlPattern: /_next\/static\/media\/.*\.(jpg|jpeg|png|svg|webp|gif)/,  // Arquivos de imagem
      handler: 'CacheFirst',  // Tenta carregar do cache primeiro
      options: {
        cacheName: 'static-media-cache',  // Nome do cache
        expiration: {
          maxEntries: 50,  // Número máximo de entradas no cache
          maxAgeSeconds: 60 * 60 * 24 * 30,  // Expiração após 30 dias
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,  // Fontes externas do Google Fonts
      handler: 'StaleWhileRevalidate',  // Tenta carregar da rede, mas usa cache se falhar
      options: {
        cacheName: 'google-fonts-cache',  // Nome do cache
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 365,  // Expira após 1 ano
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/css2\?family=.*/i,  // CSS das fontes do Google
      handler: 'StaleWhileRevalidate',  // Tenta carregar da rede, mas usa cache se falhar
      options: {
        cacheName: 'google-fonts-css-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 365,  // Expira após 1 ano
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});
