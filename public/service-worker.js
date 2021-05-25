importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
      console.log(`Workbox berhasil dimuat`);
      workbox.precaching.precacheAndRoute([
        {url : '/', revision: '1' },  
        {url : '/nav.html', revision: '1' },  
        {url : '/index.html', revision: '1' },  
        {url : '/article.html', revision: '1' },  
        {url : '/pages/saved.html', revision: '1' },  
        {url : '/pages/home.html', revision: '1' },  
        {url : '/pages/german.html', revision: '1' },  
        {url : '/pages/champion.html', revision: '1' },  
        {url : '/pages/inggris.html', revision: '1' },  
        {url : '/pages/spanyol.html', revision: '1' },  
        {url : '/img/', revision: '1' },  
        {url : '/img/icon/icon-72.png', revision: '1' },  
        {url : '/img/icon/icon-96.png', revision: '1' },  
        {url : '/img/icon/icon-144.png', revision: '1' },  
        {url : '/img/icon/icon-192.png', revision: '1' },  
        {url : '/img/icon/icon-512.png', revision: '1' },  
        {url : '/img/loading.gif', revision: '1' },  
        {url : '/css/materialize.min.css', revision: '1' },  
        {url : '/css/style.css', revision: '1' },  
        {url : '/js/materialize.min.js', revision: '1' },  
        {url : '/manifest.json', revision: '1' },  
        {url : '/js/nav.js', revision: '1' },  
        {url : '/js/btn.js', revision: '1' },  
        {url : '/js/api.js', revision: '1' },  
        {url : '/js/db.js', revision: '1' },  
        {url : '/js/idb.js', revision: '1' },  
        {url : '/js/register.js', revision: '1' },  
        {url : '/js/script.js', revision: '1' },  
    ],{
        ignoreUrlParametersMatching: [/.*/]
    });
    
    workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/'),
      workbox.strategies.staleWhileRevalidate({
        cacheName : "Api",
      })
    )

    workbox.routing.registerRoute(
      /\.(?:js|css|html)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'static-resources',
      })
    );

    workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'gambar',
        plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 30,
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
        ]
    })
    );

    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'fonts',
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/pages/'),
      workbox.strategies.cacheFirst({
        cacheName: "pages",
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/article'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: "articles",
      })
    );

} else {
  console.log(`Workbox gagal dimuat`);
}



self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/icon/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
