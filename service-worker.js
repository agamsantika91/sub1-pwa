const CACHE_NAME = "restoku";
var urlsToCache = [
  "/",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/profile.html",
  "/pages/menu.html",
  "/pages/foodcourt.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/asset/header.png",
  "/asset/menu1.jpg",
  "/asset/menu2.jpg",
  "/asset/menu3.jpg",
  "/asset/menu4.jpg",
  "/asset/menu5.jpg",
  "/asset/menu7.jpg",
  "/asset/foodcourt1.jpg",
  "/asset/foodcourt2.jpg",
  "/css/materialize.css"
];

  self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
  
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });
