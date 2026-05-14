// Service Worker pour performances ULTRA-RAPIDES sur mobile
const CACHE_NAME = 'static-v13';
const STATIC_CACHE = 'static-v13';
const API_CACHE = 'api-v12';

// Ressources critiques
const CRITICAL_RESOURCES = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('Installation du Service Worker pour performances mobile');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                // Ajouter chaque ressource une par une pour éviter l'échec total
                return Promise.allSettled(
                    CRITICAL_RESOURCES.map(resource => 
                        cache.add(resource).catch(err => {
                            console.warn('⚠️ Ressource non mise en cache:', resource, err.message);
                        })
                    )
                );
            })
            .then(() => {
                // Forcer l'activation immédiate
                self.skipWaiting();
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('Activation du Service Worker');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim();
        })
    );
});

// Interception des requêtes pour cache optimisé
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Stratégie de cache selon le type de ressource
    if (isAPIRequest(url)) {
        // Cache d'API avec réseau first
        event.respondWith(
            caches.open(API_CACHE)
                .then((cache) => {
                    return cache.match(request)
                        .then((response) => {
                            // Vérifier si le cache est valide (moins de 2 min mobile, 5 min desktop)
                            if (response && isCacheValid(response)) {
                                return response;
                            }
                            
                            // Sinon faire la requête réseau
                            return fetch(request)
                                .then((networkResponse) => {
                                    // Mettre en cache la réponse réseau
                                    if (networkResponse.ok) {
                                        cache.put(request, networkResponse.clone());
                                    }
                                    return networkResponse;
                                })
                                .catch(() => {
                                    // Fallback sur le cache même expiré
                                    return response || new Response('Erreur réseau', { status: 503 });
                                });
                        });
                })
        );
    } else if (isStaticResource(url)) {
        // Cache first pour les ressources statiques
        event.respondWith(
            caches.open(STATIC_CACHE)
                .then((cache) => {
                    return cache.match(request)
                        .then((response) => {
                            if (response) {
                                return response;
                            }
                            
                            // Charger depuis le réseau et mettre en cache
                            return fetch(request)
                                .then((networkResponse) => {
                                    if (networkResponse.ok) {
                                        cache.put(request, networkResponse.clone());
                                    }
                                    return networkResponse;
                                });
                        });
                })
        );
    } else {
        // Pour les autres ressources, utiliser le réseau
        event.respondWith(fetch(request));
    }
});

// Vérifier si c'est une requête API (inclut Open-Meteo et IP-API)
function isAPIRequest(url) {
    return url.hostname.includes('openweathermap.org') || 
           url.hostname.includes('open-meteo.com') ||
           url.hostname.includes('ip-api.com');
}

// Vérifier si c'est une ressource statique (fichiers du site)
function isStaticResource(url) {
    const staticFiles = [
        '/index.html', '/style.css', '/weather-icons.css',
        '/weather-icons.js', '/script.js'
    ];
    return staticFiles.some(file => url.pathname.endsWith(file));
}

// Vérifier la validité du cache
function isCacheValid(response) {
    const cacheTime = response.headers.get('sw-cache-time');
    if (!cacheTime) return false;
    
    const age = Date.now() - parseInt(cacheTime);
    const maxAge = 120000; // 2 minutes pour mobile ultra-rapide
    
    return age < maxAge;
}

// Nettoyage du cache périodique
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_CLEANUP') {
        caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
                caches.delete(cacheName);
            });
        });
    }
});
