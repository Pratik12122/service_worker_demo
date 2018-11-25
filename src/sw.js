const VERSION = 'v8';

function log(message) {
  console.log(VERSION, message);
}

log('Service Worker Added');

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

async function installServiceWorker(){
  log('SW installation started');
  const request = new Request('offline.html');
  const response = await fetch(request);
  if(response.status != 200 ) {
      throw new Error('could not load offline page.');
  }

  const cache = await caches.open('app-cache');
  cache.put(request, response);
}

self.addEventListener('fetch', event => event.respondWith(showOfflineIfEror(event)));

async function showOfflineIfEror(event) {
  let response;
  try {
    response = await fetch(event.request);
  } catch (error) {
    console.log("Error while loading the App " + error);
    const cache = await caches.open('app-cache');
    return cache.match("/offline.html");
  }
  return fetch(event.request);
}

self.addEventListener('activate', () => {
  log(' Version is activated');
});
