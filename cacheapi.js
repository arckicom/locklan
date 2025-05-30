addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/rest/V1/products")) {
    return event.respondWith(cacheApi(event.request));
  }
  return event.respondWith(fetch(event.request));
});

async function cacheApi(request) {
  const cache = caches.default;
  let response = await cache.match(request);
  if (!response) {
    response = await fetch(request);
    response = new Response(response.body, response);
    response.headers.set("Cache-Control", "public, max-age=120");
    event.waitUntil(cache.put(request, response.clone()));
  }
  return response;
}
