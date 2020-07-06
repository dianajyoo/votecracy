/* global google */

function getCookie(key) {
  const name = key + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function getGeocode() {
  let loc;
  const initLatLong = { lat: 40.712, lng: -74.006 };
  const address = getCookie('address') || '';

  fetch(`/api/geocode/?address=${address}`)
    .then((res) => res.json())
    .then((res) => {
      loc = res.results[0].geometry.location;
    })
    .catch(console.log);

  return loc ? loc : initLatLong;
}

function initMap() {
  let map;
  const loc = getGeocode();

  map = new google.maps.Map(document.getElementById('map'), {
    center: loc,
    zoom: 15,
  });

  const marker = new google.maps.Marker({ position: loc, map });
}
