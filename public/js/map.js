maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: listing.geometry.coordinates,
  zoom: 9 
});

const el = document.createElement('div');
el.className = 'wanderlust-marker';
el.innerHTML = `<i class="fa-regular fa-compass"></i>`;

const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
  `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
);

const marker = new maptilersdk.Marker({element: el})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);