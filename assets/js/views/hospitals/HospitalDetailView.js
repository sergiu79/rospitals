rospitals.views.hospitals.HospitalDetailView = function (config) {
    this.id = config.id;
    this.hospitalData = null;
    this.init();
};

rospitals.views.hospitals.HospitalDetailView.prototype = {

    init: function () {
        this.loadData();
    },
    loadData: function () {
        var myUrl = "http://localhost:3000/api/hospitals/" + this.id;
        $.ajax({
            url: myUrl,
            success: $.proxy(this.onDataLoaded, this),
            error: function (response, status, error) {
                console.log('Error: ', status, error, response);
            }
        }).done();
    },
    onDataLoaded: function (data) {
        if (data[0]) {
            this.hospitalData = data[0];
            this.initMap();
            this.showHospitalData();
        } else {
            console.log("Hospital not found");
        }
    },
    showHospitalData: function () {
        $("#hospital-name").text(this.hospitalData['name']);
        $("#hospital-address").text(this.hospitalData['address']);
        $("#hospital-website").text(this.hospitalData['website']);
        $("#hospital-email").text(this.hospitalData['email']);
        $("#hospital-type").text(this.hospitalData['type']);
    },
    initMap: function () {
        var pos = {
            lat: this.hospitalData.lat,
            lng: this.hospitalData.long
        };
        var map, infoWindow;
        map = new google.maps.Map($('#map')[0], {
            center: pos,
            zoom: 15
        });
        infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition(pos);
        infoWindow.setContent(this.hospitalData.name);
        infoWindow.open(map);
    },
    attachListeners: function () {

    }
};