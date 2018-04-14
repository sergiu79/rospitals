function HospitalsListView() {
    this.init();
}

HospitalsListView.prototype = {
    init: function () {
        this.loadData();
    },
    attachListeners: function () {
        
    },
    loadData: function () {
        $.getJSON('assets/data/hospitals.json', function (data) {
            let output = `<table class="table">`;
            output += `<thead class="thead-light">
                <tr>
                  <th>Hospital Name</th>
                  <th>City</th>
                  <th>County</th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
                </thead>
                <tbody>`;
            $.each(data, function (key, value) {

                output += `<tr>`;
                output += `<td>${value.name}</td>`;
                output += `<td>${value.city.name}</td>`;
                output += `<td>${value.county.name}</td>`;
                output += `<td>${value.address}</td>`;
                output += `<td>${value.phone} <br> <a href="${value.website}">Go to website</a></td>`;
                output += `</tr>`;

            });
            output += `</tbody>`;

            $('.hospitals-list').html(output);

        });
    }
};

