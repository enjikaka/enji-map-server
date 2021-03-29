const lantmäteriet = ({ x, y, z }) =>
  `https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/${Deno.env.get('API_KEY')}/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=topowebb&STYLE=default&TILEMATRIXSET=3857&TILEMATRIX=${z}&TILEROW=${y}&TILECOL=${x}&FORMAT=image/png`

const googleMaps = ({ x, y, z }) =>
  `https://khms1.googleapis.com/kh?v=899&hl=sv-SE&x=${x}&y=${y}&z=${z}`;

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  const [, service, x, y, z] = pathname.split('/');

  if (service === 'l') {
    return fetch(
      lantmäteriet({ x, y, z })
    );
  }

  if (service === 'g') {
    return fetch(
      googleMaps({ x, y, z })
    );
  }

  return new Response('Nothing to see here...', {
    headers: {
      'content-type': 'text/plain'
    }
  });
}

addEventListener('fetch', async event => {
  const response = await handleRequest(event.request);

  event.respondWith(response);
});
