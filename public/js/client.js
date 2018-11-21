const button = document.getElementById('mybutton');
button.addEventListener('click', (e) => {
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showGeoLocation);
    } else { 
        coordinates.innerHTML = "Geolocation is not supported by this browser.";
    }
});

async function showGeoLocation(position) {
    let response = await fetch('/get?lat='+ position.coords.latitude + '&long='+position.coords.longitude);
    let geolocation = await response.json();
    coordinates.innerHTML = geolocation[0].formattedAddress;
}