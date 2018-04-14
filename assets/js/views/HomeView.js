function HomeView() {
    this.init();
}
HomeView.prototype = {
    init: function () {
        this.attachListeners();
        this.initMap();
    },
    initMap: function() {
        var map, infoWindow;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 0,
                lng: 0
            },
            zoom: 10
        });
        infoWindow = new google.maps.InfoWindow();
        var oThis = this;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                oThis.handleLocationError(true, infoWindow, map.getCenter(), map);
            });
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
    
    attachListeners: function() {
       $('#get-hospitals').on('click', function(){
           rospitalsApp.loadView({module: 'hospitals-list'});
       }); 
    }
};






