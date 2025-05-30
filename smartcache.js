addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const cacheUrls = [/\/category\//, /\/product\//, /\/cms-page\//];

async function handleRequest(request) {
  const url = new URL(request.url);

  if (request.method === 'GET' && cacheUrls.some(re => re.test(url.pathname))) {
    const cache = caches.default;
    let response = await cache.match(request);
    if (!response) {
      response = await fetch(request);
      response = new Response(response.body, response);
      response.headers.append("Cache-Control", "public, max-age=600");
      event.waitUntil(cache.put(request, response.clone()));
    }
    return response;
  }

  return fetch(request);
}
