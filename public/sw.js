const CACHE_NAME = 'class-captain-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg'
];

self.addEventListener('install', (event) => {
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Best effort cache
      return cache.addAll(urlsToCache).catch(err => console.warn('Cache addAll failed', err));
    })
  );
});

self.addEventListener('activate', (event) => {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy to ensure fresh data
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});