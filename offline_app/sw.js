// Service Worker for Offline Ethical Hacking Tutorial
const CACHE_NAME = 'ethical-hacking-tutorial-v1';
const urlsToCache = [
    './',
    './index.html',
    './css/bootstrap.min.css',
    './css/fontawesome.min.css',
    './css/prism.min.css',
    './css/mobile-app.css',
    './css/responsive.css',
    './js/bootstrap.min.js',
    './js/prism-core.min.js',
    './js/responsive.js',
    './js/mobile-app.js',
    './js/offline-app.js',
    './images/icon-192.png',
    './images/icon-512.png',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});