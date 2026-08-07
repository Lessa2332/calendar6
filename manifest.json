// ============================================================
// sw.js — Service Worker для WeatherLab НУШ
// ============================================================

const CACHE = 'weatherlab-v2.1';
const ASSETS = [
    '/calendar6/',
    '/calendar6/index.html',
    '/calendar6/sw.js',
    '/calendar6/manifest.json'
];

self.addEventListener('install', e => {
    console.log('🛠️ SW: Install');
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('🚀 SW: Activate');
    e.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    if (e.request.url.includes('archive-api.open-meteo.com') || 
        e.request.url.includes('nominatim.openstreetmap.org') ||
        e.request.url.includes('googleapis.com') ||
        e.request.url.includes('gstatic.com') ||
        e.request.url.includes('cdn.jsdelivr.net')) return;
    
    e.respondWith(
        fetch(e.request)
            .then(res => {
                if (res.status === 200) {
                    const clone = res.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return res;
            })
            .catch(() => caches.match(e.request).then(r => r || new Response('Offline', {status:503})))
    );
});
