const CACHE_NAME = 'turn-based-timer-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icons/favicon.ico',
    '/icons/apple-touch-icon.png',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    'beep.mp3'  // Add your sound file here if needed
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
