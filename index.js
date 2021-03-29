async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  const [, x, y, z] = pathname.split('/');

  const apiKey = Deno.env.get('API_KEY');

  console.log(apiKey, { x, y, z });

  return fetch(
    `https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/${apiKey}/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=topowebb&STYLE=default&TILEMATRIXSET=3857&TILEMATRIX=${z}&TILEROW=${y}&TILECOL=${x}&FORMAT=image/png`
  );
}

addEventListener('fetch', async event => {
  const response = await handleRequest(event.request);

  event.respondWith(response);
});
