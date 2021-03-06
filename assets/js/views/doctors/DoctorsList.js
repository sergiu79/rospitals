rospitals.views.doctors.DoctorsList = function () {
    this.init();
};

rospitals.views.doctors.DoctorsList.prototype = {
    init: function () {
        this.initKendoComponents();
        this.attachListeners();
        this.loadData();
    },
    initKendoComponents: function () {
        $('#title').kendoDropDownList({
            dataSource: ['medic primar', 'medic specialist']
        }).data('kendoDropDownList');
        $('#specialty_id').kendoDropDownList({
            autoWidth: true,
            dataSource: {
                type: "json",
                transport: {
                    read: "http://localhost:3000/api/specialties"
                },
                schema: {
                    model: {
                        fields: {
                            id: {type: "number"},
                            name: {type: "string"}
                        }
                    }
                }
            },
            dataTextField: 'name',
            dataValueField: 'id'
        }).data('kendoDropDownList');
    },
    attachListeners: function () {
        //https://docs.telerik.com/kendo-ui/knowledge-base/filter-all-columns-with-one-textbox
        $('#filter').on('input', $.proxy(this.onSearchInput, this));
        $('.doctors-list').on('click', '.delete-button', $.proxy(this.onDeleteButton, this));
        $('#saveDoctor').on('click', function () {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/api/doctors",
                data: $("#doctorsForm").serialize(), // serializes the form's elements.
                success: function (data)
                {
                    alert("Doctorul a fost adaugat cu succes in baza de date!");
                    $('#doctorModal').modal('hide');
                    rospitals.views.doctors.DoctorsList.prototype.init();
                }
            });
            $('#saveDoctor').on('click', $.proxy(this.onDoctorSave, this));
        });
    },
    onDoctorSave: function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/doctors",
            data: $("#doctorsForm").serialize(), // serializes the form's elements.
            success: $.proxy(this.onDoctorSuccessfullySaved, this),
            error: $.proxy(this.onDoctorUnSuccessfullySaved, this)
        });
    },
    onDoctorUnSuccessfullySaved: function (response) {
        alert('Doctorul nu a fost salvat');
    },
    onDoctorSuccessfullySaved: function (data) {
        alert("Doctorul a fost adaugat in baza de date!");
        $('#doctorModal').modal('hide');
        this.grid.dataSource.read();
    },
    onDeleteButton: function (event) {
        if (confirm('Sunteti sigur ca vreti sa stergeti acest doctor?')) {
            var uid = $(event.currentTarget).closest('tr').data('uid');
            var record = this.grid.dataSource.getByUid(uid);
            var id = record.d_id;
            this.removeDoctor(id);
        }
    },
    removeDoctor: function (id) {
        $.ajax({
            url: "http://localhost:3000/api/doctors/" + id,
            type: 'DELETE',
            success: $.proxy(this.onDoctorSuccessfullyRemoved, this),
            error: $.proxy(this.onDoctorNotSuccessfullyRemoved, this)
        });
    },

    onDoctorSuccessfullyRemoved: function (result) {
        alert('Doctorul a fost sters cu succes');
        //reloads doctors list data from server
        this.grid.dataSource.read();
    },

    onDoctorNotSuccessfullyRemoved: function (result) {
        alert('Doctorul nu a fost sters cu succes');
    },

    onSearchInput: function (e) {
        // cacheing
        var keyword = $(e.currentTarget).val();
        var columns = this.grid.columns;
        var filter = {
            logic: 'or',
            filters: []
        };
        var dataSource = this.grid.dataSource;
        columns.forEach(function (x) {
            if (x.field) {
                var type = dataSource.options.schema.model.fields[x.field].type;
                if (type === 'string') {
                    filter.filters.push({
                        field: x.field,
                        operator: 'contains',
                        value: keyword
                    });
                } else if (type === 'number') {
                    if (rospitals.Utils.isNumeric(keyword)) {
                        filter.filters.push({
                            field: x.field,
                            operator: 'eq',
                            value: keyword
                        });
                    }
                } else if (type === 'date') {
                    var data = dataSource.data();
                    for (var i = 0; i < data.length; i++) {
                        var dateStr = kendo.format(x.format, data[i][x.field]);
                        // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                        if (dateStr.startsWith(keyword)) {
                            filter.filters.push({
                                field: x.field,
                                operator: 'eq',
                                value: data[i][x.field]
                            });
                        }
                    }
                } else if (type === 'boolean' && rospitals.Utils.getBoolean(keyword) !== null) {
                    var bool = getBoolean(keyword);
                    filter.filters.push({
                        field: x.field,
                        operator: 'eq',
                        value: bool
                    });
                }
            }
        });
        dataSource.filter(filter);
    },
    loadData: function () {
        this.grid = $('.doctors-list').kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: "http://localhost:3000/api/xjoin?_join=d.doctors,_j,s.specialties&_on1=(d.specialty_id,eq,s.id)&_fields=d.id,d.fullname,d.title,d.rating,d.rank,s.name,d.specialty_id&_size=99"
                },
                schema: {
                    model: {
                        fields: {
                            d_id: {type: "number"},
                            d_fullname: {type: "string"},
                            d_rank: {type: "string"},
                            s_name: {type: "string"}
                        }
                    }
                },
                pageSize: 20,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            height: 550,
            navigatable: true,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
                    field: "d_id",
                    hidden: true
                },
                {
                    field: "d_fullname",
                    title: "Nume",
                    width: 400
                },
                {
                    field: "d_rank",
                    title: "Tip"
                },
                {
                    field: "s_name",
                    title: "Specialitate"
                },
                {
                    title: "Actiuni",
                    template: '<button class="btn btn-primary delete-button align-middle">Sterge</button>'
                }
            ]
        }).data('kendoGrid');
    },
    destroy: function () {
        console.log('destroy');
        $('#filter').off();
        $('.doctors-list').off();
        $('#saveDoctor').off();
    }
};