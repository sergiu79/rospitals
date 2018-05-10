rospitals.views.hospitals.HospitalsListView = function() {
    this.init();
}

rospitals.views.hospitals.HospitalsListView.prototype = {

    init: function () {
        this.loadData();
    },
    attachListeners: function () {

    },
    onRowClick: function (event) {

        event.preventDefault();
        var row = event.sender.select();
        var id = $(row[0]).find('td:first').text();
        rospitalsApp.loadView({module: 'hospital-detail'}, {id: id});
    },
    loadData: function () {
        $('.hospitals-list').kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: "http://localhost:3000/api/hospitals"
                },
                schema: {
                    model: {
                        fields: {
                            id: {type: "number"},
                            name: {type: "string"},
                            county: {type: "string"},
                            city: {type: "string"},
                            type: {type: "string"}
                        }
                    }
                },
                pageSize: 20,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            height: 550,
            filterable: true,
            selectable: 'row',
            change: $.proxy(this.onRowClick, this),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "id",
                    filterable: false,
                    hidden: true
                },
                {
                    field: "name",
                    title: "Nume",
                    width: 400

                },
                {
                    field: "city",
                    title: "Oras",
                    width: 250
                },
                {
                    field: "county",
                    title: "Judet",
                    width: 200
                },
                {
                    field: "type",
                    title: "Tip"
                },
                {
                    title: "Actiune",
                    template: '<button class="btn btn-primary">Sterge</button>'
                }
            ]
        });

    }
};