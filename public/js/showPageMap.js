mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

const popup = new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${title}</h4>`)

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);