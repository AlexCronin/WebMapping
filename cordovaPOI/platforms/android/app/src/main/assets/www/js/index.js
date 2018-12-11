var map;
var posMarker;

function onLoad() {
    console.log("In onLoad.");
    showlocations();
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    console.log("In onDeviceReady.");
    showlocations();
    makeBasicMap();

    //getCurrentlocation();
}
function showlocations() {

    $.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.authtoken},
        url: 'http://147.252.144.225:8000/rest/show_locations/'
    }).done(function (data, status, xhr) {
        var parsedJSON = JSON.parse(data.data);
        for (var i=0;i<parsedJSON.length;i++) {
           var myLatLon = L.latLng(parsedJSON[i].latitude,parsedJSON[i].longitude );
         }
       for (var i=0;i<parsedJSON.length;i++) {
           var myLatLon = L.latLng(parsedJSON[i].latitude,parsedJSON[i].longitude );
           var lat = parsedJSON[i].latitude;
           var lng = parsedJSON[i].longitude;
           var contentString = "";
           if(!parsedJSON[i].contactNumber == "") {
                contentString = "<h2>" + parsedJSON[i].name + "</h2> " +
            parsedJSON[i].description +
            "<br><br><button type=\"button\" id=\"callBtn\" style=\"color:white\;background-color:green\" onclick=callPhone("+parsedJSON[i].contactNumber+")>Call</button> <br>"+
            "<h3> Get Directions </h3><button type=\"button\" id=\"dirBtn\" style=\"color:white\;background-color:black\" onclick=getDirections("+ lat + "," + lng + ")>Get Directions</button>";
           }
           else {
               contentString = "<h2>" + parsedJSON[i].name + "</h2> " +
            parsedJSON[i].description + "<h3> Get Directions </h3><button type=\"button\" id=\"dirBtn\" style=\"color:white\;background-color:black\" onclick=getDirections("+ lat + "," + lng + ")>Get Directions</button>" ;
           }

            L.marker(myLatLon, {icon: attIcon}).addTo(map).bindPopup(contentString);
         }
    }).fail(function (xhr, status, error) {
        $(".sp-username").html("");
    });
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