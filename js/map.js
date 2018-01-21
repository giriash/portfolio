/**
 * Created by apple on 3/27/16.
 */
function initMap() {
    //var mapDiv = $("#map");
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 42.444, lng: -76.502},
        zoom: 8
    });
    // We add a DOM event here to show an alert if the DIV containing the
    // map is clicked.
    google.maps.event.addDomListener(mapDiv, 'click', function() {
        window.alert('14850 Cornell University, Ithaca NY.');
    });
}


