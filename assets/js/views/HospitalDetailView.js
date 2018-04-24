function HospitalDetailView(config) {
    this.id = config.id;
    this.hospitalData = null;
    this.init();
}

HospitalDetailView.prototype = {

    init: function () {
        this.loadData();
    },
    loadData: function () {
        var self = this;
        var myUrl = "http://localhost:3000/api/hospitals/"+this.id;
        $.ajax({
            url: myUrl
        }).done(function (data) {
            if (data[0]) {
                self.hospitalData = data[0];

                self.initMap();
                self.showHospitalData();
            } else {
                console.log("Hospital not found");
            }
        });
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
        }
        var map, infoWindow;
        map = new google.maps.Map(document.getElementById('map'), {
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
}