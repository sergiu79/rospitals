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
        $.getJSON('http://localhost:3000/api/hospitals', function (data) {
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
                output += `<td>${value.city}</td>`;
                output += `<td>${value.county}</td>`;
                output += `<td>${value.address}</td>`;
                output += `<td>${value.phone} <br> <a href="${value.website}">Go to website</a></td>`;
                output += `</tr>`;

            });
            output += `</tbody>`;

            $('.hospitals-list').html(output);

        });
    }
};

