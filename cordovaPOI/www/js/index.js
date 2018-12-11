var map;
var posMarker;

function onLoad() {
    console.log("In onLoad.");
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    console.log("In onDeviceReady.");
    makeBasicMap();
    getCurrentlocation();
}

function makeBasicMap() {
    console.log("In makeBasicMap.");
    map = L.map("map-var", {
        zoomControl: false,
        attributionControl: false
    }).fitWorld();
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        useCache: true
    }).addTo(map);

    map.on("click", function (evt) {
        getCurrentlocation();
    });
}

function showOkAlert(message) {
    navigator.notification.alert(message, null, "WMAP 2018", "OK");
}

function getCurrentlocation() {
    console.log("In getCurrentlocation.");
    /*
    $.ajax({
        type: "GET",
        headers: {"Authorization": authtoken},  // auth token if needed
        url: 'http://178.62.23.74:8511/borders/',  // your URL goes gere
        }).done(function (data, status, xhr) {
            var message = "In ajax\n"

        }).fail(function (xhr, status, error) {
              // do stuff when request not successful
    });
    */
    navigator.geolocation.getCurrentPosition(
        function (pos) {
            console.log("Got location");
            setMapToCurrentLocation(pos);
        },
        function (err) {
            console.log("Location error: " + err.message);
        },
        {
            enableHighAccuracy: true
        }
    );
}

function setMapToCurrentLocation(myPos) {
    console.log("In setMapToCurrentLocation.");
    if (map.hasLayer(posMarker)) {
        posMarker.remove();
    }

    var myLatLon = L.latLng(myPos.coords.latitude, myPos.coords.longitude);
    posMarker = L.marker(myLatLon);
    posMarker.addTo(map);
    map.flyTo(myLatLon, 15);

    var message = "Your position has been updated\n" +
        "Lat: " + myPos.coords.latitude.toString() + "\n" +
        "Lat: " + myPos.coords.longitude.toString() + "."
    showOkAlert(message);
}