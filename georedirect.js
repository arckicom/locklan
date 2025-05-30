addEventListener('fetch', event => {
  const country = event.request.cf?.country;
  if (country === 'MY') {
    return event.respondWith(Response.redirect('https://my.example.com', 302));
  }
  return event.respondWith(fetch(event.request));
});
