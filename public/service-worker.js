//Comportamiento de PWA, Cacheo de archivos, carga rapida, funcionalidad sin internet, etc...

const CACHE_NAME = 'tandil-turismo-v1';

const urlsToCache = [ //archivos importantes en cache
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/favicon.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});