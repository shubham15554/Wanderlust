
  const map = new maplibregl.Map({
    container: 'map', // ID of the div
    style: `https://api.maptiler.com/maps/streets/style.json?key=${token}`,
    center: coordinates , // [lng, lat] — India center
    zoom: 5
  });

  // Add zoom and rotation controls
  console.log(token);
map.addControl(new maplibregl.NavigationControl());
// Add a marker at the center (Delhi)
console.log(coordinates)
new maplibregl.Marker({ color: "red" })  // you can change color
  .setLngLat(coordinates)
  .setPopup(
    new maplibregl.Popup().setHTML("<p>Exact location will be provided after the booking</p>")
  ) // optional popup
  .addTo(map);