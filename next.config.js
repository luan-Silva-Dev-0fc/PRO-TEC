const runtimeCaching = [
  {
    urlPattern: /_next\/static\/chunks\/.*\.(js|css)/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-chunks-cache',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  {
    urlPattern: /_next\/static\/media\/.*\.(jpg|jpeg|png|svg|webp|gif)/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-media-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'google-fonts-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.googleapis\.com\/css2\?family=.*/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'google-fonts-css-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    },
  },
];

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  reactStrictMode: true,
});
