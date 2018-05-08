rospitals.views.hospitals.HomeView = function() {
    this.init();
}
rospitals.views.hospitals.HomeView.prototype = {
    init: function () {
        this.attachListeners();
        this.initMap();
    },
    initMap: function () {
        var map, infoWindow;
        map = new google.maps.Map($('#map')[0], {
            center: new google.maps.LatLng(44.333333, 23.816667),
            zoom: 9
        });
        //preluare date din baza de date
        infoWindow = new google.maps.InfoWindow();
        $.getJSON('http://localhost:3000/api/hospitals', function (data) {
            var marker, i;
            for (i = 0; i < data.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].lat, data[i].long),
                    map: map
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(data[i].name);
                        infoWindow.open(map, marker);
                    };
                })(marker, i));
            };
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

//                infoWindow.setPosition(pos);
//                infoWindow.setContent('Te afli aici');
                infoWindow.open(map);
                map.setCenter(pos);
            }, $.proxy(function () {
               this.handleLocationError(true, infoWindow, map.getCenter(), map);
            }, this));
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, map.getCenter(), map);
        }
    },

    handleLocationError: function (browserHasGeolocation, infoWindow, pos, map) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    },

    attachListeners: function () {
        $('#get-hospitals').on('click', function () {
            rospitalsApp.loadView({
                module: 'hospitals-list'
            });
        });
    }
};