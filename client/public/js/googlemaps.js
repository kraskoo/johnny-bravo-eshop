function initMap() {
  const position = { lat: 42.64179485, lng: 23.37383441 };
  const map = new google.maps.Map(document.getElementById('map'), {
    scaleControl: true,
    center: position,
    zoom: 16
  });
  const infowindow = new google.maps.InfoWindow();
  infowindow.setContent('<b>Home</b>');
  const marker = new google.maps.Marker({ map, position });
  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}