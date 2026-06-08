// Camisa 10 - Service Worker PWA Otimizado
const CACHE_NAME = "camisa10-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/favicon.svg",
  "/icon-192.png",
  "/icon-512.png"
];

// Instalação do Service Worker e Caching de Ativos Estáticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação do Service Worker e Limpeza de Caches Antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de Fetch: Network First (Rede primeiro) com Fallback para Cache
// Garante que o navegador busque a versão mais nova do servidor se houver conexão ativa,
// e use o cache offline como fallback se estiver desconectado.
self.addEventListener("fetch", (event) => {
  // Evitar interceptar requisições para extensões do Chrome, APIs externas que usam POST, etc.
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a resposta for válida, guarda no cache de forma assíncrona
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Em caso de falha de rede (offline), busca no cache local
        return caches.match(event.request);
      })
  );
});
