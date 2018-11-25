const VERSION = 'v2';

function log(message) {
  console.log(VERSION, message);
}

log('Service Worker Added');

self.addEventListener('install', () => {
  log(' Version is installed');
});

self.addEventListener('activate', () => {
  log(' Version is activated');
});
