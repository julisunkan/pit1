// Service Worker for Ethical Hacking Tutorial PWA
const CACHE_NAME = 'ethical-hacking-tutorial-v1.0.0';
const STATIC_CACHE_NAME = 'static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'dynamic-v1.0.0';

// Assets to cache for offline use
const STATIC_ASSETS = [
    '/',
    '/static/css/mobile-app.css',
    '/static/js/mobile-app.js',
    '/static/icon-192.svg',
    '/static/icon-512.svg',
    '/static/manifest.json',
    // Bootstrap CSS
    'https://cdn.replit.com/agent/bootstrap-agent-dark-theme.min.css',
    // Bootstrap JS
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    // Font Awesome
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    // Prism.js
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js'
];

// Pages to cache
const PAGES_TO_CACHE = [
    '/',
    '/lesson/1',
    '/lesson/2',
    '/lesson/3',
    '/lesson/4',
    '/lesson/5',
    '/lesson/6',
    '/lesson/7',
    '/lesson/8',
    '/lesson/9',
    '/lesson/10'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Cache pages
            caches.open(CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching pages');
                return cache.addAll(PAGES_TO_CACHE);
            })
        ]).then(() => {
            console.log('Service Worker: Installed successfully');
            return self.skipWaiting();
        }).catch(error => {
            console.error('Service Worker: Installation failed', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && 
                        cacheName !== STATIC_CACHE_NAME && 
                        cacheName !== DYNAMIC_CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated successfully');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    // Handle different types of requests
    if (isStaticAsset(event.request.url)) {
        // Static assets - cache first strategy
        event.respondWith(cacheFirst(event.request));
    } else if (isPageRequest(event.request.url)) {
        // Pages - network first with cache fallback
        event.respondWith(networkFirstWithCacheFallback(event.request));
    } else if (isAPIRequest(event.request.url)) {
        // API requests - network first with offline page
        event.respondWith(networkFirstWithOfflineFallback(event.request));
    } else {
        // Everything else - network first
        event.respondWith(networkFirst(event.request));
    }
});

// Cache first strategy for static assets
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Cache first failed:', error);
        return new Response('Offline - Asset not available', { 
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network first with cache fallback for pages
async function networkFirstWithCacheFallback(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        throw new Error('Network response not ok');
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If no cached version, return offline page
        return createOfflinePage();
    }
}

// Network first with offline fallback for API requests
async function networkFirstWithOfflineFallback(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // Cache successful API responses
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('API request failed, checking cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline response for API requests
        return new Response(JSON.stringify({
            offline: true,
            message: 'You are offline. Some features may not work.'
        }), {
            headers: { 'Content-Type': 'application/json' },
            status: 503
        });
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response('Offline', { status: 503 });
    }
}

// Helper functions to categorize requests
function isStaticAsset(url) {
    return url.includes('/static/') || 
           url.includes('bootstrap') ||
           url.includes('font-awesome') ||
           url.includes('prism') ||
           url.includes('cdnjs.cloudflare.com');
}

function isPageRequest(url) {
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/lesson/') || 
           urlObj.pathname === '/' ||
           urlObj.pathname === '/search';
}

function isAPIRequest(url) {
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/complete/') ||
           urlObj.pathname.startsWith('/reset-progress') ||
           urlObj.pathname.startsWith('/api/');
}

// Create offline page
function createOfflinePage() {
    const offlineHTML = `
    <!DOCTYPE html>
    <html lang="en" data-bs-theme="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - Ethical Hacking Tutorial</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                color: #ffffff;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .offline-container {
                text-align: center;
                padding: 2rem;
                max-width: 400px;
            }
            .offline-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                opacity: 0.7;
            }
            .offline-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: #0dcaf0;
            }
            .offline-message {
                margin-bottom: 2rem;
                opacity: 0.8;
                line-height: 1.6;
            }
            .retry-btn {
                background: #0d6efd;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            .retry-btn:hover {
                background: #0b5ed7;
            }
        </style>
    </head>
    <body>
        <div class="offline-container">
            <div class="offline-icon">📡</div>
            <h1 class="offline-title">You're Offline</h1>
            <p class="offline-message">
                No internet connection detected. You can still access cached lessons 
                and continue learning offline.
            </p>
            <button class="retry-btn" onclick="window.location.reload()">
                Try Again
            </button>
        </div>
    </body>
    </html>`;
    
    return new Response(offlineHTML, {
        headers: { 'Content-Type': 'text/html' }
    });
}

// Background sync for when connection is restored
self.addEventListener('sync', event => {
    console.log('Service Worker: Background sync triggered');
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('Service Worker: Performing background sync');
    
    // Sync any pending data when connection is restored
    try {
        // You can add logic here to sync any offline actions
        // For example, lesson completions that were made offline
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'BACKGROUND_SYNC',
                message: 'Connection restored, syncing data...'
            });
        });
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handler
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'New lesson available!',
        icon: '/static/icon-192.svg',
        badge: '/static/icon-192.svg',
        vibrate: [200, 100, 200],
        data: data.data || {},
        actions: [
            {
                action: 'open',
                title: 'Open App',
                icon: '/static/icon-192.svg'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/static/icon-192.svg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(
            data.title || 'Ethical Hacking Tutorial',
            options
        )
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                // Check if app is already open
                const client = clients.find(c => 
                    c.url.includes(self.location.origin) && 'focus' in c
                );
                
                if (client) {
                    return client.focus();
                } else {
                    return self.clients.openWindow('/');
                }
            })
        );
    }
});

// Message handler for communication with the main app
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_LESSON') {
        // Cache specific lesson for offline access
        const lessonId = event.data.lessonId;
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
                return cache.add(`/lesson/${lessonId}`);
            })
        );
    }
});

console.log('Service Worker: Script loaded successfully');