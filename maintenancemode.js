const maintenance = false; // Toggle via environment variable ideally

addEventListener('fetch', event => {
  if (maintenance) {
    return event.respondWith(new Response("Site under maintenance", {
      status: 503,
      headers: { "Retry-After": "3600" }
    }));
  }
  return event.respondWith(fetch(event.request));
});
