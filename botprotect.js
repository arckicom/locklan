const badBots = ["AhrefsBot", "MJ12bot", "SemrushBot"];

addEventListener('fetch', event => {
  const ua = event.request.headers.get("user-agent") || "";
  if (badBots.some(bot => ua.includes(bot))) {
    return event.respondWith(new Response("Blocked", { status: 403 }));
  }
  return event.respondWith(fetch(event.request));
});
