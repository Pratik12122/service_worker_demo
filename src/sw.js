const VERSION = 'v4 ';

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
  log('cached offline.html successfully.');
}

self.addEventListener('activate', () => {
  log(' Version is activated');
});
