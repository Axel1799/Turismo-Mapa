// Create map object
var map = L.map('map').setView([-27.3392658, -55.8616768], 13);

// Add tile layer to the map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define hotel locations and names
var hotels = [
    {
        name: 'De la Costa Hotel',
        location: [-27.3343273,-55.8723444],
        URL: ' '
    },
    {
        name: 'De la Trinidad Hotel',
        location: [-27.3413122,-55.8672642],
		URL: ' '
    },
	{
        name: 'Hostel Catedral',
        location: [-27.3390722,-55.8670333],
		URL: ' '
    },
    // Add more hotels here
];

// Create a red icon
var redIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Create a green icon
var greenIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


// Loop through hotel array and add markers to map with the red icon
for (var i = 0; i < hotels.length; i++) {
      var hotel = hotels[i];
      var marker = L.marker(hotel.location, {icon: redIcon}).addTo(map);
      marker.bindPopup(hotel.name);
}


// Get the location of the user and add a marker for it
function onLocationFound(e) {
    const radius = e.accuracy / 2;
    L.marker(e.latlng, {icon: greenIcon}).addTo(map)
        .bindPopup("Estás aquí").openPopup();
    // L.circle(e.latlng, radius).addTo(map);
}

// Get the user's current location
navigator.geolocation.getCurrentPosition(function(position) {
    // Create a marker at the user's location with the green icon
    var marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: greenIcon}).addTo(map);
    // marker.bindPopup("You are here");
  });
  

function onLocationError(e) {
    alert(e.message);
}

// Add event listeners for location found and error
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Enable user location and watch for changes
map.locate({
    setView: true,
    maxZoom: 16,
    watch: true,
    enableHighAccuracy: true
});

// Add error control for routing control
var control = L.Routing.control({
    waypoints: [
        L.latLng(-27.3398862, -55.865316),
        L.latLng(-27.3343273,-55.8723444)
    ]
}).addTo(map);

L.Routing.errorControl(control).addTo(map);
