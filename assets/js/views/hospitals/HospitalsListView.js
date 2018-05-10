rospitals.views.hospitals.HospitalsListView = function () {
    this.init();
};

rospitals.views.hospitals.HospitalsListView.prototype = {

    init: function () {
        this.attachListeners();
        this.loadData();
    },
    attachListeners: function () {
        $('.hospitals-list').on('click', '.delete-button', $.proxy(this.onDeleteButton, this));
    },
    onDeleteButton: function (event) {
        if (confirm('Are you sure you want to remove this hospital?')) {
            var uid = $(event.currentTarget).closest('tr').data('uid');
            var record = this.grid.dataSource.getByUid(uid);
            var id = record.id;
            this.removeDoctor(id);
        }
    },
    removeDoctor: function (id) {
        $.ajax({
            url: "http://localhost:3000/api/hospitals/" + id,
            type: 'DELETE',
            success: $.proxy(this.onDoctorSuccessfullyRemoved, this),
            error: $.proxy(this.onDoctorNotSuccessfullyRemoved, this)
        });
    },

    onDoctorSuccessfullyRemoved: function (result) {
        alert('The hospital was successfully removed');
        //reloads doctors list data from server
        this.grid.dataSource.read();
    },

    onDoctorNotSuccessfullyRemoved: function (result) {
        alert('The hospital was not successfully removed');
    },
    onRowClick: function (event) {

        event.preventDefault();
        var row = event.sender.select();
        var id = $(row[0]).find('td:first').text();
        rospitalsApp.loadView({module: 'hospital-detail'}, {id: id});
    },
    loadData: function () {
        this.grid = $('.hospitals-list').kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: "http://localhost:3000/api/hospitals/"
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
                    title: "Actiuni",
                    template: '<button class="btn btn-primary delete-button">Sterge</button>'
                }
            ]
        }).data('kendoGrid');

    }
};